import { injectable, inject } from 'tsyringe';
import pino from 'pino';
import type { LLMRequest } from '../dto/llm-request.dto.js';
import type { LLMResponse } from '../../domain/entities/llm-response.js';
import type { ILLMAdapter } from '../../infrastructure/adapters/langchain/langchain-llm.adapter.js';

export interface ILLMService {
  generateCompletion(request: LLMRequest): Promise<LLMResponse>;
}

@injectable()
export class LLMService implements ILLMService {
  private readonly logger = pino({ name: 'LLMService' });

  constructor(@inject('LLMAdapter') private readonly llmAdapter: ILLMAdapter) {}

  async generateCompletion(request: LLMRequest): Promise<LLMResponse> {
    this.logger.info(
      {
        model: request.model,
        promptLength: request.prompt.length,
      },
      'Processing LLM request',
    );

    try {
      const response = await this.llmAdapter.generateCompletion(request);

      this.logger.info(
        {
          model: request.model,
          responseLength: response.content.length,
          usage: response.usage,
        },
        'LLM request processed successfully',
      );

      return response;
    } catch (error) {
      this.logger.error({ error }, 'Error processing LLM request');
      throw error;
    }
  }
}
