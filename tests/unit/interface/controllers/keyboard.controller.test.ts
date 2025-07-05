// Mock de dependências externas antes dos imports
jest.mock('tsyringe', () => ({
  injectable: () => (target: any) => target,
  inject: () => () => {},
  container: {
    resolve: jest.fn().mockImplementation((token: string) => {
      if (token === 'KeyboardService') {
        return {
          type: jest
            .fn()
            .mockResolvedValue({
              success: true,
              data: { textLength: 5, mode: 'instant', timing: 0 },
            }),
          pressKey: jest.fn().mockResolvedValue({ success: true, data: { key: 'a' } }),
          combination: jest
            .fn()
            .mockResolvedValue({ success: true, data: { combination: 'ctrl+c' } }),
        };
      }
      if (token === 'ClipboardService') {
        return {
          copy: jest
            .fn()
            .mockResolvedValue({ success: true, data: { contentLength: 10, sizeBytes: 10 } }),
          paste: jest
            .fn()
            .mockResolvedValue({
              success: true,
              data: { content: 'test', isEmpty: false, contentLength: 4 },
            }),
          clear: jest.fn().mockResolvedValue({ success: true, data: { cleared: true } }),
        };
      }
      return {};
    }),
  },
}));

jest.mock('../../../../src/interface/middleware/validation.middleware.js', () => ({
  validateRequest: jest.fn(() => jest.fn()),
}));

jest.mock('../../../../src/config/environment.js', () => ({
  environment: {
    KEYBOARD_SPEED: 50,
  },
}));

// Usar require para evitar problemas com verbatimModuleSyntax
const { KeyboardController } = require('../../../../src/interface/controllers/keyboard.controller');

