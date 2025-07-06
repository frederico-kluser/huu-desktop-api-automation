import { ChatOpenAI } from '@langchain/openai';
import { ChatDeepSeek } from '@langchain/deepseek';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { injectable } from 'tsyringe';
import pino from 'pino';
import type { LLMRequest } from '../../../application/dto/llm-request.dto.js';
import type { LLMResponse } from '../../../domain/entities/llm-response.js';
import { LangChainConfig } from '../../../config/langchain.config.js';
import { environment } from '../../../config/environment.js';
import { getProviderForModel } from '../../../domain/enums/llm-model.enum.js';

export interface ILLMAdapter {
  generateCompletion(request: LLMRequest): Promise<LLMResponse>;
}

@injectable()
export class LangChainLLMAdapter implements ILLMAdapter {
  private readonly logger = pino({ name: 'LangChainLLMAdapter' });

  async generateCompletion(request: LLMRequest): Promise<LLMResponse> {
    const provider = getProviderForModel(request.model);
    this.logger.info({ model: request.model, provider }, 'Generating completion');

    try {
      // Criar o modelo apropriado baseado no provedor
      const model =
        provider === 'deepseek'
          ? new ChatDeepSeek({
              model: request.model, // DeepSeek usa os nomes 'deepseek-chat' ou 'deepseek-reasoner'
              temperature: request.temperature,
              maxTokens: request.maxTokens,
              apiKey: environment.deepseekApiKey,
              timeout: LangChainConfig.timeout,
              maxRetries: LangChainConfig.retries,
            })
          : new ChatOpenAI({
              modelName: request.model,
              temperature: request.temperature,
              maxTokens: request.maxTokens,
              openAIApiKey: environment.openaiApiKey,
              timeout: LangChainConfig.timeout,
              maxRetries: LangChainConfig.retries,
            });

      const messages = [];

      if (request.systemPrompt) {
        messages.push(new SystemMessage(request.systemPrompt));
      }

      messages.push(new HumanMessage(request.prompt));

      const response = await model.invoke(messages);

      const result: LLMResponse = {
        content: response.content.toString(),
        model: request.model,
        finishReason: response.response_metadata?.finish_reason,
      };

      // Extract usage information if available
      if (response.response_metadata?.token_usage) {
        result.usage = {
          promptTokens: response.response_metadata.token_usage.prompt_tokens,
          completionTokens: response.response_metadata.token_usage.completion_tokens,
          totalTokens: response.response_metadata.token_usage.total_tokens,
        };
      }

      this.logger.info(
        {
          model: request.model,
          usage: result.usage,
        },
        'Completion generated successfully',
      );

      return result;
    } catch (error) {
      this.logger.error({ error }, 'Error generating completion');
      throw new Error(
        `Failed to generate completion: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }
}
