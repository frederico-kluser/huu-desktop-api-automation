// Mock de reflect-metadata
jest.mock('reflect-metadata', () => ({}));

// Mock de tsyringe
const mockContainer = {
  register: jest.fn(),
  registerSingleton: jest.fn(),
  registerInstance: jest.fn(),
};
jest.mock('tsyringe', () => ({
  container: mockContainer,
  injectable: () => (target: any) => target,
  inject: () => () => {},
}));

// Mock de todos os serviços e adaptadores
jest.mock('../../../src/application/services/mouse.service', () => ({
  MouseService: class MockMouseService {},
}));
jest.mock('../../../src/application/services/screen.service', () => ({
  ScreenService: class MockScreenService {},
}));
jest.mock('../../../src/application/services/keyboard.service', () => ({
  KeyboardService: class MockKeyboardService {},
}));
jest.mock('../../../src/application/services/clipboard.service', () => ({
  ClipboardService: class MockClipboardService {},
}));
jest.mock('../../../src/infrastructure/adapters/nutjs/nutjs-mouse.adapter', () => ({
  NutJSMouseAdapter: class MockNutJSMouseAdapter {},
}));
jest.mock('../../../src/infrastructure/adapters/nutjs/nutjs-screen.adapter', () => ({
  NutJSScreenAdapter: class MockNutJSScreenAdapter {},
}));
jest.mock('../../../src/infrastructure/adapters/nutjs/nutjs-keyboard.adapter', () => ({
  NutJSKeyboardAdapter: class MockNutJSKeyboardAdapter {},
}));
jest.mock('../../../src/application/services/event-dispatcher.service', () => ({
  EventDispatcher: class MockEventDispatcher {},
}));
jest.mock('../../../src/application/services/event-buffer.service', () => ({
  EventBuffer: class MockEventBuffer {},
}));
jest.mock('../../../src/interface/controllers/input-events.controller', () => ({
  InputEventsController: class MockInputEventsController {},
}));
jest.mock('../../../src/application/services/llm.service', () => ({
  LLMService: class MockLLMService {},
}));
jest.mock('../../../src/infrastructure/adapters/langchain/langchain-llm.adapter', () => ({
  LangChainLLMAdapter: class MockLangChainLLMAdapter {},
}));
jest.mock('../../../src/application/factory/output-parser.factory', () => ({
  OutputParserFactory: {
    getInstance: jest.fn().mockReturnValue({
      getStrategy: jest.fn(),
      registerStrategy: jest.fn(),
      cleanup: jest.fn(),
    }),
  },
}));

describe('dependency-injection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('configureDependencies registers all dependencies', () => {
    // Usar require após todos os mocks
    const { configureDependencies } = require('../../../src/config/dependency-injection');

    // Executar configuração
    configureDependencies();

    // Verificar registros de adaptadores
    expect(mockContainer.register).toHaveBeenCalledWith('MouseAdapter', {
      useClass: expect.any(Function),
    });
    expect(mockContainer.register).toHaveBeenCalledWith('ScreenAdapter', {
      useClass: expect.any(Function),
    });
    expect(mockContainer.register).toHaveBeenCalledWith('IKeyboardAdapter', {
      useClass: expect.any(Function),
    });

    // Verificar registros de serviços
    expect(mockContainer.register).toHaveBeenCalledWith('MouseService', {
      useClass: expect.any(Function),
    });
    expect(mockContainer.register).toHaveBeenCalledWith('ScreenService', {
      useClass: expect.any(Function),
    });
    expect(mockContainer.register).toHaveBeenCalledWith('KeyboardService', {
      useClass: expect.any(Function),
    });
    expect(mockContainer.register).toHaveBeenCalledWith('ClipboardService', {
      useClass: expect.any(Function),
    });

    // Verificar registros de singletons
    expect(mockContainer.registerSingleton).toHaveBeenCalledWith(expect.any(Function));
    expect(mockContainer.registerSingleton).toHaveBeenCalledTimes(5); // EventDispatcher, EventBuffer, GlobalInputCaptureService, ImagePreprocessor e OcrWorkerPool

    // Verificar registros de controllers
    expect(mockContainer.register).toHaveBeenCalledWith(expect.any(Function), {
      useClass: expect.any(Function),
    });

    // Total de chamadas register (incluindo OCR services)
    expect(mockContainer.register).toHaveBeenCalledTimes(13);
  });

  test('exports container', () => {
    const module = require('../../../src/config/dependency-injection');
    expect(module.container).toBe(mockContainer);
  });

  test('calls configureDependencies without errors', () => {
    const { configureDependencies } = require('../../../src/config/dependency-injection');
    expect(() => configureDependencies()).not.toThrow();
  });

  test('register is called with correct parameters', () => {
    const { configureDependencies } = require('../../../src/config/dependency-injection');
    configureDependencies();

    // Verificar algumas chamadas específicas
    const registerCalls = mockContainer.register.mock.calls;

    // Encontrar chamadas específicas
    const mouseAdapterCall = registerCalls.find((call) => call[0] === 'MouseAdapter');
    expect(mouseAdapterCall).toBeDefined();
    expect(mouseAdapterCall[1]).toHaveProperty('useClass');

    const keyboardServiceCall = registerCalls.find((call) => call[0] === 'KeyboardService');
    expect(keyboardServiceCall).toBeDefined();
    expect(keyboardServiceCall[1]).toHaveProperty('useClass');
  });
});