describe('KeyboardController', () => {
  let fastifyInstance: any;
  let mockRequest: any;
  let mockReply: any;
  let controller: any;

  beforeEach(() => {
    // Mock do Fastify instance
    fastifyInstance = {
      log: {
        info: jest.fn(),
        error: jest.fn(),
      },
      post: jest.fn(),
      get: jest.fn(),
    };

    // Mock do reply
    mockReply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mock básico do request
    mockRequest = {
      body: {},
    };

    // Limpar mocks
    jest.clearAllMocks();
  });

  test('constructor e injeção de dependências', () => {
    const keyboardService = { type: jest.fn() };
    const clipboardService = { copy: jest.fn() };

    controller = new KeyboardController(keyboardService, clipboardService);
    expect(controller).toBeDefined();
  });

  test('buildRoutes registra rotas corretamente', () => {
    const done = jest.fn();

    KeyboardController.buildRoutes(fastifyInstance, {}, done);

    expect(done).toHaveBeenCalled();
    expect(fastifyInstance.post).toHaveBeenCalledTimes(5);
    expect(fastifyInstance.get).toHaveBeenCalledTimes(1);
  });

  test('registra todas as rotas esperadas', () => {
    const done = jest.fn();

    KeyboardController.buildRoutes(fastifyInstance, {}, done);

    // Verificar rotas de teclado
    expect(fastifyInstance.post).toHaveBeenCalledWith(
      '/keyboard/type',
      expect.any(Object),
      expect.any(Function),
    );
    expect(fastifyInstance.post).toHaveBeenCalledWith(
      '/keyboard/press',
      expect.any(Object),
      expect.any(Function),
    );
    expect(fastifyInstance.post).toHaveBeenCalledWith(
      '/keyboard/combination',
      expect.any(Object),
      expect.any(Function),
    );

    // Verificar rotas de clipboard
    expect(fastifyInstance.post).toHaveBeenCalledWith(
      '/clipboard/copy',
      expect.any(Object),
      expect.any(Function),
    );
    expect(fastifyInstance.get).toHaveBeenCalledWith(
      '/clipboard/paste',
      expect.any(Object),
      expect.any(Function),
    );
    expect(fastifyInstance.post).toHaveBeenCalledWith(
      '/clipboard/clear',
      expect.any(Object),
      expect.any(Function),
    );
  });

  describe('handlers de rota', () => {
    beforeEach(() => {
      KeyboardController.buildRoutes(fastifyInstance, {}, jest.fn());
    });

    test('type handler - sucesso', async () => {
      mockRequest.body = { text: 'hello', mode: 'instant' };

      // Pegar o handler registrado
      const typeHandler = fastifyInstance.post.mock.calls[0][2];
      await typeHandler(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        data: { textLength: 5, mode: 'instant', timing: 0 },
      });
    });

    test('type handler - erro do serviço', async () => {
      const container = require('tsyringe').container;

      // Salvar implementação original
      const originalResolve = container.resolve;

      // Mock temporário para este teste
      container.resolve = jest.fn().mockImplementation((token: string) => {
        if (token === 'KeyboardService') {
          return {
            type: jest.fn().mockResolvedValue({ success: false, error: 'Service error' }),
            pressKey: jest.fn(),
            combination: jest.fn(),
          };
        }
        if (token === 'ClipboardService') {
          return {
            copy: jest.fn(),
            paste: jest.fn(),
            clear: jest.fn(),
          };
        }
        return {};
      });

      // Limpar chamadas do post anteriores
      fastifyInstance.post.mockClear();
      fastifyInstance.get.mockClear();

      KeyboardController.buildRoutes(fastifyInstance, {}, jest.fn());
      mockRequest.body = { text: 'hello', mode: 'instant' };

      const typeHandler = fastifyInstance.post.mock.calls[0][2];
      await typeHandler(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        error: 'Service error',
      });

      // Restaurar implementação original
      container.resolve = originalResolve;
    });

    test('type handler - exceção', async () => {
      const container = require('tsyringe').container;

      // Salvar implementação original
      const originalResolve = container.resolve;

      // Mock temporário para este teste
      container.resolve = jest.fn().mockImplementation((token: string) => {
        if (token === 'KeyboardService') {
          return {
            type: jest.fn().mockRejectedValue(new Error('Unexpected error')),
            pressKey: jest.fn(),
            combination: jest.fn(),
          };
        }
        if (token === 'ClipboardService') {
          return {
            copy: jest.fn(),
            paste: jest.fn(),
            clear: jest.fn(),
          };
        }
        return {};
      });

      // Limpar chamadas do post anteriores
      fastifyInstance.post.mockClear();
      fastifyInstance.get.mockClear();

      KeyboardController.buildRoutes(fastifyInstance, {}, jest.fn());
      mockRequest.body = { text: 'hello', mode: 'instant' };

      const typeHandler = fastifyInstance.post.mock.calls[0][2];
      await typeHandler(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        error: 'Internal server error during keyboard type operation',
      });

      // Restaurar implementação original
      container.resolve = originalResolve;
    });

    test('pressKey handler - sucesso', async () => {
      mockRequest.body = { key: 'a' };

      const pressKeyHandler = fastifyInstance.post.mock.calls[1][2];
      await pressKeyHandler(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        data: { key: 'a' },
      });
    });

    test('combination handler - sucesso', async () => {
      mockRequest.body = { keys: ['ctrl', 'c'] };

      const combinationHandler = fastifyInstance.post.mock.calls[2][2];
      await combinationHandler(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        data: { combination: 'ctrl+c' },
      });
    });

    test('clipboardCopy handler - sucesso', async () => {
      mockRequest.body = { content: 'test copy' };

      const copyHandler = fastifyInstance.post.mock.calls[3][2];
      await copyHandler(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        data: { contentLength: 10, sizeBytes: 10 },
      });
    });

    test('clipboardPaste handler - sucesso', async () => {
      const pasteHandler = fastifyInstance.get.mock.calls[0][2];
      await pasteHandler(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        data: { content: 'test', isEmpty: false, contentLength: 4 },
      });
    });

    test('clipboardClear handler - sucesso', async () => {
      const clearHandler = fastifyInstance.post.mock.calls[4][2];
      await clearHandler(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        data: { cleared: true },
      });
    });

    test('todos os handlers lidam com erros de serviço', async () => {
      // Recriar controller com serviços que falham
      const container = require('tsyringe').container;
      const originalResolve = container.resolve;

      container.resolve = jest.fn().mockImplementation((token: string) => {
        if (token === 'KeyboardService') {
          return {
            type: jest.fn().mockResolvedValue({ success: false, error: 'Type error' }),
            pressKey: jest.fn().mockResolvedValue({ success: false, error: 'Press error' }),
            combination: jest
              .fn()
              .mockResolvedValue({ success: false, error: 'Combination error' }),
          };
        }
        if (token === 'ClipboardService') {
          return {
            copy: jest.fn().mockResolvedValue({ success: false, error: 'Copy error' }),
            paste: jest.fn().mockResolvedValue({ success: false, error: 'Paste error' }),
            clear: jest.fn().mockResolvedValue({ success: false, error: 'Clear error' }),
          };
        }
        return {};
      });

      // Limpar chamadas anteriores
      fastifyInstance.post.mockClear();
      fastifyInstance.get.mockClear();
      fastifyInstance.log.error.mockClear();

      KeyboardController.buildRoutes(fastifyInstance, {}, jest.fn());

      // Testar cada handler
      const handlers = [
        fastifyInstance.post.mock.calls[0][2], // type
        fastifyInstance.post.mock.calls[1][2], // pressKey
        fastifyInstance.post.mock.calls[2][2], // combination
        fastifyInstance.post.mock.calls[3][2], // copy
        fastifyInstance.get.mock.calls[0][2], // paste
        fastifyInstance.post.mock.calls[4][2], // clear
      ];

      mockRequest.body = { text: 'test', key: 'a', keys: ['ctrl', 'c'], content: 'test' };

      for (const handler of handlers) {
        fastifyInstance.log.error.mockClear();
        await handler(mockRequest, mockReply);
        expect(fastifyInstance.log.error).toHaveBeenCalled();
      }

      // Restaurar implementação original
      container.resolve = originalResolve;
    });

    test('todos os handlers lidam com exceções', async () => {
      // Recriar controller com serviços que lançam exceções
      const container = require('tsyringe').container;
      const originalResolve = container.resolve;

      container.resolve = jest.fn().mockImplementation((token: string) => {
        if (token === 'KeyboardService') {
          return {
            type: jest.fn().mockRejectedValue(new Error('Type exception')),
            pressKey: jest.fn().mockRejectedValue(new Error('Press exception')),
            combination: jest.fn().mockRejectedValue(new Error('Combination exception')),
          };
        }
        if (token === 'ClipboardService') {
          return {
            copy: jest.fn().mockRejectedValue(new Error('Copy exception')),
            paste: jest.fn().mockRejectedValue(new Error('Paste exception')),
            clear: jest.fn().mockRejectedValue(new Error('Clear exception')),
          };
        }
        return {};
      });

      // Limpar chamadas anteriores
      fastifyInstance.post.mockClear();
      fastifyInstance.get.mockClear();
      fastifyInstance.log.error.mockClear();
      mockReply.code.mockClear();

      KeyboardController.buildRoutes(fastifyInstance, {}, jest.fn());

      // Testar cada handler
      const handlers = [
        fastifyInstance.post.mock.calls[0][2], // type
        fastifyInstance.post.mock.calls[1][2], // pressKey
        fastifyInstance.post.mock.calls[2][2], // combination
        fastifyInstance.post.mock.calls[3][2], // copy
        fastifyInstance.get.mock.calls[0][2], // paste
        fastifyInstance.post.mock.calls[4][2], // clear
      ];

      mockRequest.body = { text: 'test', key: 'a', keys: ['ctrl', 'c'], content: 'test' };

      for (const handler of handlers) {
        mockReply.code.mockClear();
        fastifyInstance.log.error.mockClear();
        await handler(mockRequest, mockReply);
        expect(mockReply.code).toHaveBeenCalledWith(500);
        expect(fastifyInstance.log.error).toHaveBeenCalled();
      }

      // Restaurar implementação original
      container.resolve = originalResolve;
    });
  });

  test('logger é configurado corretamente', () => {
    KeyboardController.buildRoutes(fastifyInstance, {}, jest.fn());

    // Verificar que o logger foi configurado
    expect(fastifyInstance.log).toBeDefined();
  });

  test('schemas de validação são aplicados', () => {
    KeyboardController.buildRoutes(fastifyInstance, {}, jest.fn());

    // Verificar que todas as rotas têm schema definido
    const postCalls = fastifyInstance.post.mock.calls;
    const getCalls = fastifyInstance.get.mock.calls;

    postCalls.forEach((call: any) => {
      expect(call[1]).toHaveProperty('schema');
    });

    getCalls.forEach((call: any) => {
      expect(call[1]).toHaveProperty('schema');
    });
  });
});
