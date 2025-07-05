// Mock do container antes de qualquer import
jest.mock('../../../src/config/dependency-injection.js', () => ({
  container: {
    resolve: jest.fn(),
  },
}));

// Mock do controller
const mockController = {
  streamInputEvents: jest.fn(),
  getStats: jest.fn(),
  clearBuffer: jest.fn(),
  pruneBuffer: jest.fn(),
};

// Usando require devido ao verbatimModuleSyntax
const { inputEventsRoutes } = require('../../../src/routes/input-events.routes');
const { container } = require('../../../src/config/dependency-injection.js');

describe('input-events.routes', () => {
  let mockFastify: any;
  let registeredRoutes: any[] = [];

  beforeEach(() => {
    jest.clearAllMocks();
    registeredRoutes = [];

    // Mock do Fastify instance
    mockFastify = {
      get: jest.fn((path: string, options: any, handler: any) => {
        registeredRoutes.push({ method: 'GET', path, options, handler });
      }),
      post: jest.fn((path: string, options: any, handler: any) => {
        registeredRoutes.push({ method: 'POST', path, options, handler });
      }),
    };

    // Configurar mock do container
    (container.resolve as jest.Mock).mockReturnValue(mockController);
  });

  test('deve resolver InputEventsController do container', async () => {
    await inputEventsRoutes(mockFastify);
    expect(container.resolve).toHaveBeenCalledWith(expect.anything());
  });

  test('deve registrar rota GET /input-events', async () => {
    await inputEventsRoutes(mockFastify);

    expect(mockFastify.get).toHaveBeenCalledWith(
      '/input-events',
      expect.objectContaining({
        schema: expect.objectContaining({
          description: expect.any(String),
          tags: expect.arrayContaining(['Input Events']),
        }),
      }),
      expect.any(Function),
    );

    // Testar o handler
    const route = registeredRoutes.find((r) => r.method === 'GET' && r.path === '/input-events');
    const mockRequest = {};
    const mockReply = {};

    await route.handler(mockRequest, mockReply);
    expect(mockController.streamInputEvents).toHaveBeenCalledWith(mockRequest, mockReply);
  });

  test('deve registrar rota GET /input-events/stats', async () => {
    await inputEventsRoutes(mockFastify);

    expect(mockFastify.get).toHaveBeenCalledWith(
      '/input-events/stats',
      expect.objectContaining({
        schema: expect.objectContaining({
          description: expect.any(String),
          tags: expect.arrayContaining(['Input Events']),
        }),
      }),
      expect.any(Function),
    );

    // Testar o handler
    const route = registeredRoutes.find(
      (r) => r.method === 'GET' && r.path === '/input-events/stats',
    );
    const mockRequest = {};
    const mockReply = {};

    await route.handler(mockRequest, mockReply);
    expect(mockController.getStats).toHaveBeenCalledWith(mockRequest, mockReply);
  });

  test('deve registrar rota POST /input-events/clear', async () => {
    await inputEventsRoutes(mockFastify);

    expect(mockFastify.post).toHaveBeenCalledWith(
      '/input-events/clear',
      expect.objectContaining({
        schema: expect.objectContaining({
          description: expect.any(String),
          tags: expect.arrayContaining(['Input Events']),
        }),
      }),
      expect.any(Function),
    );

    // Testar o handler
    const route = registeredRoutes.find(
      (r) => r.method === 'POST' && r.path === '/input-events/clear',
    );
    const mockRequest = {};
    const mockReply = {};

    await route.handler(mockRequest, mockReply);
    expect(mockController.clearBuffer).toHaveBeenCalledWith(mockRequest, mockReply);
  });

  test('deve registrar rota POST /input-events/prune', async () => {
    await inputEventsRoutes(mockFastify);

    expect(mockFastify.post).toHaveBeenCalledWith(
      '/input-events/prune',
      expect.objectContaining({
        schema: expect.objectContaining({
          description: expect.any(String),
          tags: expect.arrayContaining(['Input Events']),
          body: expect.objectContaining({
            type: 'object',
            properties: expect.objectContaining({
              maxAgeMs: expect.any(Object),
            }),
          }),
        }),
      }),
      expect.any(Function),
    );

    // Testar o handler
    const route = registeredRoutes.find(
      (r) => r.method === 'POST' && r.path === '/input-events/prune',
    );
    const mockRequest = { body: { maxAgeMs: 5000 } };
    const mockReply = {};

    await route.handler(mockRequest, mockReply);
    expect(mockController.pruneBuffer).toHaveBeenCalledWith(mockRequest, mockReply);
  });

  test('deve registrar todas as 4 rotas', async () => {
    await inputEventsRoutes(mockFastify);

    expect(mockFastify.get).toHaveBeenCalledTimes(2);
    expect(mockFastify.post).toHaveBeenCalledTimes(2);
    expect(registeredRoutes).toHaveLength(4);
  });

  test('todas as rotas devem ter schemas de validação', async () => {
    await inputEventsRoutes(mockFastify);

    registeredRoutes.forEach((route) => {
      expect(route.options.schema).toBeDefined();
      expect(route.options.schema.description).toBeDefined();
      expect(route.options.schema.tags).toContain('Input Events');
    });
  });

  test('rotas POST devem ter response schema padrão', async () => {
    await inputEventsRoutes(mockFastify);

    const postRoutes = registeredRoutes.filter((r) => r.method === 'POST');
    postRoutes.forEach((route) => {
      expect(route.options.schema.response).toBeDefined();
      expect(route.options.schema.response[200]).toBeDefined();
    });
  });

  test('deve lidar com erros no controller', async () => {
    // Configurar o controller para lançar erro
    mockController.streamInputEvents.mockRejectedValue(new Error('Test error'));

    await inputEventsRoutes(mockFastify);

    const route = registeredRoutes.find((r) => r.path === '/input-events');
    const mockRequest = {};
    const mockReply = {};

    // O handler deve propagar o erro
    await expect(route.handler(mockRequest, mockReply)).rejects.toThrow('Test error');
  });
});
