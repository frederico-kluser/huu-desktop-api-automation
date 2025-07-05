export const llmRequestJsonSchema = {
  type: 'object',
  properties: {
    prompt: { type: 'string', minLength: 1 },
    model: { type: 'string', enum: ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo'] },
    temperature: { type: 'number', minimum: 0, maximum: 2, default: 0.7 },
    maxTokens: { type: 'integer', minimum: 1, maximum: 4096, default: 1000 },
    systemPrompt: { type: 'string' },
  },
  required: ['prompt', 'model'],
  additionalProperties: false,
};
