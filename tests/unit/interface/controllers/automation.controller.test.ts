// Mock de dependências externas
jest.mock('tsyringe', () => ({
  container: {
    resolve: jest.fn((token) => {
      if (token === 'MouseService') {
        return {
          move: jest.fn().mockResolvedValue(undefined),
          click: jest.fn().mockResolvedValue(undefined),
          drag: jest.fn().mockResolvedValue(undefined),
          scroll: jest.fn().mockResolvedValue(undefined),
          getPosition: jest.fn().mockResolvedValue({ x: 100, y: 200 }),
        };
      }
      if (token === 'ScreenService') {
        return {
          findTemplate: jest
            .fn()
            .mockResolvedValue([{ x: 10, y: 20, width: 30, height: 40, confidence: 0.95 }]),
          capture: jest.fn().mockResolvedValue('base64imagedata'),
        };
      }
      return {};
    }),
  },
}));

jest.mock('pino', () => {
  return jest.fn(() => ({
    info: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
  }));
});

const mockClearInterval = jest.fn();
const mockSetInterval = jest.fn(() => 123) as any;
global.clearInterval = mockClearInterval as any;
global.setInterval = mockSetInterval as any;

// Usar require para evitar problemas com verbatimModuleSyntax
const {
  AutomationController,
} = require('../../../../src/interface/controllers/automation.controller');

