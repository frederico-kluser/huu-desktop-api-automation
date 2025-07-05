// Mocks globais
global.setInterval = jest.fn((fn: any, ms?: number) => {
  return 123 as any;
}) as any;
global.clearInterval = jest.fn() as any;

// Mocks dos módulos
jest.mock('../../../../src/application/services/recorder-listener.service.js');
jest.mock('../../../../src/application/services/event-buffer.service.js');
jest.mock('../../../../src/config/logger.js', () => ({
  logger: {
    info: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
  },
}));
jest.mock('../../../../src/config/recorder.config.js', () => ({
  recorderConfig: {
    includeScreenshot: true,
    moveIntervalMs: 100,
  },
}));

const {
  RecorderController,
} = require('../../../../src/interface/controllers/recorder.controller.js');
const {
  RecorderListenerService,
} = require('../../../../src/application/services/recorder-listener.service.js');
const { EventBuffer } = require('../../../../src/application/services/event-buffer.service.js');

describe('RecorderController', () => {
  let controller: any;
  let mockRecorderListener: any;
  let mockEventBuffer: any;
  let mockRequest: any;
  let mockReply: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup mock services
    mockRecorderListener = {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };

    mockEventBuffer = {};

    // Setup Fastify mocks
    mockRequest = {
      headers: {},
      raw: {
        on: jest.fn(),
      },
    };

    mockReply = {
      raw: {
        writeHead: jest.fn(),
        write: jest.fn(),
      },
      send: jest.fn(),
    };

    // Mock constructor injection
    RecorderListenerService.mockImplementation(() => mockRecorderListener);
    EventBuffer.mockImplementation(() => mockEventBuffer);

    controller = new RecorderController(mockRecorderListener, mockEventBuffer);
  });

  describe('streamEvents', () => {
    test('should setup SSE connection with proper headers', async () => {
      await controller.streamEvents(mockRequest, mockReply);

      expect(mockReply.raw.writeHead).toHaveBeenCalledWith(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
      });
    });

    test('should send initial connected event', async () => {
      await controller.streamEvents(mockRequest, mockReply);

      expect(mockReply.raw.write).toHaveBeenCalledWith(expect.stringContaining('event: connected'));
      expect(mockReply.raw.write).toHaveBeenCalledWith(
        expect.stringContaining('"includeScreenshot":true'),
      );
    });

    test('should handle last-event-id for replay', async () => {
      mockRequest.headers['last-event-id'] = 'test-123';

      await controller.streamEvents(mockRequest, mockReply);

      expect(mockReply.raw.write).toHaveBeenCalled();
    });

    test('should register event listener', async () => {
      await controller.streamEvents(mockRequest, mockReply);

      expect(mockRecorderListener.addListener).toHaveBeenCalledWith(expect.any(Function));
    });

    test('should setup heartbeat interval', async () => {
      await controller.streamEvents(mockRequest, mockReply);

      expect(global.setInterval).toHaveBeenCalledWith(expect.any(Function), 30000);
    });

    test('should handle heartbeat errors', async () => {
      await controller.streamEvents(mockRequest, mockReply);

      // Mock write to throw error on heartbeat
      mockReply.raw.write.mockImplementationOnce(() => {
        throw new Error('Connection closed');
      });

      // Execute heartbeat callback
      const heartbeatFn = (global.setInterval as jest.Mock).mock.calls[0][0];
      heartbeatFn();

      expect(global.clearInterval).toHaveBeenCalledWith(123);
    });

    test('should handle close event', async () => {
      let closeCallback: any;
      mockRequest.raw.on.mockImplementation((event: string, cb: any) => {
        if (event === 'close') closeCallback = cb;
      });

      await controller.streamEvents(mockRequest, mockReply);

      // Trigger close
      closeCallback();

      expect(global.clearInterval).toHaveBeenCalledWith(123);
      expect(mockRecorderListener.removeListener).toHaveBeenCalled();
    });

    test('should handle event listener callback', async () => {
      await controller.streamEvents(mockRequest, mockReply);

      // Get the listener that was registered
      const listener = mockRecorderListener.addListener.mock.calls[0][0];

      // Test successful event
      const event = { id: 'evt-123', type: 'mouseMove', data: { x: 100, y: 200 } };
      listener(event);

      expect(mockReply.raw.write).toHaveBeenCalledWith('id: evt-123\n');
      expect(mockReply.raw.write).toHaveBeenCalledWith('event: recorded\n');

      // Test error handling
      mockReply.raw.write.mockImplementationOnce(() => {
        throw new Error('Write failed');
      });
      listener(event);

      // Should not throw
    });
  });

  describe('getStats', () => {
    test('should return recorder statistics', async () => {
      await controller.getStats(mockRequest, mockReply);

      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        data: expect.objectContaining({
          activeConnections: 0,
          config: expect.objectContaining({
            includeScreenshot: true,
            moveIntervalMs: 100,
          }),
          timestamp: expect.any(Number),
        }),
      });
    });

    test('should track active connections count', async () => {
      // Add a connection
      await controller.streamEvents(mockRequest, mockReply);

      // Check stats
      const mockReply2 = { send: jest.fn() };
      await controller.getStats(mockRequest, mockReply2);

      const statsData = mockReply2.send.mock.calls[0][0].data;
      expect(statsData.activeConnections).toBe(1);
    });
  });

  describe('generateConnectionId', () => {
    test('should generate unique connection IDs', () => {
      // Access private method through prototype
      const id1 = controller.generateConnectionId();
      const id2 = controller.generateConnectionId();

      expect(id1).toMatch(/^rec_\d+_[a-z0-9]{7}$/);
      expect(id2).toMatch(/^rec_\d+_[a-z0-9]{7}$/);
      expect(id1).not.toBe(id2);
    });
  });

  describe('replayEvents', () => {
    test('should handle replay without errors', async () => {
      // Access private method through prototype
      const replayPromise = controller.replayEvents(mockReply, 'test-123');

      await expect(replayPromise).resolves.not.toThrow();
    });
  });

  describe('edge cases', () => {
    test('should handle multiple connections', async () => {
      const mockReply2 = {
        raw: {
          writeHead: jest.fn(),
          write: jest.fn(),
        },
        send: jest.fn(),
      };
      const mockRequest2 = {
        headers: {},
        raw: { on: jest.fn() },
      };

      await controller.streamEvents(mockRequest, mockReply);
      await controller.streamEvents(mockRequest2, mockReply2);

      // Check stats
      const mockReply3 = { send: jest.fn() };
      await controller.getStats(mockRequest, mockReply3);

      const statsData = mockReply3.send.mock.calls[0][0].data;
      expect(statsData.activeConnections).toBe(2);
    });

    test('should cleanup connection on close even if not in map', async () => {
      let closeCallback: any;
      mockRequest.raw.on.mockImplementation((event: string, cb: any) => {
        if (event === 'close') closeCallback = cb;
      });

      await controller.streamEvents(mockRequest, mockReply);

      // Clear connections manually
      controller.activeConnections.clear();

      // Should not throw
      expect(() => closeCallback()).not.toThrow();
    });
  });
});
