import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { LLMService } from '../../application/services/llm.service.js';
import { authenticationMiddleware } from '../middleware/auth.middleware.js';
import { llmRequestJsonSchema } from '../schemas/llm.schemas.js';
import type { LLMRequest } from '../../application/dto/llm-request.dto.js';
import { llmRequestSchema } from '../../application/dto/llm-request.dto.js';
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
        preHandler: authenticationMiddleware,
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
                  type: 'object',
                  properties: {
                    content: { type: 'string' },
                    model: { type: 'string' },
                    usage: {
                      type: 'object',
                      properties: {
                        promptTokens: { type: 'integer' },
                        completionTokens: { type: 'integer' },
                        totalTokens: { type: 'integer' },
                      },
                    },
                    finishReason: { type: 'string' },
                  },
                  required: ['content', 'model'],
                },
              },
              required: ['success', 'data'],
            },
            400: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
                error: { type: 'string' },
              },
            },
            401: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
                error: { type: 'string' },
              },
            },
            500: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
                error: { type: 'string' },
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

      this.logger.info(
        {
          model: validatedRequest.model,
          promptLength: validatedRequest.prompt.length,
        },
        'Received LLM request',
      );

      const response = await this.llmService.generateCompletion(validatedRequest);

      await reply.send({
        success: true,
        data: response,
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        this.logger.error({ error }, 'Validation error');
        await reply.status(400).send({
          success: false,
          error: 'Invalid request body',
        });
        return;
      }

      this.logger.error({ error }, 'Error generating completion');
      await reply.status(500).send({
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }
}
