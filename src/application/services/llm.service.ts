import { injectable, inject } from 'tsyringe';
import pino from 'pino';
import type { LLMRequest } from '../dto/llm-request.dto.js';
import type { LLMResponse } from '../../domain/entities/llm-response.js';
import type { ILLMAdapter } from '../../infrastructure/adapters/langchain/langchain-llm.adapter.js';
import { OutputParserFactory } from '../factory/output-parser.factory.js';
import { outputFormatConfig } from '../../config/output-format.config.js';
import { createSuccessResponse, createErrorResponse } from '../../types/output-shape.js';
import type { OutputFormat } from '../dto/output-format.dto.js';

export interface ILLMService {
  generateCompletion<T = string>(
    request: LLMRequest,
  ): Promise<{ success: boolean; data: T } | { success: false; error: string }>;
}

@injectable()
export class LLMService implements ILLMService {
  private readonly logger = pino({ name: 'LLMService' });
  private readonly parserFactory = OutputParserFactory.getInstance();

  constructor(@inject('LLMAdapter') private readonly llmAdapter: ILLMAdapter) {}

  /**
   * Gera completion com suporte a output format personalizado
   * @param request - Requisição LLM com formato opcional
   * @returns Resposta formatada conforme especificado
   */
  async generateCompletion<T = string>(
    request: LLMRequest,
  ): Promise<{ success: boolean; data: T } | { success: false; error: string }> {
    this.logger.info(
      {
        model: request.model,
        promptLength: request.prompt.length,
        hasOutputFormat: !!request.outputFormat,
        outputType: request.outputFormat?.type,
      },
      'Processing LLM request',
    );

    try {
      // Valida outputFormat se fornecido
      if (request.outputFormat) {
        this.validateOutputFormat(request.outputFormat);
      }

      // Gera resposta do LLM
      const llmResponse = await this.llmAdapter.generateCompletion(request);

      // Processa output conforme formato especificado
      const processedData = await this.processOutput<T>(llmResponse, request.outputFormat);

      this.logger.info(
        {
          model: request.model,
          responseLength: llmResponse.content.length,
          usage: llmResponse.usage,
          outputFormatApplied: !!request.outputFormat,
        },
        'LLM request processed successfully',
      );

      return createSuccessResponse(processedData, {
        model: llmResponse.model,
        finishReason: llmResponse.finishReason,
        tokensUsed: llmResponse.usage?.totalTokens,
        processingTime: Date.now(),
      });
    } catch (error) {
      this.logger.error(
        {
          error: error instanceof Error ? error.message : 'Unknown error',
          model: request.model,
          hasOutputFormat: !!request.outputFormat,
        },
        'Error processing LLM request',
      );

      const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor';
      return createErrorResponse(errorMessage, 'LLM_PROCESSING_ERROR');
    }
  }

  /**
   * Valida formato de saída personalizado
   * @param outputFormat - Formato a ser validado
   * @throws Error se formato inválido
   */
  private validateOutputFormat(outputFormat: OutputFormat): void {
    // Verifica tamanho do esquema
    const schemaSize = JSON.stringify(outputFormat).length;
    if (schemaSize > outputFormatConfig.maxSchemaSize) {
      throw new Error(
        `Output format muito grande: ${schemaSize} bytes (máximo: ${outputFormatConfig.maxSchemaSize})`,
      );
    }

    // Verifica se estratégia suporta o esquema
    try {
      const strategy = this.parserFactory.getStrategy(outputFormat);
      if (!strategy.isSupported(outputFormat)) {
        throw new Error(`Output format não suportado: ${outputFormat.type}`);
      }
    } catch (error) {
      throw new Error(
        `Output format inválido: ${error instanceof Error ? error.message : 'Formato desconhecido'}`,
      );
    }
  }

  /**
   * Processa output conforme formato especificado
   * @param llmResponse - Resposta bruta do LLM
   * @param outputFormat - Formato de saída desejado (opcional)
   * @returns Dados processados
   */
  private async processOutput<T>(
    llmResponse: LLMResponse,
    outputFormat?: OutputFormat,
  ): Promise<T> {
    // Se não há formato especificado, retorna apenas o conteúdo
    if (!outputFormat) {
      return llmResponse.content as T;
    }

    try {
      // Aplica timeout para parsing
      const startTime = Date.now();

      const strategy = this.parserFactory.getStrategy(outputFormat);
      const result = strategy.parse<T>(llmResponse.content, outputFormat);

      const processingTime = Date.now() - startTime;

      if (processingTime > outputFormatConfig.parseTimeout) {
        this.logger.warn(
          {
            processingTime,
            timeout: outputFormatConfig.parseTimeout,
            schemaType: outputFormat.type,
          },
          'Output parsing exceeded timeout, consider simplifying schema',
        );
      }

      if (outputFormatConfig.enableDebugLogs) {
        this.logger.debug(
          {
            processingTime,
            schemaType: outputFormat.type,
            contentLength: llmResponse.content.length,
          },
          'Output parsing completed',
        );
      }

      return result;
    } catch (error) {
      this.logger.error(
        {
          error: error instanceof Error ? error.message : 'Unknown parsing error',
          schemaType: outputFormat.type,
          contentPreview: llmResponse.content.substring(0, 200),
        },
        'Failed to parse LLM output with custom format',
      );

      // Em caso de erro, tenta fallback para string simples
      if (outputFormatConfig.defaultMode === 'string') {
        this.logger.warn('Falling back to string output due to parsing error');
        return llmResponse.content as T;
      }

      throw new Error(
        `Erro ao processar output format: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      );
    }
  }
}
