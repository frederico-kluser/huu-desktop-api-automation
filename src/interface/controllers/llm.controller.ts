import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { LLMService } from '../../application/services/llm.service.js';
import { authenticationMiddleware } from '../middleware/auth.middleware.js';
import { llmRequestJsonSchema } from '../schemas/llm.schemas.js';
import { llmRequestSchema } from '../../application/dto/llm-request.dto.js';
import { outputFormatConfig } from '../../config/output-format.config.js';
import pino from 'pino';

export class LLMController {
  private llmService: LLMService;
  private readonly logger = pino({ name: 'LLMController' });

  constructor() {
    this.llmService = container.resolve<LLMService>('LLMService');
  }

  registerRoutes(server: FastifyInstance): void {
    server.post(
      '/llm',
      {
        preHandler: [authenticationMiddleware],
        schema: {
          headers: {
            type: 'object',
            properties: {
              'x-api-key': { type: 'string' },
            },
            required: ['x-api-key'],
          },
          body: llmRequestJsonSchema,
          response: {
            200: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
                data: {
                  // O tipo de data é dinâmico baseado no outputFormat
                  oneOf: [
                    { type: 'string' }, // Para output simples
                    { type: 'object' }, // Para output estruturado
                    { type: 'array' }, // Para output em array
                    { type: 'number' }, // Para output numérico
                    { type: 'boolean' }, // Para output booleano
                  ],
                },
                metadata: {
                  type: 'object',
                  properties: {
                    model: { type: 'string' },
                    finishReason: { type: 'string' },
                    tokensUsed: { type: 'integer' },
                    processingTime: { type: 'number' },
                  },
                },
              },
              required: ['success', 'data'],
            },
            400: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
                error: { type: 'string' },
                code: { type: 'string' },
              },
            },
            401: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
                error: { type: 'string' },
              },
            },
            413: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
                error: { type: 'string' },
                code: { type: 'string' },
              },
            },
            422: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
                error: { type: 'string' },
                code: { type: 'string' },
              },
            },
            500: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
                error: { type: 'string' },
                code: { type: 'string' },
              },
            },
          },
        },
      },
      this.generateCompletion.bind(this),
    );
  }

  private async generateCompletion(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      // Validate request body with Zod
      const validatedRequest = llmRequestSchema.parse(request.body);

      // Validações adicionais para outputFormat
      if (validatedRequest.outputFormat) {
        const schemaSize = JSON.stringify(validatedRequest.outputFormat).length;

        if (schemaSize > outputFormatConfig.maxSchemaSize) {
          await reply.status(413).send({
            success: false,
            error: `Output format muito grande: ${schemaSize} bytes (máximo: ${outputFormatConfig.maxSchemaSize})`,
            code: 'SCHEMA_TOO_LARGE',
          });
          return;
        }
      }

      this.logger.info(
        {
          model: validatedRequest.model,
          promptLength: validatedRequest.prompt.length,
          hasOutputFormat: !!validatedRequest.outputFormat,
          outputType: validatedRequest.outputFormat?.type,
        },
        'Received LLM request',
      );

      const response = await this.llmService.generateCompletion(validatedRequest);

      // Verifica se é uma resposta de erro
      if (!response.success) {
        const errorResponse = response as { success: false; error: string };

        // Determina código de status baseado no tipo de erro
        let statusCode = 500;
        let errorCode = 'INTERNAL_ERROR';

        if (errorResponse.error.includes('JSON válido')) {
          statusCode = 422;
          errorCode = 'INVALID_JSON_OUTPUT';
        } else if (errorResponse.error.includes('não suportado')) {
          statusCode = 400;
          errorCode = 'UNSUPPORTED_FORMAT';
        } else if (errorResponse.error.includes('output format')) {
          statusCode = 422;
          errorCode = 'OUTPUT_PARSING_ERROR';
        }

        await reply.status(statusCode).send({
          success: false,
          error: errorResponse.error,
          code: errorCode,
        });
        return;
      }

      // Resposta de sucesso
      await reply.send(response);
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        this.logger.error({ error }, 'Validation error');
        await reply.status(400).send({
          success: false,
          error: 'Invalid request body - check your prompt, model, and outputFormat',
          code: 'VALIDATION_ERROR',
        });
        return;
      }

      this.logger.error({ error }, 'Error generating completion');
      await reply.status(500).send({
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
        code: 'INTERNAL_ERROR',
      });
    }
  }
}
