// Mock de dependências
jest.mock('../../../src/config/dependency-injection', () => ({
  container: {
    resolve: jest.fn()
  }
}));

// Mock do controller
const mockController = {
  streamEvents: jest.fn(),
  getStats: jest.fn()
};

// Imports após mocks
const { container } = require('../../../src/config/dependency-injection');
const { recorderRoutes } = require('../../../src/routes/recorder.routes');

describe('recorderRoutes', () => {
  let mockFastify: any;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock do Fastify instance
    mockFastify = {
      get: jest.fn()
    };

    // Container retorna o controller mockado
    (container.resolve as jest.Mock).mockReturnValue(mockController);
  });

  test('registra rotas do recorder', async () => {
    // Executa o registro de rotas
    await recorderRoutes(mockFastify);

    // Verifica que container.resolve foi chamado
    expect(container.resolve).toHaveBeenCalledTimes(1);

    // Verifica que as rotas foram registradas
    expect(mockFastify.get).toHaveBeenCalledTimes(2);

    // Verifica rota /recorder/stream
    expect(mockFastify.get).toHaveBeenCalledWith(
      '/recorder/stream',
      expect.objectContaining({
        schema: expect.objectContaining({
          description: 'Inicia streaming de eventos de mouse e teclado',
          tags: ['recorder']
        }),
        handler: expect.any(Function)
      })
    );

    // Verifica rota /recorder/stats
    expect(mockFastify.get).toHaveBeenCalledWith(
      '/recorder/stats',
      expect.objectContaining({
        schema: expect.objectContaining({
          description: 'Retorna estatísticas do recorder',
          tags: ['recorder']
        }),
        handler: expect.any(Function)
      })
    );
  });

  test('handlers estão corretamente vinculados ao controller', async () => {
    await recorderRoutes(mockFastify);

    // Pega os handlers registrados
    const streamHandler = mockFastify.get.mock.calls[0][1].handler;
    const statsHandler = mockFastify.get.mock.calls[1][1].handler;

    // Executa handlers
    streamHandler();
    statsHandler();

    // Verifica que os métodos do controller foram chamados
    expect(mockController.streamEvents).toHaveBeenCalledTimes(1);
    expect(mockController.getStats).toHaveBeenCalledTimes(1);
  });

  test('schemas de validação estão corretamente definidos', async () => {
    await recorderRoutes(mockFastify);

    // Verifica schema da rota stream
    const streamSchema = mockFastify.get.mock.calls[0][1].schema;
    expect(streamSchema.response[200]).toEqual({
      description: 'Stream SSE iniciado',
      type: 'string',
      contentType: 'text/event-stream'
    });

    // Verifica schema da rota stats
    const statsSchema = mockFastify.get.mock.calls[1][1].schema;
    expect(statsSchema.response[200]).toMatchObject({
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: expect.any(Object)
      }
    });
  });

  test('StatsResponseSchema tem estrutura completa', async () => {
    await recorderRoutes(mockFastify);

    const statsSchema = mockFastify.get.mock.calls[1][1].schema.response[200];
    
    // Verifica estrutura completa do schema
    expect(statsSchema.properties.data.properties).toHaveProperty('activeConnections');
    expect(statsSchema.properties.data.properties).toHaveProperty('config');
    expect(statsSchema.properties.data.properties).toHaveProperty('timestamp');
    
    // Verifica propriedades do config
    expect(statsSchema.properties.data.properties.config.properties).toHaveProperty('includeScreenshot');
    expect(statsSchema.properties.data.properties.config.properties).toHaveProperty('moveIntervalMs');
    expect(statsSchema.properties.data.properties.config.properties).toHaveProperty('maxScreenshotSize');
  });
});