// Mock dos controllers e rotas
jest.mock('../../../src/interface/controllers/automation.controller', () => ({
  AutomationController: jest.fn().mockImplementation(() => ({
    registerRoutes: jest.fn(),
  })),
}));

jest.mock('../../../src/interface/controllers/keyboard.controller', () => ({
  KeyboardController: {
    buildRoutes: jest.fn((fastify, opts, done) => {
      done();
    }),
  },
}));

jest.mock('../../../src/routes/input-events.routes', () => ({
  inputEventsRoutes: jest.fn(),
}));

jest.mock('../../../src/routes/recorder.routes', () => ({
  recorderRoutes: jest.fn(),
}));

jest.mock('../../../src/interface/controllers/llm.controller', () => ({
  LLMController: jest.fn().mockImplementation(() => ({
    registerRoutes: jest.fn(),
  })),
}));

// Usar require devido ao verbatimModuleSyntax
const { automationRoutes } = require('../../../src/routes/automation.routes');
const {
  AutomationController,
} = require('../../../src/interface/controllers/automation.controller');
const { KeyboardController } = require('../../../src/interface/controllers/keyboard.controller');
const { LLMController } = require('../../../src/interface/controllers/llm.controller');
const { inputEventsRoutes } = require('../../../src/routes/input-events.routes');
const { recorderRoutes } = require('../../../src/routes/recorder.routes');

describe('automation.routes', () => {
  let mockServer: any;
  let mockRegisterOptions: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock do Fastify server com todas as propriedades necessárias
    mockRegisterOptions = {
      registeredRoutes: [] as any[],
    };

    mockServer = {
      register: jest.fn((plugin: any, opts?: any) => {
        // Se plugin é uma função, executá-la
        if (typeof plugin === 'function' && plugin.length === 3) {
          // É um plugin que espera (fastify, opts, done)
          const mockDone = jest.fn();
          plugin(mockServer, opts || {}, mockDone);
          mockRegisterOptions.registeredRoutes.push({ plugin, opts });
        } else {
          // É um plugin async
          mockRegisterOptions.registeredRoutes.push({ plugin, opts });
        }
        return Promise.resolve();
      }),
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      head: jest.fn(),
      patch: jest.fn(),
      options: jest.fn(),
    };
  });

  test('should register automation controller routes', async () => {
    await automationRoutes(mockServer, {}, jest.fn());

    // Verificar que AutomationController foi instanciado
    expect(AutomationController).toHaveBeenCalledTimes(1);

    // Verificar que registerRoutes foi chamado
    const controllerInstance = (AutomationController as jest.Mock).mock.results[0].value;
    expect(controllerInstance.registerRoutes).toHaveBeenCalledWith(mockServer);
  });

  test('should register keyboard controller routes', async () => {
    await automationRoutes(mockServer, {}, jest.fn());

    // Verificar que register foi chamado para keyboard routes
    expect(mockServer.register).toHaveBeenCalled();

    // Verificar que KeyboardController.buildRoutes foi chamado
    expect(KeyboardController.buildRoutes).toHaveBeenCalledWith(
      mockServer,
      expect.any(Object),
      expect.any(Function),
    );
  });

  test('should register LLM controller routes', async () => {
    await automationRoutes(mockServer, {}, jest.fn());

    // Verificar que LLMController foi instanciado
    expect(LLMController).toHaveBeenCalledTimes(1);

    // Verificar que registerRoutes foi chamado
    const llmControllerInstance = (LLMController as jest.Mock).mock.results[0].value;
    expect(llmControllerInstance.registerRoutes).toHaveBeenCalledWith(mockServer);
  });

  test('should register input events routes with prefix', async () => {
    await automationRoutes(mockServer, {}, jest.fn());

    // Verificar que inputEventsRoutes foi registrado com prefix correto
    expect(mockServer.register).toHaveBeenCalledWith(inputEventsRoutes, { prefix: '/stream' });
  });

  test('should register recorder routes', async () => {
    await automationRoutes(mockServer, {}, jest.fn());

    // Verificar que recorderRoutes foi registrado
    expect(mockServer.register).toHaveBeenCalledWith(recorderRoutes);
  });

  test('should register all routes in correct order', async () => {
    await automationRoutes(mockServer, {}, jest.fn());

    // Verificar que todas as rotas foram registradas
    expect(mockServer.register).toHaveBeenCalledTimes(3);

    // Verificar ordem de registro
    const registerCalls = (mockServer.register as jest.Mock).mock.calls;

    // Primeira chamada: keyboard routes (função inline)
    expect(typeof registerCalls[0][0]).toBe('function');

    // Segunda chamada: input events routes com prefix
    expect(registerCalls[1][0]).toBe(inputEventsRoutes);
    expect(registerCalls[1][1]).toEqual({ prefix: '/stream' });

    // Terceira chamada: recorder routes
    expect(registerCalls[2][0]).toBe(recorderRoutes);
  });

  test('should handle async registration properly', async () => {
    // Simular falha de registro
    const errorMessage = 'Registration failed';
    mockServer.register.mockRejectedValueOnce(new Error(errorMessage));

    await expect(automationRoutes(mockServer, {}, jest.fn())).rejects.toThrow(errorMessage);
  });

  test('should pass options to automation routes plugin', async () => {
    const customOptions = { customOption: 'test' };
    const mockDone = jest.fn();

    await automationRoutes(mockServer, customOptions, mockDone);

    // Verificar que o plugin foi executado com as opções corretas
    expect(AutomationController).toHaveBeenCalledTimes(1);
  });

  test('should complete done callback for keyboard routes', async () => {
    // Limpar mock anterior
    KeyboardController.buildRoutes.mockClear();

    // Mock para capturar o callback done
    let capturedDone: any;
    KeyboardController.buildRoutes.mockImplementation((fastify: any, opts: any, done: any) => {
      capturedDone = done;
      done();
    });

    await automationRoutes(mockServer, {}, jest.fn());

    // Verificar que done foi chamado
    expect(capturedDone).toBeDefined();
    expect(typeof capturedDone).toBe('function');
  });

  test('should handle multiple registrations independently', async () => {
    // Executar automationRoutes múltiplas vezes
    await automationRoutes(mockServer, {}, jest.fn());
    await automationRoutes(mockServer, {}, jest.fn());

    // Cada execução deve criar nova instância do controller
    expect(AutomationController).toHaveBeenCalledTimes(2);

    // Cada instância deve ter seu próprio registerRoutes chamado
    const instances = (AutomationController as jest.Mock).mock.results;
    expect(instances[0].value.registerRoutes).toHaveBeenCalledTimes(1);
    expect(instances[1].value.registerRoutes).toHaveBeenCalledTimes(1);
  });
});
