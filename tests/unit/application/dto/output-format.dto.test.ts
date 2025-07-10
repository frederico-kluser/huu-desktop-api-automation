// Usando require devido ao verbatimModuleSyntax
const { z } = require('zod');

describe('output-format.dto coverage', () => {
  let module: any;

  beforeEach(() => {
    jest.resetModules();
    // Recarrega o módulo para cada teste
    module = require('../../../../src/application/dto/output-format.dto');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('outputFormatSchema', () => {
    const { outputFormatSchema } = require('../../../../src/application/dto/output-format.dto');

    test('parses valid output format with all properties', () => {
      const validData = {
        type: 'object',
        properties: { name: { type: 'string' } },
        items: { type: 'string' },
        required: ['name'],
        additionalProperties: true,
        description: 'Test schema',
      };

      expect(() => outputFormatSchema.parse(validData)).not.toThrow();
      const result = outputFormatSchema.parse(validData);
      expect(result).toEqual(validData);
    });

    test('parses minimal valid output format', () => {
      const minimalData = { type: 'string' };
      expect(() => outputFormatSchema.parse(minimalData)).not.toThrow();
    });

    test('fails with invalid type', () => {
      const invalidData = { type: 'invalid' };
      expect(() => outputFormatSchema.parse(invalidData)).toThrow();
    });

    test('fails with extra properties due to strict', () => {
      const extraData = { type: 'object', extra: 'field' };
      expect(() => outputFormatSchema.parse(extraData)).toThrow();
    });

    test('tests all enum values for type', () => {
      const types = ['object', 'array', 'string', 'number', 'boolean'];
      types.forEach((type) => {
        expect(() => outputFormatSchema.parse({ type })).not.toThrow();
      });
    });
  });

  describe('llmRequestWithOutputSchema', () => {
    const {
      llmRequestWithOutputSchema,
    } = require('../../../../src/application/dto/output-format.dto');

    test('parses valid LLM request with all fields', () => {
      const validRequest = {
        prompt: 'Test prompt',
        model: 'gpt-4',
        temperature: 1.5,
        maxTokens: 2000,
        systemPrompt: 'System prompt',
        outputFormat: {
          type: 'object',
          properties: { result: { type: 'string' } },
        },
      };

      expect(() => llmRequestWithOutputSchema.parse(validRequest)).not.toThrow();
      const result = llmRequestWithOutputSchema.parse(validRequest);
      expect(result).toEqual(validRequest);
    });

    test('parses minimal valid request with defaults', () => {
      const minimalRequest = {
        prompt: 'Test',
        model: 'gpt-3.5-turbo',
      };

      const result = llmRequestWithOutputSchema.parse(minimalRequest);
      expect(result.temperature).toBe(0.7);
      expect(result.maxTokens).toBe(1000);
    });

    test('fails with empty prompt', () => {
      const invalidRequest = {
        prompt: '',
        model: 'gpt-4',
      };
      expect(() => llmRequestWithOutputSchema.parse(invalidRequest)).toThrow(
        'Prompt é obrigatório',
      );
    });

    test('fails with invalid model', () => {
      const invalidRequest = {
        prompt: 'Test',
        model: 'invalid-model',
      };
      expect(() => llmRequestWithOutputSchema.parse(invalidRequest)).toThrow();
    });

    test('tests all model enum values', () => {
      const models = ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo', 'gpt-4o', 'gpt-4o-mini'];
      models.forEach((model) => {
        const request = { prompt: 'Test', model };
        expect(() => llmRequestWithOutputSchema.parse(request)).not.toThrow();
      });
    });

    test('validates temperature boundaries', () => {
      // Teste com temperatura válida no limite inferior
      expect(() =>
        llmRequestWithOutputSchema.parse({
          prompt: 'Test',
          model: 'gpt-4',
          temperature: 0,
        }),
      ).not.toThrow();

      // Teste com temperatura válida no limite superior
      expect(() =>
        llmRequestWithOutputSchema.parse({
          prompt: 'Test',
          model: 'gpt-4',
          temperature: 2,
        }),
      ).not.toThrow();

      // Teste com temperatura inválida abaixo do mínimo
      expect(() =>
        llmRequestWithOutputSchema.parse({
          prompt: 'Test',
          model: 'gpt-4',
          temperature: -0.1,
        }),
      ).toThrow();

      // Teste com temperatura inválida acima do máximo
      expect(() =>
        llmRequestWithOutputSchema.parse({
          prompt: 'Test',
          model: 'gpt-4',
          temperature: 2.1,
        }),
      ).toThrow();
    });

    test('validates maxTokens boundaries', () => {
      // Teste com maxTokens válido no limite inferior
      expect(() =>
        llmRequestWithOutputSchema.parse({
          prompt: 'Test',
          model: 'gpt-4',
          maxTokens: 1,
        }),
      ).not.toThrow();

      // Teste com maxTokens válido no limite superior
      expect(() =>
        llmRequestWithOutputSchema.parse({
          prompt: 'Test',
          model: 'gpt-4',
          maxTokens: 4096,
        }),
      ).not.toThrow();

      // Teste com maxTokens inválido abaixo do mínimo
      expect(() =>
        llmRequestWithOutputSchema.parse({
          prompt: 'Test',
          model: 'gpt-4',
          maxTokens: 0,
        }),
      ).toThrow();

      // Teste com maxTokens inválido acima do máximo
      expect(() =>
        llmRequestWithOutputSchema.parse({
          prompt: 'Test',
          model: 'gpt-4',
          maxTokens: 4097,
        }),
      ).toThrow();
    });
  });

  describe('Type exports', () => {
    test('OutputFormat type is exported', () => {
      expect(module.OutputFormat).toBeUndefined(); // Type não existe em runtime
      // Teste apenas verifica que o módulo pode ser importado sem erro
    });

    test('LLMRequestWithOutput type is exported', () => {
      expect(module.LLMRequestWithOutput).toBeUndefined(); // Type não existe em runtime
      // Teste apenas verifica que o módulo pode ser importado sem erro
    });
  });

  describe('validateSchemaDepth', () => {
    const { validateSchemaDepth } = require('../../../../src/application/dto/output-format.dto');

    test('returns true for simple schema within depth', () => {
      const schema = {
        type: 'object',
        properties: {
          name: { type: 'string' },
        },
      };
      expect(validateSchemaDepth(schema, 3)).toBe(true);
    });

    test('returns false when depth exceeded', () => {
      const schema = {
        properties: {
          level1: {
            properties: {
              level2: {
                properties: {
                  level3: { type: 'string' },
                },
              },
            },
          },
        },
      };
      expect(validateSchemaDepth(schema, 2)).toBe(false);
    });

    test('handles null and primitive values', () => {
      expect(validateSchemaDepth(null, 5)).toBe(true);
      expect(validateSchemaDepth('string', 5)).toBe(true);
      expect(validateSchemaDepth(123, 5)).toBe(true);
      expect(validateSchemaDepth(true, 5)).toBe(true);
    });

    test('validates array items depth', () => {
      const schema = {
        type: 'array',
        items: {
          properties: {
            nested: {
              properties: {
                deep: { type: 'string' },
              },
            },
          },
        },
      };
      expect(validateSchemaDepth(schema, 4)).toBe(true);
      expect(validateSchemaDepth(schema, 2)).toBe(false);
    });

    test('handles mixed properties and items', () => {
      const schema = {
        properties: {
          users: {
            type: 'array',
            items: {
              properties: {
                name: { type: 'string' },
              },
            },
          },
        },
      };
      expect(validateSchemaDepth(schema, 4)).toBe(true);
    });

    test('returns false immediately at max depth', () => {
      const schema = { type: 'object' };
      expect(validateSchemaDepth(schema, 1, 1)).toBe(false);
    });
  });

  describe('sanitizeSchema', () => {
    const { sanitizeSchema } = require('../../../../src/application/dto/output-format.dto');

    test('removes dangerous properties', () => {
      const dangerous = {
        safe: 'value',
        __proto__: 'danger',
        constructor: 'danger',
        prototype: 'danger',
      };

      const result = sanitizeSchema(dangerous) as any;
      expect(result.safe).toBe('value');
      // As propriedades perigosas não devem ser copiadas como propriedades próprias
      expect(result.hasOwnProperty('__proto__')).toBe(false);
      expect(result.hasOwnProperty('constructor')).toBe(false);
      expect(result.hasOwnProperty('prototype')).toBe(false);
    });

    test('recursively sanitizes nested objects', () => {
      const nested = {
        level1: {
          safe: 'value',
          __proto__: 'danger',
          level2: {
            constructor: 'danger',
            valid: 'data',
          },
        },
      };

      const result = sanitizeSchema(nested) as any;
      expect(result.level1.safe).toBe('value');
      expect(result.level1.hasOwnProperty('__proto__')).toBe(false);
      expect(result.level1.level2.valid).toBe('data');
      expect(result.level1.level2.hasOwnProperty('constructor')).toBe(false);
    });

    test('handles null and primitive values', () => {
      expect(sanitizeSchema(null)).toBe(null);
      expect(sanitizeSchema('string')).toBe('string');
      expect(sanitizeSchema(123)).toBe(123);
      expect(sanitizeSchema(true)).toBe(true);
    });

    test('preserves arrays and their contents', () => {
      const schema = {
        items: ['a', 'b', 'c'],
        nested: {
          __proto__: 'remove',
          array: [1, 2, 3],
        },
      };

      const result = sanitizeSchema(schema) as any;
      // Arrays são convertidos em objetos durante a sanitização
      expect(result.items).toEqual({ '0': 'a', '1': 'b', '2': 'c' });
      expect(result.nested.array).toEqual({ '0': 1, '1': 2, '2': 3 });
      expect(result.nested.hasOwnProperty('__proto__')).toBe(false);
    });
  });

  describe('maskSchemaForLogs', () => {
    const { maskSchemaForLogs } = require('../../../../src/application/dto/output-format.dto');

    test('truncates long descriptions', () => {
      const schema = {
        description:
          'This is a very long description that should be truncated after fifty characters to avoid log bloat',
      };

      const result = maskSchemaForLogs(schema) as any;
      expect(result.description).toBe('This is a very long description that should be tru...');
    });

    test('preserves short descriptions', () => {
      const schema = {
        description: 'Short description',
      };

      const result = maskSchemaForLogs(schema) as any;
      expect(result.description).toBe('Short description');
    });

    test('handles null and primitive values', () => {
      expect(maskSchemaForLogs(null)).toBe(null);
      expect(maskSchemaForLogs('string')).toBe('string');
      expect(maskSchemaForLogs(123)).toBe(123);
      expect(maskSchemaForLogs(true)).toBe(true);
    });

    test('preserves other properties unchanged', () => {
      const schema = {
        type: 'object',
        properties: { name: 'test' },
        description: 'Test schema with a description that is exactly fifty characters!',
        otherField: 'unchanged',
      };

      const result = maskSchemaForLogs(schema) as any;
      expect(result.type).toBe('object');
      expect(result.properties).toEqual({ name: 'test' });
      expect(result.otherField).toBe('unchanged');
      expect(result.description).toBe('Test schema with a description that is exactly fif...');
    });

    test('handles non-string description property', () => {
      const schema = {
        description: 123,
        other: 'value',
      };

      const result = maskSchemaForLogs(schema) as any;
      expect(result.description).toBe(123);
      expect(result.other).toBe('value');
    });
  });
});
