// Mock das dependências antes dos requires
jest.mock('../../../src/config/environment.js', () => ({
  isDevelopment: false,
}));

// Salvar environment original
const originalEnv = process.env;

describe('output-format.config coverage', () => {
  beforeEach(() => {
    // Resetar módulos e restaurar environment
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    // Restaurar environment original
    process.env = originalEnv;
  });

  describe('validateOutputFormatConfig (executada na importação)', () => {
    test('módulo carrega com configuração válida default', () => {
      // Configuração default é válida, então a importação não deve lançar erro
      expect(() => require('../../../src/config/output-format.config')).not.toThrow();
    });

    test('lança erro para maxSchemaSize inválido - valor zero', () => {
      process.env.OUTPUT_SCHEMA_MAX_SIZE = '0';

      expect(() => require('../../../src/config/output-format.config')).toThrow(
        'maxSchemaSize deve estar entre 1 e 1MB',
      );
    });

    test('lança erro para maxSchemaSize inválido - valor muito alto', () => {
      process.env.OUTPUT_SCHEMA_MAX_SIZE = String(1024 * 1024 + 1);

      expect(() => require('../../../src/config/output-format.config')).toThrow(
        'maxSchemaSize deve estar entre 1 e 1MB',
      );
    });

    test('lança erro para maxDepth inválido - valor zero', () => {
      process.env.OUTPUT_SCHEMA_MAX_DEPTH = '0';

      expect(() => require('../../../src/config/output-format.config')).toThrow(
        'maxDepth deve estar entre 1 e 20',
      );
    });

    test('lança erro para maxDepth inválido - valor muito alto', () => {
      process.env.OUTPUT_SCHEMA_MAX_DEPTH = '21';

      expect(() => require('../../../src/config/output-format.config')).toThrow(
        'maxDepth deve estar entre 1 e 20',
      );
    });

    test('lança erro para parseTimeout inválido - valor muito baixo', () => {
      process.env.OUTPUT_SCHEMA_PARSE_TIMEOUT = '99';

      expect(() => require('../../../src/config/output-format.config')).toThrow(
        'parseTimeout deve estar entre 100ms e 30s',
      );
    });

    test('lança erro para parseTimeout inválido - valor muito alto', () => {
      process.env.OUTPUT_SCHEMA_PARSE_TIMEOUT = '30001';

      expect(() => require('../../../src/config/output-format.config')).toThrow(
        'parseTimeout deve estar entre 100ms e 30s',
      );
    });

    test('lança erro para cacheTtl inválido - valor zero', () => {
      process.env.OUTPUT_SCHEMA_CACHE_TTL = '0';

      expect(() => require('../../../src/config/output-format.config')).toThrow(
        'cacheTtl deve estar entre 1 e 1440 minutos',
      );
    });

    test('lança erro para cacheTtl inválido - valor muito alto', () => {
      process.env.OUTPUT_SCHEMA_CACHE_TTL = '1441';

      expect(() => require('../../../src/config/output-format.config')).toThrow(
        'cacheTtl deve estar entre 1 e 1440 minutos',
      );
    });
  });

  describe('outputFormatConfig', () => {
    test('usa valores default quando environment variables não estão definidas', () => {
      // Limpar todas as variáveis relevantes
      delete process.env.OUTPUT_SCHEMA_MAX_SIZE;
      delete process.env.OUTPUT_SCHEMA_MAX_DEPTH;
      delete process.env.OUTPUT_SCHEMA_DEFAULT_MODE;
      delete process.env.OUTPUT_SCHEMA_PARSE_TIMEOUT;
      delete process.env.OUTPUT_SCHEMA_ENABLE_CACHE;
      delete process.env.OUTPUT_SCHEMA_CACHE_TTL;
      delete process.env.OUTPUT_SCHEMA_DEBUG;

      const module = require('../../../src/config/output-format.config');
      const config = module.outputFormatConfig;

      expect(config.maxSchemaSize).toBe(10240);
      expect(config.maxDepth).toBe(5);
      expect(config.defaultMode).toBe('string');
      expect(config.parseTimeout).toBe(500);
      expect(config.enableCache).toBe(true);
      expect(config.cacheTtl).toBe(10);
      expect(config.enableDebugLogs).toBe(false);
    });

    test('usa valores de environment variables quando definidas', () => {
      process.env.OUTPUT_SCHEMA_MAX_SIZE = '5000';
      process.env.OUTPUT_SCHEMA_MAX_DEPTH = '10';
      process.env.OUTPUT_SCHEMA_DEFAULT_MODE = 'object';
      process.env.OUTPUT_SCHEMA_PARSE_TIMEOUT = '1000';
      process.env.OUTPUT_SCHEMA_ENABLE_CACHE = 'false';
      process.env.OUTPUT_SCHEMA_CACHE_TTL = '30';
      process.env.OUTPUT_SCHEMA_DEBUG = 'true';

      const module = require('../../../src/config/output-format.config');
      const config = module.outputFormatConfig;

      expect(config.maxSchemaSize).toBe(5000);
      expect(config.maxDepth).toBe(10);
      expect(config.defaultMode).toBe('object');
      expect(config.parseTimeout).toBe(1000);
      expect(config.enableCache).toBe(false);
      expect(config.cacheTtl).toBe(30);
      expect(config.enableDebugLogs).toBe(true);
    });

    test('enableDebugLogs é true quando isDevelopment é true', () => {
      delete process.env.OUTPUT_SCHEMA_DEBUG;

      // Mockar isDevelopment como true
      jest.doMock('../../../src/config/environment.js', () => ({
        isDevelopment: true,
      }));

      const module = require('../../../src/config/output-format.config');
      const config = module.outputFormatConfig;

      expect(config.enableDebugLogs).toBe(true);
    });

    test('trata valores inválidos de parseInt como NaN e usa default', () => {
      process.env.OUTPUT_SCHEMA_MAX_SIZE = 'invalid';
      process.env.OUTPUT_SCHEMA_MAX_DEPTH = 'abc';
      process.env.OUTPUT_SCHEMA_PARSE_TIMEOUT = 'xyz';
      process.env.OUTPUT_SCHEMA_CACHE_TTL = '!@#';

      const module = require('../../../src/config/output-format.config');
      const config = module.outputFormatConfig;

      // parseInt retorna NaN para valores inválidos
      expect(config.maxSchemaSize).toBeNaN();
      expect(config.maxDepth).toBeNaN();
      expect(config.parseTimeout).toBeNaN();
      expect(config.cacheTtl).toBeNaN();
    });

    test('outputFormatConfig é imutável (frozen)', () => {
      const module = require('../../../src/config/output-format.config');
      const config = module.outputFormatConfig;

      expect(Object.isFrozen(config)).toBe(true);
    });

    test('defaultMode usa valor vazio quando não é string nem object', () => {
      process.env.OUTPUT_SCHEMA_DEFAULT_MODE = '';

      const module = require('../../../src/config/output-format.config');
      const config = module.outputFormatConfig;

      // Quando string vazia, o || operator pega o valor default 'string'
      expect(config.defaultMode).toBe('string');
    });

    test('enableCache é true quando valor não é exatamente "false"', () => {
      process.env.OUTPUT_SCHEMA_ENABLE_CACHE = 'FALSE';

      const module = require('../../../src/config/output-format.config');
      const config = module.outputFormatConfig;

      expect(config.enableCache).toBe(true);
    });
  });

  describe('interface OutputFormatConfig', () => {
    test('pode ser implementada em objetos', () => {
      const config = {
        maxSchemaSize: 1024,
        maxDepth: 5,
        defaultMode: 'string' as const,
        parseTimeout: 500,
        enableCache: true,
        cacheTtl: 10,
        enableDebugLogs: false,
      };

      // Verifica que o objeto tem todas as propriedades esperadas
      expect(config).toHaveProperty('maxSchemaSize');
      expect(config).toHaveProperty('maxDepth');
      expect(config).toHaveProperty('defaultMode');
      expect(config).toHaveProperty('parseTimeout');
      expect(config).toHaveProperty('enableCache');
      expect(config).toHaveProperty('cacheTtl');
      expect(config).toHaveProperty('enableDebugLogs');
    });
  });

  test('módulo exporta interface e config', () => {
    const module = require('../../../src/config/output-format.config');

    // Verifica que as exports esperadas existem
    expect(module).toHaveProperty('outputFormatConfig');
    expect(typeof module.outputFormatConfig).toBe('object');
  });
});
