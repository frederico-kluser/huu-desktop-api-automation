// Mock pino antes de qualquer import
jest.mock('pino', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    fatal: jest.fn(),
    trace: jest.fn(),
    child: jest.fn(() => ({
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    })),
  })),
}));

// Mock environment antes do import do logger
jest.mock('../../../src/config/environment.js', () => ({
  environment: {
    logLevel: 'info',
    nodeEnv: 'test',
  },
}));

describe('logger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  test('creates logger with default configuration', () => {
    const pino = require('pino');
    const { logger } = require('../../../src/config/logger');

    expect(pino.default).toHaveBeenCalledWith({
      level: 'info',
      transport: undefined,
    });

    expect(logger).toBeDefined();
    expect(logger.info).toBeDefined();
    expect(logger.error).toBeDefined();
  });

  test('creates logger with development transport', () => {
    // Modificar o mock de environment para development
    jest.doMock('../../../src/config/environment.js', () => ({
      environment: {
        logLevel: 'debug',
        nodeEnv: 'development',
      },
    }));

    const pino = require('pino');
    const { logger } = require('../../../src/config/logger');

    expect(pino.default).toHaveBeenCalledWith({
      level: 'debug',
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'yyyy-mm-dd HH:MM:ss',
          ignore: 'pid,hostname',
        },
      },
    });
  });

  test('creates logger when logLevel is undefined', () => {
    // Modificar o mock de environment sem logLevel
    jest.doMock('../../../src/config/environment.js', () => ({
      environment: {
        nodeEnv: 'production',
      },
    }));

    const pino = require('pino');
    const { logger } = require('../../../src/config/logger');

    expect(pino.default).toHaveBeenCalledWith({
      level: 'info',
      transport: undefined,
    });
  });

  test('creates logger in production without transport', () => {
    jest.doMock('../../../src/config/environment.js', () => ({
      environment: {
        logLevel: 'warn',
        nodeEnv: 'production',
      },
    }));

    const pino = require('pino');
    const { logger } = require('../../../src/config/logger');

    expect(pino.default).toHaveBeenCalledWith({
      level: 'warn',
      transport: undefined,
    });
  });
});
