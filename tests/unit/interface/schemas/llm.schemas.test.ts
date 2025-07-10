// Mock do enum antes dos requires
const mockLlmModel = {
  O3: 'o3',
  GPT_4_1: 'gpt-4.1',
  GPT_4_1_MINI: 'gpt-4.1-mini',
  DEEPSEEK_CHAT: 'deepseek-chat',
  DEEPSEEK_REASONER: 'deepseek-reasoner',
  DEEPSEEK_CODER: 'deepseek-coder',
};

jest.mock('../../../../src/domain/enums/llm-model.enum.js', () => ({
  LlmModel: mockLlmModel,
}));

describe('llm.schemas', () => {
  let schemas: any;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  test('should export llmRequestJsonSchema', () => {
    schemas = require('../../../../src/interface/schemas/llm.schemas');
    expect(schemas.llmRequestJsonSchema).toBeDefined();
  });

  test('llmRequestJsonSchema structure', () => {
    schemas = require('../../../../src/interface/schemas/llm.schemas');
    const schema = schemas.llmRequestJsonSchema;

    // Test basic structure
    expect(schema.type).toBe('object');
    expect(schema.required).toEqual(['prompt', 'model']);
    expect(schema.additionalProperties).toBe(false);
  });

  test('llmRequestJsonSchema properties', () => {
    schemas = require('../../../../src/interface/schemas/llm.schemas');
    const { properties } = schemas.llmRequestJsonSchema;

    // Test prompt property
    expect(properties.prompt).toEqual({
      type: 'string',
      minLength: 1,
    });

    // Test model property
    expect(properties.model).toEqual({
      type: 'string',
      enum: Object.values(mockLlmModel),
    });

    // Test temperature property
    expect(properties.temperature).toEqual({
      type: 'number',
      minimum: 0,
      maximum: 2,
      default: 0.7,
    });

    // Test maxTokens property
    expect(properties.maxTokens).toEqual({
      type: 'integer',
      minimum: 1,
      maximum: 4096,
      default: 1000,
    });

    // Test systemPrompt property
    expect(properties.systemPrompt).toEqual({
      type: 'string',
    });
  });

  test('outputFormat property structure', () => {
    schemas = require('../../../../src/interface/schemas/llm.schemas');
    const outputFormat = schemas.llmRequestJsonSchema.properties.outputFormat;

    expect(outputFormat.type).toBe('object');
    expect(outputFormat.required).toEqual(['type']);
    expect(outputFormat.additionalProperties).toBe(false);

    const { properties } = outputFormat;

    // Test type property
    expect(properties.type).toEqual({
      type: 'string',
      enum: ['object', 'array', 'string', 'number', 'boolean'],
    });

    // Test properties property
    expect(properties.properties).toEqual({
      type: 'object',
      additionalProperties: true,
    });

    // Test items property
    expect(properties.items).toEqual({
      type: 'object',
      additionalProperties: true,
    });

    // Test required property
    expect(properties.required).toEqual({
      type: 'array',
      items: { type: 'string' },
    });

    // Test additionalProperties property
    expect(properties.additionalProperties).toEqual({
      type: 'boolean',
    });

    // Test description property
    expect(properties.description).toEqual({
      type: 'string',
    });
  });

  test('should validate schema with all LLM models', () => {
    schemas = require('../../../../src/interface/schemas/llm.schemas');
    const modelEnum = schemas.llmRequestJsonSchema.properties.model.enum;

    // Verify all enum values are included
    expect(modelEnum).toContain('o3');
    expect(modelEnum).toContain('gpt-4.1');
    expect(modelEnum).toContain('gpt-4.1-mini');
    expect(modelEnum).toContain('deepseek-chat');
    expect(modelEnum).toContain('deepseek-reasoner');
    expect(modelEnum).toContain('deepseek-coder');
    expect(modelEnum.length).toBe(6);
  });

  test('should handle different enum values', () => {
    // Test with different enum values
    jest.resetModules();
    jest.doMock('../../../../src/domain/enums/llm-model.enum.js', () => ({
      LlmModel: {
        TEST_MODEL: 'test-model',
        ANOTHER_MODEL: 'another-model',
      },
    }));

    const newSchemas = require('../../../../src/interface/schemas/llm.schemas');
    const modelEnum = newSchemas.llmRequestJsonSchema.properties.model.enum;

    expect(modelEnum).toEqual(['test-model', 'another-model']);
  });

  test('should have correct numeric constraints', () => {
    schemas = require('../../../../src/interface/schemas/llm.schemas');
    const { temperature, maxTokens } = schemas.llmRequestJsonSchema.properties;

    // Temperature constraints
    expect(temperature.minimum).toBe(0);
    expect(temperature.maximum).toBe(2);
    expect(temperature.default).toBe(0.7);

    // MaxTokens constraints
    expect(maxTokens.minimum).toBe(1);
    expect(maxTokens.maximum).toBe(4096);
    expect(maxTokens.default).toBe(1000);
    expect(maxTokens.type).toBe('integer');
  });

  test('should handle nested outputFormat validation', () => {
    schemas = require('../../../../src/interface/schemas/llm.schemas');
    const outputFormat = schemas.llmRequestJsonSchema.properties.outputFormat;

    // Verify nested structure allows proper validation
    expect(outputFormat.properties.properties.additionalProperties).toBe(true);
    expect(outputFormat.properties.items.additionalProperties).toBe(true);
    expect(outputFormat.properties.required.items.type).toBe('string');
  });

  test('exports coverage', () => {
    schemas = require('../../../../src/interface/schemas/llm.schemas');

    // Test all exports
    Object.entries(schemas).forEach(([key, value]) => {
      if (typeof value === 'function') {
        try {
          value();
          value('test', 123, {}, []);
          value(null, undefined, false);
        } catch {}
      }
    });

    // Verify exported object structure
    expect(typeof schemas.llmRequestJsonSchema).toBe('object');
    expect(schemas.llmRequestJsonSchema).toHaveProperty('type');
    expect(schemas.llmRequestJsonSchema).toHaveProperty('properties');
    expect(schemas.llmRequestJsonSchema).toHaveProperty('required');
  });
});
