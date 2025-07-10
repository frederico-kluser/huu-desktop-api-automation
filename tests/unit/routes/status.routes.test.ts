describe('status.routes', () => {
  let mockFastify: any;
  let mockReply: any;
  let statusRoutes: any;

  beforeEach(() => {
    // Mock Date.now() para controlar valores de latência
    jest.spyOn(Date, 'now').mockReturnValue(1000);
    jest.spyOn(Date.prototype, 'toISOString').mockReturnValue('2025-01-01T00:00:00.000Z');

    // Mock do reply
    mockReply = {
      send: jest.fn().mockReturnThis(),
      code: jest.fn().mockReturnThis(),
    };

    // Mock do Fastify
    mockFastify = {
      get: jest.fn(),
    };

    // Limpar cache do módulo
    jest.resetModules();

    // Usar require devido ao verbatimModuleSyntax
    statusRoutes = require('../../../src/routes/status.routes').statusRoutes;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('registers GET /status route', () => {
    const done = jest.fn();

    statusRoutes(mockFastify, {}, done);

    expect(mockFastify.get).toHaveBeenCalledWith('/status', expect.any(Function));
    expect(done).toHaveBeenCalled();
  });

  test('GET /status returns success response', async () => {
    const done = jest.fn();

    statusRoutes(mockFastify, {}, done);

    // Capturar o handler registrado
    const [[, handler]] = mockFastify.get.mock.calls;

    // Simular avanço de tempo para latência
    Date.now = jest
      .fn()
      .mockReturnValueOnce(1000) // startTime
      .mockReturnValueOnce(1005) // latency check
      .mockReturnValueOnce(1005); // second latency check if needed

    // Executar handler
    await handler({}, mockReply);

    expect(mockReply.send).toHaveBeenCalledWith({
      ok: true,
      latency: 5,
      message: 'API is operational',
      checkedAt: '2025-01-01T00:00:00.000Z',
    });
    expect(mockReply.code).not.toHaveBeenCalled();
  });

  test('GET /status returns error response on exception', async () => {
    const done = jest.fn();

    statusRoutes(mockFastify, {}, done);

    // Capturar o handler registrado
    const [[, handler]] = mockFastify.get.mock.calls;

    // Forçar erro no Date.now() após startTime
    Date.now = jest
      .fn()
      .mockReturnValueOnce(1000) // startTime
      .mockImplementationOnce(() => {
        throw new Error('Test error');
      });

    // Executar handler
    await handler({}, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(503);
    expect(mockReply.send).toHaveBeenCalledWith({
      ok: false,
      latency: expect.any(Number),
      message: 'API is experiencing issues',
      checkedAt: '2025-01-01T00:00:00.000Z',
    });
  });

  test('exports statusRoutes function', () => {
    expect(typeof statusRoutes).toBe('function');
    expect(statusRoutes.length).toBe(3); // 3 parâmetros
  });

  test('calls done callback synchronously', () => {
    const done = jest.fn();

    statusRoutes(mockFastify, {}, done);

    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith();
  });

  test('handler is async function', () => {
    const done = jest.fn();

    statusRoutes(mockFastify, {}, done);

    const [[, handler]] = mockFastify.get.mock.calls;

    // Verificar que retorna uma Promise
    const result = handler({}, mockReply);
    expect(result).toBeInstanceOf(Promise);
  });

  test('latency calculation in catch block', async () => {
    const done = jest.fn();

    statusRoutes(mockFastify, {}, done);

    const [[, handler]] = mockFastify.get.mock.calls;

    // Mock para simular erro após cálculo inicial
    let callCount = 0;
    Date.now = jest.fn(() => {
      callCount++;
      if (callCount === 1) return 1000; // startTime
      if (callCount === 2) throw new Error('Error during processing');
      return 1010; // Para cálculo de latência no catch
    });

    await handler({}, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(503);
    expect(mockReply.send).toHaveBeenCalledWith({
      ok: false,
      latency: 10,
      message: 'API is experiencing issues',
      checkedAt: '2025-01-01T00:00:00.000Z',
    });
  });
});
