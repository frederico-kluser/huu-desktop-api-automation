import { LlmModel } from '../../domain/enums/llm-model.enum.js';

export const llmRequestJsonSchema = {
  type: 'object',
  properties: {
    prompt: { type: 'string', minLength: 1 },
    model: {
      type: 'string',
      enum: Object.values(LlmModel),
    },
    temperature: { type: 'number', minimum: 0, maximum: 2, default: 0.7 },
    maxTokens: { type: 'integer', minimum: 1, maximum: 4096, default: 1000 },
    systemPrompt: { type: 'string' },
    outputFormat: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['object', 'array', 'string', 'number', 'boolean'],
        },
        properties: {
          type: 'object',
          additionalProperties: true,
        },
        items: {
          type: 'object',
          additionalProperties: true,
        },
        required: {
          type: 'array',
          items: { type: 'string' },
        },
        additionalProperties: { type: 'boolean' },
        description: { type: 'string' },
      },
      required: ['type'],
      additionalProperties: false,
    },
  },
  required: ['prompt', 'model'],
  additionalProperties: false,
};
