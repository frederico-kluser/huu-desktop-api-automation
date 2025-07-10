// Mock do outputFormatSchema antes de qualquer require
jest.mock('../../../../src/application/dto/output-format.dto.js', () => {
  const z = require('zod');
  return {
    outputFormatSchema: z.object({
      type: z.enum(['object', 'array', 'string', 'number', 'boolean']),
      properties: z.record(z.any()).optional(),
    }),
  };
});

describe('llm-request.dto', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  test('exports llmRequestSchema and LLMRequest type', () => {
    const module = require('../../../../src/application/dto/llm-request.dto');
    expect(module.llmRequestSchema).toBeDefined();
    expect(module.llmRequestSchema.parse).toBeDefined();
  });

  test('validates valid LLM request - minimal required fields', () => {
    const module = require('../../../../src/application/dto/llm-request.dto');
    const { LlmModel } = require('../../../../src/domain/enums/llm-model.enum');

    const validRequest = {
      prompt: 'Test prompt',
      model: LlmModel.GPT_4_1,
    };

    const result = module.llmRequestSchema.parse(validRequest);
    expect(result.prompt).toBe('Test prompt');
    expect(result.model).toBe(LlmModel.GPT_4_1);
    expect(result.temperature).toBe(0.7);
    expect(result.maxTokens).toBe(1000);
  });

  test('validates valid LLM request - all fields', () => {
    const module = require('../../../../src/application/dto/llm-request.dto');
    const { LlmModel } = require('../../../../src/domain/enums/llm-model.enum');

    const validRequest = {
      prompt: 'Test prompt',
      model: LlmModel.DEEPSEEK_CHAT,
      temperature: 1.5,
      maxTokens: 2048,
      systemPrompt: 'System prompt',
      outputFormat: {
        type: 'object',
        properties: { name: { type: 'string' } },
      },
    };

    const result = module.llmRequestSchema.parse(validRequest);
    expect(result.prompt).toBe('Test prompt');
    expect(result.model).toBe(LlmModel.DEEPSEEK_CHAT);
    expect(result.temperature).toBe(1.5);
    expect(result.maxTokens).toBe(2048);
    expect(result.systemPrompt).toBe('System prompt');
    expect(result.outputFormat).toEqual({
      type: 'object',
      properties: { name: { type: 'string' } },
    });
  });

  test('validates all enum values', () => {
    const module = require('../../../../src/application/dto/llm-request.dto');
    const { LlmModel } = require('../../../../src/domain/enums/llm-model.enum');

    const models = Object.values(LlmModel);
    models.forEach((model) => {
      const request = {
        prompt: 'Test',
        model: model,
      };
      expect(() => module.llmRequestSchema.parse(request)).not.toThrow();
    });
  });

  test('fails validation - empty prompt', () => {
    const module = require('../../../../src/application/dto/llm-request.dto');
    const { LlmModel } = require('../../../../src/domain/enums/llm-model.enum');

    const invalidRequest = {
      prompt: '',
      model: LlmModel.GPT_4_1,
    };

    expect(() => module.llmRequestSchema.parse(invalidRequest)).toThrow();
  });

  test('fails validation - missing prompt', () => {
    const module = require('../../../../src/application/dto/llm-request.dto');
    const { LlmModel } = require('../../../../src/domain/enums/llm-model.enum');

    const invalidRequest = {
      model: LlmModel.GPT_4_1,
    };

    expect(() => module.llmRequestSchema.parse(invalidRequest)).toThrow();
  });

  test('fails validation - invalid model', () => {
    const module = require('../../../../src/application/dto/llm-request.dto');

    const invalidRequest = {
      prompt: 'Test',
      model: 'invalid-model',
    };

    expect(() => module.llmRequestSchema.parse(invalidRequest)).toThrow();
  });

  test('fails validation - temperature too low', () => {
    const module = require('../../../../src/application/dto/llm-request.dto');
    const { LlmModel } = require('../../../../src/domain/enums/llm-model.enum');

    const invalidRequest = {
      prompt: 'Test',
      model: LlmModel.GPT_4_1,
      temperature: -0.1,
    };

    expect(() => module.llmRequestSchema.parse(invalidRequest)).toThrow();
  });

  test('fails validation - temperature too high', () => {
    const module = require('../../../../src/application/dto/llm-request.dto');
    const { LlmModel } = require('../../../../src/domain/enums/llm-model.enum');

    const invalidRequest = {
      prompt: 'Test',
      model: LlmModel.GPT_4_1,
      temperature: 2.1,
    };

    expect(() => module.llmRequestSchema.parse(invalidRequest)).toThrow();
  });

  test('validates temperature boundaries', () => {
    const module = require('../../../../src/application/dto/llm-request.dto');
    const { LlmModel } = require('../../../../src/domain/enums/llm-model.enum');

    // Test minimum temperature
    const minTemp = {
      prompt: 'Test',
      model: LlmModel.GPT_4_1,
      temperature: 0,
    };
    expect(() => module.llmRequestSchema.parse(minTemp)).not.toThrow();

    // Test maximum temperature
    const maxTemp = {
      prompt: 'Test',
      model: LlmModel.GPT_4_1,
      temperature: 2,
    };
    expect(() => module.llmRequestSchema.parse(maxTemp)).not.toThrow();
  });

  test('fails validation - maxTokens too low', () => {
    const module = require('../../../../src/application/dto/llm-request.dto');
    const { LlmModel } = require('../../../../src/domain/enums/llm-model.enum');

    const invalidRequest = {
      prompt: 'Test',
      model: LlmModel.GPT_4_1,
      maxTokens: 0,
    };

    expect(() => module.llmRequestSchema.parse(invalidRequest)).toThrow();
  });

  test('fails validation - maxTokens too high', () => {
    const module = require('../../../../src/application/dto/llm-request.dto');
    const { LlmModel } = require('../../../../src/domain/enums/llm-model.enum');

    const invalidRequest = {
      prompt: 'Test',
      model: LlmModel.GPT_4_1,
      maxTokens: 4097,
    };

    expect(() => module.llmRequestSchema.parse(invalidRequest)).toThrow();
  });

  test('fails validation - maxTokens not integer', () => {
    const module = require('../../../../src/application/dto/llm-request.dto');
    const { LlmModel } = require('../../../../src/domain/enums/llm-model.enum');

    const invalidRequest = {
      prompt: 'Test',
      model: LlmModel.GPT_4_1,
      maxTokens: 100.5,
    };

    expect(() => module.llmRequestSchema.parse(invalidRequest)).toThrow();
  });

  test('validates maxTokens boundaries', () => {
    const module = require('../../../../src/application/dto/llm-request.dto');
    const { LlmModel } = require('../../../../src/domain/enums/llm-model.enum');

    // Test minimum maxTokens
    const minTokens = {
      prompt: 'Test',
      model: LlmModel.GPT_4_1,
      maxTokens: 1,
    };
    expect(() => module.llmRequestSchema.parse(minTokens)).not.toThrow();

    // Test maximum maxTokens
    const maxTokens = {
      prompt: 'Test',
      model: LlmModel.GPT_4_1,
      maxTokens: 4096,
    };
    expect(() => module.llmRequestSchema.parse(maxTokens)).not.toThrow();
  });

  test('systemPrompt is optional', () => {
    const module = require('../../../../src/application/dto/llm-request.dto');
    const { LlmModel } = require('../../../../src/domain/enums/llm-model.enum');

    const withoutSystemPrompt = {
      prompt: 'Test',
      model: LlmModel.GPT_4_1,
    };

    const result = module.llmRequestSchema.parse(withoutSystemPrompt);
    expect(result.systemPrompt).toBeUndefined();
  });

  test('outputFormat is optional', () => {
    const module = require('../../../../src/application/dto/llm-request.dto');
    const { LlmModel } = require('../../../../src/domain/enums/llm-model.enum');

    const withoutOutputFormat = {
      prompt: 'Test',
      model: LlmModel.GPT_4_1,
    };

    const result = module.llmRequestSchema.parse(withoutOutputFormat);
    expect(result.outputFormat).toBeUndefined();
  });

  test('handles various invalid inputs', () => {
    const module = require('../../../../src/application/dto/llm-request.dto');

    // Test null
    expect(() => module.llmRequestSchema.parse(null)).toThrow();

    // Test undefined
    expect(() => module.llmRequestSchema.parse(undefined)).toThrow();

    // Test empty object
    expect(() => module.llmRequestSchema.parse({})).toThrow();

    // Test wrong types
    expect(() =>
      module.llmRequestSchema.parse({
        prompt: 123,
        model: 'gpt-4',
      }),
    ).toThrow();

    expect(() =>
      module.llmRequestSchema.parse({
        prompt: 'Test',
        model: 123,
      }),
    ).toThrow();
  });

  test('transforms data with defaults', () => {
    const module = require('../../../../src/application/dto/llm-request.dto');
    const { LlmModel } = require('../../../../src/domain/enums/llm-model.enum');

    const minimalRequest = {
      prompt: 'Test prompt',
      model: LlmModel.O3,
    };

    const result = module.llmRequestSchema.parse(minimalRequest);

    // Should have defaults applied
    expect(result).toEqual({
      prompt: 'Test prompt',
      model: LlmModel.O3,
      temperature: 0.7,
      maxTokens: 1000,
    });
  });

  test('type inference works correctly', () => {
    const module = require('../../../../src/application/dto/llm-request.dto');

    // This test verifies that the type export exists
    // In runtime, we can't directly test types, but we can verify the schema structure
    expect(module.llmRequestSchema.shape).toBeDefined();
    expect(module.llmRequestSchema.shape.prompt).toBeDefined();
    expect(module.llmRequestSchema.shape.model).toBeDefined();
    expect(module.llmRequestSchema.shape.temperature).toBeDefined();
    expect(module.llmRequestSchema.shape.maxTokens).toBeDefined();
    expect(module.llmRequestSchema.shape.systemPrompt).toBeDefined();
    expect(module.llmRequestSchema.shape.outputFormat).toBeDefined();
  });
});
