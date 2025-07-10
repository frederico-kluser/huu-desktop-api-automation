// Mock de dependências externas antes de imports - baseado no know-how.txt
jest.mock('../../../../src/config/logger.js', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('../../../../src/config/output-format.config.js', () => ({
  outputFormatConfig: {
    cacheTtl: 10,
    enableDebugLogs: true,
    enableCache: true,
    maxDepth: 10,
  },
}));

jest.mock('../../../../src/application/dto/output-format.dto.js', () => ({
  validateSchemaDepth: jest.fn().mockReturnValue(true),
  sanitizeSchema: jest.fn((schema: any) => schema),
}));

// Usar require() ao invés de import devido ao verbatimModuleSyntax - baseado no know-how.txt
const {
  IOutputParserStrategy,
  ZodParserStrategy,
  OutputParserFactory,
} = require('../../../../src/application/factory/output-parser.factory.js');

const { logger } = require('../../../../src/config/logger.js');
const { outputFormatConfig } = require('../../../../src/config/output-format.config.js');
const {
  validateSchemaDepth,
  sanitizeSchema,
} = require('../../../../src/application/dto/output-format.dto.js');

describe('output-parser.factory coverage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    // Reset singleton para evitar cache compartilhado entre testes
    (OutputParserFactory as any).instance = null;
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
  });

  describe('ZodParserStrategy', () => {
    let strategy: any;

    beforeEach(() => {
      strategy = new ZodParserStrategy();
    });

    test('parses string schema', () => {
      const schema = { type: 'string' };
      const content = '"test string"';

      const result = strategy.parse(content, schema);

      expect(result).toBe('test string');
      expect(sanitizeSchema).toHaveBeenCalledWith(schema);
      expect(logger.info).toHaveBeenCalled();
    });

    test('parses number schema', () => {
      const schema = { type: 'number' };
      const content = '123';

      const result = strategy.parse(content, schema);

      expect(result).toBe(123);
    });

    test('parses boolean schema', () => {
      const schema = { type: 'boolean' };
      const content = 'true';

      const result = strategy.parse(content, schema);

      expect(result).toBe(true);
    });

    test('parses array schema', () => {
      const schema = {
        type: 'array',
        items: { type: 'string' },
      };
      const content = '["item1", "item2"]';

      const result = strategy.parse(content, schema);

      expect(result).toEqual(['item1', 'item2']);
    });

    test('parses array schema without items', () => {
      const schema = { type: 'array' };
      const content = '[1, "test", true]';

      const result = strategy.parse(content, schema);

      expect(result).toEqual([1, 'test', true]);
    });

    test('parses object schema', () => {
      const schema = {
        type: 'object',
        properties: {
          name: { type: 'string' },
          age: { type: 'number' },
        },
      };
      const content = '{"name": "John", "age": 30}';

      const result = strategy.parse(content, schema);

      expect(result).toEqual({ name: 'John', age: 30 });
    });

    test('parses object schema with required fields', () => {
      const schema = {
        type: 'object',
        properties: {
          name: { type: 'string' },
        },
        required: ['name'],
      };
      const content = '{"name": "John"}';

      const result = strategy.parse(content, schema);

      expect(result).toEqual({ name: 'John' });
    });

    test('parses object schema with strict mode', () => {
      const schema = {
        type: 'object',
        properties: {
          name: { type: 'string' },
        },
        additionalProperties: false,
      };
      const content = '{"name": "John"}';

      const result = strategy.parse(content, schema);

      expect(result).toEqual({ name: 'John' });
    });

    test('parses empty object schema', () => {
      const schema = { type: 'object' };
      const content = '{}';

      const result = strategy.parse(content, schema);

      expect(result).toEqual({});
    });

    test('parses unknown type as any', () => {
      const schema = { type: 'unknown' };
      const content = '"anything"';

      const result = strategy.parse(content, schema);

      expect(result).toBe('anything');
    });

    test('throws error for invalid JSON', () => {
      const schema = { type: 'string' };
      const content = 'invalid json';

      expect(() => strategy.parse(content, schema)).toThrow('Conteúdo LLM não é JSON válido');
      expect(logger.error).toHaveBeenCalled();
    });

    test('throws error when validation fails', () => {
      const schema = { type: 'number' };
      const content = '"not a number"';

      expect(() => strategy.parse(content, schema)).toThrow();
      expect(logger.error).toHaveBeenCalled();
    });

    test('uses cache for repeated schemas', () => {
      const schema = { type: 'string' };
      const content1 = '"test1"';
      const content2 = '"test2"';

      strategy.parse(content1, schema);
      strategy.parse(content2, schema);

      // Segunda chamada deve ter cacheHit: true
      const infoCall = logger.info.mock.calls[1];
      expect(infoCall[1].cacheHit).toBe(true);
    });

    test('cache expires after TTL', () => {
      // Testa apenas que o parse funciona após expiração do TTL
      const schema = { type: 'string' };
      const content = '"test"';

      const result1 = strategy.parse(content, schema);
      expect(result1).toBe('test');

      // Avança tempo além do TTL
      jest.advanceTimersByTime((outputFormatConfig.cacheTtl + 1) * 60 * 1000);

      const result2 = strategy.parse('"test2"', schema);
      expect(result2).toBe('test2');
    });

    test('isSupported returns true for valid types', () => {
      const supportedTypes = ['string', 'number', 'boolean', 'array', 'object'];

      supportedTypes.forEach((type) => {
        expect(strategy.isSupported({ type })).toBe(true);
      });
    });

    test('isSupported returns false for invalid types', () => {
      expect(strategy.isSupported({ type: 'invalid' })).toBe(false);
    });

    test('isSupported returns false when depth validation fails', () => {
      validateSchemaDepth.mockReturnValueOnce(false);

      expect(strategy.isSupported({ type: 'string' })).toBe(false);
    });

    test('logs debug info when enableDebugLogs is true', () => {
      outputFormatConfig.enableDebugLogs = true;
      const schema = { type: 'string' };
      const content = '"test"';

      strategy.parse(content, schema);

      // Apenas verifica que logger.info foi chamado com os parâmetros corretos
      expect(logger.info).toHaveBeenCalled();
      const lastCall = logger.info.mock.calls[logger.info.mock.calls.length - 1];
      expect(lastCall[0]).toBe('Output parsing successful');
      expect(lastCall[1]).toHaveProperty('processingTime');
      expect(lastCall[1]).toHaveProperty('schemaType', 'string');
      expect(lastCall[1]).toHaveProperty('cacheHit');
    });

    test('does not log debug info when enableDebugLogs is false', () => {
      outputFormatConfig.enableDebugLogs = false;
      const schema = { type: 'string' };
      const content = '"test"';

      strategy.parse(content, schema);

      expect(logger.info).not.toHaveBeenCalled();
    });
  });

  describe('OutputParserFactory', () => {
    let factory: any;

    beforeEach(() => {
      // Reset singleton
      (OutputParserFactory as any).instance = null;
      factory = OutputParserFactory.getInstance();
    });

    test('singleton pattern works', () => {
      const factory1 = OutputParserFactory.getInstance();
      const factory2 = OutputParserFactory.getInstance();

      expect(factory1).toBe(factory2);
    });

    test('registers default strategies', () => {
      const strategy = factory.getStrategy({ type: 'string' });

      expect(strategy).toBeInstanceOf(ZodParserStrategy);
    });

    test('allows registering custom strategies', () => {
      const customStrategy = {
        parse: jest.fn(),
        isSupported: jest.fn().mockReturnValue(true),
      };

      factory.registerStrategy('custom', customStrategy);

      // Testa que a estratégia está registrada
      expect(factory['strategies'].get('custom')).toBe(customStrategy);
    });

    test('throws error when no strategy available', () => {
      // Limpa estratégias
      factory['strategies'].clear();

      expect(() => factory.getStrategy({ type: 'string' })).toThrow(
        'Nenhuma estratégia de parsing disponível',
      );
    });

    test('throws error when schema not supported', () => {
      const strategy = factory.getStrategy({ type: 'string' });
      jest.spyOn(strategy, 'isSupported').mockReturnValue(false);

      expect(() => factory.getStrategy({ type: 'unsupported' })).toThrow(
        'Esquema não suportado: unsupported',
      );
    });

    test('cleanup method cleans caches', () => {
      const strategy = factory['strategies'].get('zod');
      const cleanupSpy = jest.spyOn(strategy['cache'], 'cleanup');

      factory.cleanup();

      expect(cleanupSpy).toHaveBeenCalled();
    });

    test('cleanup handles non-ZodParserStrategy', () => {
      const customStrategy = {
        parse: jest.fn(),
        isSupported: jest.fn(),
      };

      factory.registerStrategy('custom', customStrategy);

      // Não deve lançar erro
      expect(() => factory.cleanup()).not.toThrow();
    });
  });

  describe('SchemaCache', () => {
    let strategy: any;
    let cache: any;

    beforeEach(() => {
      strategy = new ZodParserStrategy();
      cache = strategy['cache'];
    });

    test('cleanup removes expired entries', () => {
      const schema1 = { type: 'string' };
      const schema2 = { type: 'number' };

      // Parse para adicionar ao cache
      strategy.parse('"test"', schema1);
      strategy.parse('123', schema2);

      // Avança tempo parcialmente (apenas schema1 expira)
      jest.advanceTimersByTime((outputFormatConfig.cacheTtl + 1) * 60 * 1000);

      // Parse schema2 novamente para atualizar timestamp
      strategy.parse('456', schema2);

      // Limpa cache
      cache.cleanup();

      // Verifica que apenas schema1 foi removido
      expect(cache.get(schema1)).toBeNull();
      expect(cache.get(schema2)).not.toBeNull();
    });
  });

  describe('Periodic cache cleanup', () => {
    beforeEach(() => {
      jest.clearAllTimers();
      jest.resetModules();
    });

    test('setInterval is called when cache enabled', () => {
      const setIntervalSpy = jest.spyOn(global, 'setInterval');

      // Recarrega módulo para executar código de nível superior
      jest.doMock('../../../../src/config/output-format.config.js', () => ({
        outputFormatConfig: {
          cacheTtl: 10,
          enableDebugLogs: true,
          enableCache: true,
          maxDepth: 10,
        },
      }));

      require('../../../../src/application/factory/output-parser.factory.js');

      expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 10 * 60 * 1000);

      // Limpa todos os intervalos criados
      jest.clearAllTimers();
    });

    test('setInterval not called when cache disabled', () => {
      const setIntervalSpy = jest.spyOn(global, 'setInterval');

      // Recarrega módulo com cache desabilitado
      jest.doMock('../../../../src/config/output-format.config.js', () => ({
        outputFormatConfig: {
          cacheTtl: 10,
          enableDebugLogs: true,
          enableCache: false,
          maxDepth: 10,
        },
      }));

      require('../../../../src/application/factory/output-parser.factory.js');

      expect(setIntervalSpy).not.toHaveBeenCalled();
    });
  });

  // Teste de edge cases e coverage adicional
  describe('Edge cases', () => {
    let strategy: any;

    beforeEach(() => {
      strategy = new ZodParserStrategy();
    });

    test('handles nested objects and arrays', () => {
      const schema = {
        type: 'object',
        properties: {
          nested: {
            type: 'object',
            properties: {
              array: {
                type: 'array',
                items: { type: 'number' },
              },
            },
          },
        },
      };
      const content = '{"nested": {"array": [1, 2, 3]}}';

      const result = strategy.parse(content, schema);

      expect(result).toEqual({
        nested: {
          array: [1, 2, 3],
        },
      });
    });

    test('handles JSON parse error with non-Error exception', () => {
      const schema = { type: 'string' };
      const content = 'invalid';

      // Mock JSON.parse para lançar não-Error
      const originalParse = JSON.parse;
      JSON.parse = jest.fn().mockImplementation(() => {
        throw 'string error';
      });

      expect(() => strategy.parse(content, schema)).toThrow(
        'Conteúdo LLM não é JSON válido: Erro desconhecido',
      );

      JSON.parse = originalParse;
    });

    test('logs non-Error exceptions', () => {
      const schema = { type: 'string' };
      const content = '"test"';

      // Mock para forçar erro não-Error
      jest.spyOn(strategy, 'buildZodSchema').mockImplementation(() => {
        throw 'string error';
      });

      expect(() => strategy.parse(content, schema)).toThrow();

      expect(logger.error).toHaveBeenCalledWith(
        'Output parsing failed',
        expect.objectContaining({
          error: 'Erro desconhecido',
        }),
      );
    });
  });
});