describe('AutomationController', () => {
  let controller: any;
  let mockFastifyInstance: any;
  let mockRequest: any;
  let mockReply: any;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new AutomationController();

    // Mock Fastify Instance
    mockFastifyInstance = {
      post: jest.fn(),
      get: jest.fn(),
    };

    // Mock Request
    mockRequest = {
      body: {},
      raw: {
        on: jest.fn(),
      },
    };

    // Mock Reply
    mockReply = {
      send: jest.fn().mockResolvedValue(undefined),
      raw: {
        writeHead: jest.fn(),
        write: jest.fn(),
        end: jest.fn(),
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    test('initializes with services from container', () => {
      const newController = new AutomationController();
      expect(newController).toBeDefined();
      expect(newController.mouseService).toBeDefined();
      expect(newController.screenService).toBeDefined();
    });
  });

  describe('registerRoutes', () => {
    test('registers all routes', () => {
      controller.registerRoutes(mockFastifyInstance);

      // Verificar que todas as rotas foram registradas
      expect(mockFastifyInstance.post).toHaveBeenCalledTimes(6);
      expect(mockFastifyInstance.get).toHaveBeenCalledTimes(3);

      // Verificar rotas específicas
      const postCalls = mockFastifyInstance.post.mock.calls;
      const getCalls = mockFastifyInstance.get.mock.calls;

      expect(postCalls[0][0]).toBe('/mouse/move');
      expect(postCalls[1][0]).toBe('/mouse/click');
      expect(postCalls[2][0]).toBe('/mouse/drag');
      expect(postCalls[3][0]).toBe('/mouse/scroll');
      expect(postCalls[4][0]).toBe('/screen/find');
      expect(postCalls[5][0]).toBe('/screen/capture');

      expect(getCalls[0][0]).toBe('/mouse/position');
      expect(getCalls[1][0]).toBe('/mouse/position/stream');
      expect(getCalls[2][0]).toBe('/screen/print');
    });
  });

  describe('mouse endpoints', () => {
    test('mouseMove calls service and returns success', async () => {
      mockRequest.body = { x: 100, y: 200, duration: 1000 };
      await controller.mouseMove(mockRequest, mockReply);

      expect(controller.mouseService.move).toHaveBeenCalledWith(mockRequest.body);
      expect(mockReply.send).toHaveBeenCalledWith({ success: true });
    });

    test('mouseClick calls service and returns success', async () => {
      mockRequest.body = { button: 'left' };
      await controller.mouseClick(mockRequest, mockReply);

      expect(controller.mouseService.click).toHaveBeenCalledWith(mockRequest.body);
      expect(mockReply.send).toHaveBeenCalledWith({ success: true });
    });

    test('mouseDrag calls service and returns success', async () => {
      mockRequest.body = { fromX: 0, fromY: 0, toX: 100, toY: 100 };
      await controller.mouseDrag(mockRequest, mockReply);

      expect(controller.mouseService.drag).toHaveBeenCalledWith(mockRequest.body);
      expect(mockReply.send).toHaveBeenCalledWith({ success: true });
    });

    test('mouseScroll calls service and returns success', async () => {
      mockRequest.body = { amount: 5, direction: 'down' };
      await controller.mouseScroll(mockRequest, mockReply);

      expect(controller.mouseService.scroll).toHaveBeenCalledWith(mockRequest.body);
      expect(mockReply.send).toHaveBeenCalledWith({ success: true });
    });

    test('mousePosition returns current position', async () => {
      await controller.mousePosition(mockRequest, mockReply);

      expect(controller.mouseService.getPosition).toHaveBeenCalled();
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        data: { x: 100, y: 200 },
      });
    });
  });

  describe('screen endpoints', () => {
    test('screenFind calls service and returns matches', async () => {
      mockRequest.body = { template: 'base64template', threshold: 0.9 };
      await controller.screenFind(mockRequest, mockReply);

      expect(controller.screenService.findTemplate).toHaveBeenCalledWith(mockRequest.body);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        data: {
          matches: [{ x: 10, y: 20, width: 30, height: 40, confidence: 0.95 }],
        },
      });
    });

    test('screenCapture calls service and returns image', async () => {
      mockRequest.body = { x: 0, y: 0, width: 1920, height: 1080 };
      await controller.screenCapture(mockRequest, mockReply);

      expect(controller.screenService.capture).toHaveBeenCalledWith(mockRequest.body);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        data: { image: 'base64imagedata' },
      });
    });
  });

  describe('mousePositionStream', () => {
    test('sets up SSE headers and starts streaming', async () => {
      const onCloseFn = jest.fn();
      const onErrorFn = jest.fn();

      mockRequest.raw.on.mockImplementation((event: string, callback: Function) => {
        if (event === 'close') onCloseFn.mockImplementation(callback as any);
        if (event === 'error') onErrorFn.mockImplementation(callback as any);
      });

      await controller.mousePositionStream(mockRequest, mockReply);

      // Verificar headers SSE
      expect(mockReply.raw.writeHead).toHaveBeenCalledWith(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Content-Security-Policy': "default-src 'none'",
        'X-Content-Type-Options': 'nosniff',
      });

      // Verificar que setInterval foi chamado
      expect(mockSetInterval).toHaveBeenCalled();

      // Verificar que a primeira posição foi enviada
      expect(controller.mouseService.getPosition).toHaveBeenCalled();
      expect(mockReply.raw.write).toHaveBeenCalled();
    });

    test('handles connection close event', async () => {
      let closeHandler: Function = () => {};
      mockRequest.raw.on.mockImplementation((event: string, callback: Function) => {
        if (event === 'close') closeHandler = callback;
      });

      await controller.mousePositionStream(mockRequest, mockReply);

      // Simular fechamento da conexão
      closeHandler();

      expect(mockClearInterval).toHaveBeenCalledWith(123);
    });

    test('handles connection error event', async () => {
      let errorHandler: Function = () => {};
      mockRequest.raw.on.mockImplementation((event: string, callback: Function) => {
        if (event === 'error') errorHandler = callback;
      });

      await controller.mousePositionStream(mockRequest, mockReply);

      // Simular erro na conexão
      const error = new Error('Connection error');
      errorHandler(error);

      expect(mockClearInterval).toHaveBeenCalledWith(123);
    });

    test('handles error in sendMousePosition', async () => {
      // Fazer getPosition lançar erro
      controller.mouseService.getPosition.mockRejectedValueOnce(new Error('Position error'));

      await controller.mousePositionStream(mockRequest, mockReply);

      // Executar o callback do setInterval
      if (mockSetInterval.mock.calls.length > 0) {
        const intervalCallback = mockSetInterval.mock.calls[0][0];
        await intervalCallback();
      }

      expect(mockClearInterval).toHaveBeenCalledWith(123);
      expect(mockReply.raw.end).toHaveBeenCalled();
    });

    test('logs debug message every 10 positions', async () => {
      await controller.mousePositionStream(mockRequest, mockReply);

      // Executar o callback do setInterval 10 vezes
      if (mockSetInterval.mock.calls.length > 0) {
        const intervalCallback = mockSetInterval.mock.calls[0][0];
        for (let i = 0; i < 10; i++) {
          await intervalCallback();
        }
      }

      // Logger deve ter sido chamado para debug
      expect(controller.logger.debug).toHaveBeenCalled();
    });
  });
});
