// Mock dotenv antes de qualquer require
jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

// Mock console.error e process.exit
const originalConsoleError = console.error;
const originalProcessExit = process.exit;

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
  console.error = jest.fn();
  process.exit = jest.fn() as any;
  // Salvar process.env original
  process.env = { ...process.env };
});

afterEach(() => {
  console.error = originalConsoleError;
  process.exit = originalProcessExit;
  jest.clearAllMocks();
});

describe('input-events.config', () => {
  describe('inputEventsConfig', () => {
    test('usa valores padrão quando variáveis de ambiente não estão definidas', () => {
      delete process.env.INPUT_EVENT_BUFFER;
      delete process.env.INPUT_EVENT_HEARTBEAT;
      delete process.env.INPUT_EVENT_RATE;
      delete process.env.INPUT_EVENT_MAX_AGE;
      delete process.env.INPUT_EVENT_DEBUG;

      const config = require('../../../src/config/input-events.config');

      expect(config.inputEventsConfig).toEqual({
        bufferSize: 1000,
        heartbeatMs: 30000,
        maxRate: 5000,
        maxEventAge: 300000,
        debug: false,
      });
    });

    test('usa valores das variáveis de ambiente quando definidas', () => {
      process.env.INPUT_EVENT_BUFFER = '500';
      process.env.INPUT_EVENT_HEARTBEAT = '15000';
      process.env.INPUT_EVENT_RATE = '1000';
      process.env.INPUT_EVENT_MAX_AGE = '60000';
      process.env.INPUT_EVENT_DEBUG = 'true';

      const config = require('../../../src/config/input-events.config');

      expect(config.inputEventsConfig).toEqual({
        bufferSize: 500,
        heartbeatMs: 15000,
        maxRate: 1000,
        maxEventAge: 60000,
        debug: true,
      });
    });

    test('trata valores inválidos com parseInt retornando NaN', () => {
      process.env.INPUT_EVENT_BUFFER = 'invalid';
      process.env.INPUT_EVENT_HEARTBEAT = 'abc';
      process.env.INPUT_EVENT_RATE = '!@#';
      process.env.INPUT_EVENT_MAX_AGE = 'xyz';

      const config = require('../../../src/config/input-events.config');

      expect(config.inputEventsConfig.bufferSize).toBeNaN();
      expect(config.inputEventsConfig.heartbeatMs).toBeNaN();
      expect(config.inputEventsConfig.maxRate).toBeNaN();
      expect(config.inputEventsConfig.maxEventAge).toBeNaN();
    });

    test('debug é false quando INPUT_EVENT_DEBUG não é "true"', () => {
      process.env.INPUT_EVENT_DEBUG = 'false';
      const config1 = require('../../../src/config/input-events.config');
      expect(config1.inputEventsConfig.debug).toBe(false);

      jest.resetModules();
      process.env.INPUT_EVENT_DEBUG = 'TRUE';
      const config2 = require('../../../src/config/input-events.config');
      expect(config2.inputEventsConfig.debug).toBe(false);

      jest.resetModules();
      process.env.INPUT_EVENT_DEBUG = '1';
      const config3 = require('../../../src/config/input-events.config');
      expect(config3.inputEventsConfig.debug).toBe(false);
    });
  });

  describe('validateInputEventsConfig', () => {
    test('valida configuração válida sem lançar erro', () => {
      process.env.INPUT_EVENT_BUFFER = '1000';
      process.env.INPUT_EVENT_HEARTBEAT = '30000';
      process.env.INPUT_EVENT_RATE = '5000';
      process.env.INPUT_EVENT_MAX_AGE = '300000';

      const { validateInputEventsConfig } = require('../../../src/config/input-events.config');

      expect(() => validateInputEventsConfig()).not.toThrow();
    });

    test('lança erro quando bufferSize está fora do intervalo', () => {
      const { validateInputEventsConfig } = require('../../../src/config/input-events.config');

      // Teste com valor menor que 1
      process.env.INPUT_EVENT_BUFFER = '0';
      jest.resetModules();
      const config1 = require('../../../src/config/input-events.config');
      expect(() => config1.validateInputEventsConfig()).toThrow(
        'INPUT_EVENT_BUFFER deve estar entre 1 e 100000',
      );

      // Teste com valor maior que 100000
      process.env.INPUT_EVENT_BUFFER = '100001';
      jest.resetModules();
      const config2 = require('../../../src/config/input-events.config');
      expect(() => config2.validateInputEventsConfig()).toThrow(
        'INPUT_EVENT_BUFFER deve estar entre 1 e 100000',
      );
    });

    test('lança erro quando heartbeatMs está fora do intervalo', () => {
      process.env.INPUT_EVENT_BUFFER = '1000';

      // Teste com valor menor que 1000
      process.env.INPUT_EVENT_HEARTBEAT = '999';
      jest.resetModules();
      const config1 = require('../../../src/config/input-events.config');
      expect(() => config1.validateInputEventsConfig()).toThrow(
        'INPUT_EVENT_HEARTBEAT deve estar entre 1000 e 300000 ms',
      );

      // Teste com valor maior que 300000
      process.env.INPUT_EVENT_HEARTBEAT = '300001';
      jest.resetModules();
      const config2 = require('../../../src/config/input-events.config');
      expect(() => config2.validateInputEventsConfig()).toThrow(
        'INPUT_EVENT_HEARTBEAT deve estar entre 1000 e 300000 ms',
      );
    });

    test('lança erro quando maxRate está fora do intervalo', () => {
      process.env.INPUT_EVENT_BUFFER = '1000';
      process.env.INPUT_EVENT_HEARTBEAT = '30000';

      // Teste com valor menor que 1
      process.env.INPUT_EVENT_RATE = '0';
      jest.resetModules();
      const config1 = require('../../../src/config/input-events.config');
      expect(() => config1.validateInputEventsConfig()).toThrow(
        'INPUT_EVENT_RATE deve estar entre 1 e 50000 eventos/s',
      );

      // Teste com valor maior que 50000
      process.env.INPUT_EVENT_RATE = '50001';
      jest.resetModules();
      const config2 = require('../../../src/config/input-events.config');
      expect(() => config2.validateInputEventsConfig()).toThrow(
        'INPUT_EVENT_RATE deve estar entre 1 e 50000 eventos/s',
      );
    });

    test('lança erro quando maxEventAge está fora do intervalo', () => {
      process.env.INPUT_EVENT_BUFFER = '1000';
      process.env.INPUT_EVENT_HEARTBEAT = '30000';
      process.env.INPUT_EVENT_RATE = '5000';

      // Teste com valor menor que 1000
      process.env.INPUT_EVENT_MAX_AGE = '999';
      jest.resetModules();
      const config1 = require('../../../src/config/input-events.config');
      expect(() => config1.validateInputEventsConfig()).toThrow(
        'INPUT_EVENT_MAX_AGE deve estar entre 1000 e 3600000 ms',
      );

      // Teste com valor maior que 3600000
      process.env.INPUT_EVENT_MAX_AGE = '3600001';
      jest.resetModules();
      const config2 = require('../../../src/config/input-events.config');
      expect(() => config2.validateInputEventsConfig()).toThrow(
        'INPUT_EVENT_MAX_AGE deve estar entre 1000 e 3600000 ms',
      );
    });
  });

  describe('validação automática ao carregar módulo', () => {
    test('chama validateInputEventsConfig ao carregar o módulo', () => {
      process.env.INPUT_EVENT_BUFFER = '1000';
      process.env.INPUT_EVENT_HEARTBEAT = '30000';
      process.env.INPUT_EVENT_RATE = '5000';
      process.env.INPUT_EVENT_MAX_AGE = '300000';

      require('../../../src/config/input-events.config');

      expect(console.error).not.toHaveBeenCalled();
      expect(process.exit).not.toHaveBeenCalled();
    });

    test('chama console.error e process.exit quando validação falha', () => {
      process.env.INPUT_EVENT_BUFFER = '0'; // Valor inválido

      require('../../../src/config/input-events.config');

      expect(console.error).toHaveBeenCalledWith(
        'Erro na configuração de eventos de input:',
        expect.any(Error),
      );
      expect(process.exit).toHaveBeenCalledWith(1);
    });

    test('aceita valores NaN nas comparações sem falhar', () => {
      // Garantir que os mocks estão limpos
      console.error = jest.fn();
      process.exit = jest.fn() as any;

      process.env.INPUT_EVENT_BUFFER = 'invalid';
      process.env.INPUT_EVENT_HEARTBEAT = 'abc';
      process.env.INPUT_EVENT_RATE = 'xyz';
      process.env.INPUT_EVENT_MAX_AGE = '!@#';

      // Forçar recarregamento do módulo
      jest.resetModules();

      require('../../../src/config/input-events.config');

      // Como NaN não satisfaz nenhuma condição de validação,
      // o código não lança erro e portanto não chama console.error
      expect(console.error).not.toHaveBeenCalled();
      expect(process.exit).not.toHaveBeenCalled();
    });
  });

  describe('interface InputEventsConfig', () => {
    test('exporta interface corretamente', () => {
      const config = require('../../../src/config/input-events.config');

      // Verificar que as exports existem
      expect(config.inputEventsConfig).toBeDefined();
      expect(config.validateInputEventsConfig).toBeDefined();
      expect(typeof config.validateInputEventsConfig).toBe('function');
    });

    test('inputEventsConfig é readonly/frozen', () => {
      process.env.INPUT_EVENT_BUFFER = '1000';
      const config = require('../../../src/config/input-events.config');

      expect(Object.isFrozen(config.inputEventsConfig)).toBe(true);

      // Tentar modificar não deve funcionar
      expect(() => {
        (config.inputEventsConfig as any).bufferSize = 2000;
      }).toThrow();
    });
  });

  describe('edge cases', () => {
    test('valores limites válidos', () => {
      // Testar valores mínimos válidos
      process.env.INPUT_EVENT_BUFFER = '1';
      process.env.INPUT_EVENT_HEARTBEAT = '1000';
      process.env.INPUT_EVENT_RATE = '1';
      process.env.INPUT_EVENT_MAX_AGE = '1000';

      jest.resetModules();
      const config1 = require('../../../src/config/input-events.config');
      expect(() => config1.validateInputEventsConfig()).not.toThrow();

      // Testar valores máximos válidos
      process.env.INPUT_EVENT_BUFFER = '100000';
      process.env.INPUT_EVENT_HEARTBEAT = '300000';
      process.env.INPUT_EVENT_RATE = '50000';
      process.env.INPUT_EVENT_MAX_AGE = '3600000';

      jest.resetModules();
      const config2 = require('../../../src/config/input-events.config');
      expect(() => config2.validateInputEventsConfig()).not.toThrow();
    });

    test('base decimal no parseInt', () => {
      process.env.INPUT_EVENT_BUFFER = '0x10'; // Hexadecimal
      process.env.INPUT_EVENT_HEARTBEAT = '010'; // Octal

      const config = require('../../../src/config/input-events.config');

      // parseInt com base 10 deve converter corretamente
      expect(config.inputEventsConfig.bufferSize).toBe(0); // '0x10' com base 10 = 0
      expect(config.inputEventsConfig.heartbeatMs).toBe(10); // '010' com base 10 = 10
    });
  });
});
