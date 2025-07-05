/**
 * Configuração global para os testes
 */
import 'reflect-metadata';

// Configurar variáveis de ambiente para testes
process.env.NODE_ENV = 'test';
process.env.API_KEY = 'test-api-key';
process.env.MOUSE_MIN_DUR = '100';
process.env.MOUSE_MAX_DUR = '5000';
process.env.MOUSE_SAMPLE_RATE = '30';
process.env.MOUSE_STREAM_INTERVAL = '100';

// Mock global do pino logger para evitar logs durante testes
jest.mock('pino', () => {
  return jest.fn(() => ({
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
    fatal: jest.fn(),
    trace: jest.fn(),
    child: jest.fn(() => ({
      info: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
      warn: jest.fn(),
      fatal: jest.fn(),
      trace: jest.fn(),
    })),
  }));
});

// Mock do clipboardy para evitar problemas com ESM
jest.mock('clipboardy', () => ({
  write: jest.fn(),
  read: jest.fn(),
  writeSync: jest.fn(),
  readSync: jest.fn(),
}));

// Mock do nanoid para evitar problemas com ESM
jest.mock('nanoid', () => ({
  nanoid: jest.fn(() => 'test-id-123'),
}));

// Configuração global do Jest
beforeAll(() => {
  // Configurações globais antes de todos os testes
});

afterAll(() => {
  // Limpeza global após todos os testes
});

// Timeout global para testes assíncronos
jest.setTimeout(10000);