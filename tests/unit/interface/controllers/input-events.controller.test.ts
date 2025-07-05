// Mocks globais
jest.mock('tsyringe', () => ({
  injectable: () => (target: any) => target,
  inject: () => () => {},
}));

jest.mock('../../../../src/config/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock('../../../../src/config/input-events.config', () => ({
  inputEventsConfig: {
    heartbeatMs: 30000,
    bufferSize: 1000,
    maxRate: 1000,
    maxEventAge: 300000,
    debug: false,
  },
}));

// Mock de setInterval
const originalSetInterval = global.setInterval;
const originalClearInterval = global.clearInterval;

beforeEach(() => {
  global.setInterval = jest.fn((fn: any, ms?: number) => {
    return 123 as any;
  }) as any;
  global.clearInterval = jest.fn();
});

afterEach(() => {
  global.setInterval = originalSetInterval;
  global.clearInterval = originalClearInterval;
});

describe('InputEventsController', () => {
  let controller: any;
  let mockEventDispatcher: any;
  let mockEventBuffer: any;
  let mockReply: any;
  let mockRequest: any;

  beforeEach(() => {
    // Mock EventDispatcher
    mockEventDispatcher = {
      addListener: jest.fn(),
      removeListener: jest.fn(),
      getStats: jest.fn().mockReturnValue({
        listeners: 2,
        eventsProcessed: 100,
        errors: 0,
      }),
    };

    // Mock EventBuffer
    mockEventBuffer = {
      add: jest.fn(),
      getEventsAfter: jest.fn().mockReturnValue([
        { id: 'event1', source: 'mouse', type: 'click', timestamp: Date.now() },
        { id: 'event2', source: 'keyboard', type: 'keypress', timestamp: Date.now() },
      ]),
      getSize: jest.fn().mockReturnValue(42),
      getLastEventId: jest.fn().mockReturnValue('last-event-123'),
      clear: jest.fn(),
      pruneOldEvents: jest.fn().mockReturnValue(5),
    };

    // Mock Reply
    mockReply = {
      raw: {
        writeHead: jest.fn(),
        write: jest.fn(),
        on: jest.fn(),
      },
      send: jest.fn(),
    };

    // Mock Request
    mockRequest = {
      id: 'request-123',
      headers: {},
      body: {},
      raw: {
        on: jest.fn(),
      },
    };

    const {
      InputEventsController,
    } = require('../../../../src/interface/controllers/input-events.controller');
    controller = new InputEventsController(mockEventDispatcher, mockEventBuffer);
  });

  describe('streamInputEvents', () => {
    test('configura headers SSE corretamente', async () => {
      await controller.streamInputEvents(mockRequest, mockReply);

      expect(mockReply.raw.writeHead).toHaveBeenCalledWith(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
      });
    });

    test('processa Last-Event-ID quando presente', async () => {
      mockRequest.headers['last-event-id'] = 'last-123';

      await controller.streamInputEvents(mockRequest, mockReply);

      expect(mockEventBuffer.getEventsAfter).toHaveBeenCalledWith('last-123');
      expect(mockReply.raw.write).toHaveBeenCalledTimes(3); // 2 eventos + conexão inicial
    });

    test('registra listener no event dispatcher', async () => {
      await controller.streamInputEvents(mockRequest, mockReply);

      expect(mockEventDispatcher.addListener).toHaveBeenCalled();
      const listener = mockEventDispatcher.addListener.mock.calls[0][0];
      expect(listener).toHaveProperty('onEvent');
    });

    test('configura heartbeat interval', async () => {
      await controller.streamInputEvents(mockRequest, mockReply);

      expect(global.setInterval).toHaveBeenCalledWith(expect.any(Function), 30000);
    });

    test('limpa recursos ao fechar conexão', async () => {
      await controller.streamInputEvents(mockRequest, mockReply);

      const closeHandler = mockRequest.raw.on.mock.calls[0][1];
      closeHandler();

      expect(global.clearInterval).toHaveBeenCalledWith(123);
      expect(mockEventDispatcher.removeListener).toHaveBeenCalled();
    });

    test('processa eventos recebidos pelo listener', async () => {
      await controller.streamInputEvents(mockRequest, mockReply);

      const listener = mockEventDispatcher.addListener.mock.calls[0][0];
      const testEvent = {
        id: 'test-event',
        source: 'mouse',
        type: 'click',
        timestamp: Date.now(),
      };

      listener.onEvent(testEvent);

      expect(mockReply.raw.write).toHaveBeenCalledWith(expect.stringContaining('id: test-event'));
      expect(mockEventBuffer.add).toHaveBeenCalledWith(testEvent);
    });

    test('trata erro no heartbeat', async () => {
      mockReply.raw.write
        .mockImplementationOnce(() => {})
        .mockImplementationOnce(() => {
          throw new Error('Connection closed');
        });

      await controller.streamInputEvents(mockRequest, mockReply);

      const heartbeatFn = (global.setInterval as jest.Mock).mock.calls[0][0];
      heartbeatFn();

      expect(global.clearInterval).toHaveBeenCalledWith(123);
    });

    test('modo debug envia logs extras', async () => {
      const { inputEventsConfig } = require('../../../../src/config/input-events.config');
      inputEventsConfig.debug = true;

      await controller.streamInputEvents(mockRequest, mockReply);

      const listener = mockEventDispatcher.addListener.mock.calls[0][0];
      listener.onEvent({ id: 'debug-event', source: 'test' });

      const { logger } = require('../../../../src/config/logger');
      expect(logger.debug).toHaveBeenCalled();

      inputEventsConfig.debug = false;
    });

    test('trata erro ao enviar evento SSE', async () => {
      mockReply.raw.write
        .mockImplementationOnce(() => {})
        .mockImplementationOnce(() => {
          throw new Error('Failed to write');
        });

      await controller.streamInputEvents(mockRequest, mockReply);

      const listener = mockEventDispatcher.addListener.mock.calls[0][0];
      listener.onEvent({ id: 'error-event' });

      const { logger } = require('../../../../src/config/logger');
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('Erro ao enviar evento SSE'),
      );
    });
  });

  describe('getStats', () => {
    test('retorna estatísticas do sistema', async () => {
      await controller.getStats(mockRequest, mockReply);

      expect(mockEventDispatcher.getStats).toHaveBeenCalled();
      expect(mockEventBuffer.getSize).toHaveBeenCalled();
      expect(mockEventBuffer.getLastEventId).toHaveBeenCalled();

      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        data: {
          dispatcher: {
            listeners: 2,
            eventsProcessed: 100,
            errors: 0,
          },
          buffer: {
            size: 42,
            maxSize: 1000,
            lastEventId: 'last-event-123',
          },
          config: {
            heartbeatMs: 30000,
            maxRate: 1000,
            maxEventAge: 300000,
          },
        },
      });
    });
  });

  describe('clearBuffer', () => {
    test('limpa o buffer e retorna sucesso', async () => {
      await controller.clearBuffer(mockRequest, mockReply);

      expect(mockEventBuffer.clear).toHaveBeenCalled();
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        message: 'Buffer limpo com sucesso',
      });
    });
  });

  describe('pruneBuffer', () => {
    test('remove eventos antigos com maxAgeMs padrão', async () => {
      await controller.pruneBuffer(mockRequest, mockReply);

      expect(mockEventBuffer.pruneOldEvents).toHaveBeenCalledWith(300000);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        data: {
          removed: 5,
          maxAgeMs: 300000,
        },
      });
    });

    test('remove eventos antigos com maxAgeMs customizado', async () => {
      mockRequest.body = { maxAgeMs: 60000 };

      await controller.pruneBuffer(mockRequest, mockReply);

      expect(mockEventBuffer.pruneOldEvents).toHaveBeenCalledWith(60000);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        data: {
          removed: 5,
          maxAgeMs: 60000,
        },
      });
    });
  });
});
