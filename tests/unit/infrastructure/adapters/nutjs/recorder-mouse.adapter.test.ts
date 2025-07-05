// Mock das dependências antes dos imports
jest.mock('../../../../../src/config/environment', () => ({
  environment: {
    mouseSpeed: 1000,
  },
}));

jest.mock('@nut-tree-fork/nut-js', () => ({
  mouse: {
    config: {
      mouseSpeed: 1000,
    },
    pressButton: jest.fn().mockResolvedValue(undefined),
    releaseButton: jest.fn().mockResolvedValue(undefined),
    setPosition: jest.fn().mockResolvedValue(undefined),
    getPosition: jest.fn().mockResolvedValue({ x: 0, y: 0 }),
    move: jest.fn().mockResolvedValue(undefined),
  },
  Button: {
    LEFT: 0,
    RIGHT: 1,
    MIDDLE: 2,
  },
  Point: jest.fn((x: number, y: number) => ({ x, y })),
  straightTo: jest.fn((point: any) => point),
}));

// Mock do setTimeout para executar imediatamente
global.setTimeout = jest.fn((callback: any) => {
  callback();
  return 0 as any;
}) as any;

// Importações
const {
  RecorderMouseAdapter,
} = require('../../../../../src/infrastructure/adapters/nutjs/recorder-mouse.adapter');
const { mouse, Button } = require('@nut-tree-fork/nut-js');
const {
  EventDispatcher,
} = require('../../../../../src/application/services/event-dispatcher.service');
const { MouseButton } = require('../../../../../src/domain/entities/mouse-action');

describe('RecorderMouseAdapter', () => {
  let adapter: any;
  let mockEventDispatcher: any;

  beforeEach(() => {
    jest.clearAllMocks();

    mockEventDispatcher = {
      dispatch: jest.fn(),
    };

    adapter = new RecorderMouseAdapter(mockEventDispatcher);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('constructor initializes with EventDispatcher', () => {
    expect(adapter).toBeDefined();
    expect(adapter.eventDispatcher).toBe(mockEventDispatcher);
  });

  describe('drag method', () => {
    test('performs drag operation with event emissions', async () => {
      const from = { x: 100, y: 100 };
      const to = { x: 200, y: 200 };
      const duration = 300;

      // Mock move method
      adapter.move = jest.fn().mockResolvedValue(undefined);

      await adapter.drag(from, to, duration);

      // Verificar move inicial
      expect(adapter.move).toHaveBeenCalledWith(from, true, duration / 3);

      // Verificar mouse press
      expect(mouse.pressButton).toHaveBeenCalledWith(Button.LEFT);

      // Verificar mouse release
      expect(mouse.releaseButton).toHaveBeenCalledWith(Button.LEFT);

      // Verificar eventos emitidos
      const dispatchCalls = mockEventDispatcher.dispatch.mock.calls;
      expect(dispatchCalls.length).toBeGreaterThan(0);

      // Verificar evento de click inicial
      expect(dispatchCalls[0][0]).toMatchObject({
        type: 'mouse',
        cursorX: from.x,
        cursorY: from.y,
        data: {
          action: 'click',
          x: from.x,
          y: from.y,
          button: 'left',
        },
      });

      // Verificar último evento (release)
      const lastCall = dispatchCalls[dispatchCalls.length - 1][0];
      expect(lastCall).toMatchObject({
        type: 'mouse',
        cursorX: to.x,
        cursorY: to.y,
        data: {
          action: 'release',
          x: to.x,
          y: to.y,
          button: 'left',
        },
      });
    });

    test('handles drag with minimal steps', async () => {
      const from = { x: 100, y: 100 };
      const to = { x: 101, y: 101 };
      const duration = 10; // Duração muito curta

      adapter.move = jest.fn().mockResolvedValue(undefined);

      await adapter.drag(from, to, duration);

      expect(adapter.move).toHaveBeenCalled();
      expect(mouse.pressButton).toHaveBeenCalled();
      expect(mouse.releaseButton).toHaveBeenCalled();
      expect(mockEventDispatcher.dispatch).toHaveBeenCalled();
    });

    test('emits movement events during drag', async () => {
      const from = { x: 0, y: 0 };
      const to = { x: 100, y: 100 };
      const duration = 600;

      adapter.move = jest.fn().mockResolvedValue(undefined);

      await adapter.drag(from, to, duration);

      const dispatchCalls = mockEventDispatcher.dispatch.mock.calls;

      // Filtrar apenas eventos de movimento
      const moveEvents = dispatchCalls.filter((call: any) => call[0].data.action === 'move');

      // Deve ter pelo menos um evento de movimento
      expect(moveEvents.length).toBeGreaterThan(0);

      // Verificar que os eventos de movimento têm coordenadas corretas
      moveEvents.forEach((call: any) => {
        const event = call[0];
        expect(event.type).toBe('mouse');
        expect(event.data.action).toBe('move');
        expect(typeof event.data.x).toBe('number');
        expect(typeof event.data.y).toBe('number');
      });
    });
  });

  describe('delayMs method', () => {
    test('returns a promise that resolves after timeout', async () => {
      // Acessar método privado através de any
      const delayPromise = adapter.delayMs(100);

      expect(delayPromise).toBeInstanceOf(Promise);
      await expect(delayPromise).resolves.toBeUndefined();

      // Verificar que setTimeout foi chamado
      expect(global.setTimeout).toHaveBeenCalledWith(expect.any(Function), 100);
    });
  });

  describe('eventButtonMap property', () => {
    test('maps MouseButton enum to event button strings', () => {
      // Acessar propriedade privada através de any
      const buttonMap = adapter.eventButtonMap;

      expect(buttonMap).toBeDefined();
      expect(buttonMap[MouseButton.LEFT]).toBe('left');
      expect(buttonMap[MouseButton.RIGHT]).toBe('right');
      expect(buttonMap[MouseButton.MIDDLE]).toBe('middle');
    });
  });

  describe('lastMoveTime property', () => {
    test('initializes to 0', () => {
      // Acessar propriedade privada através de any
      expect(adapter.lastMoveTime).toBe(0);
    });
  });

  describe('inheritance from NutJSMouseAdapter', () => {
    test('extends NutJSMouseAdapter class', () => {
      // Verificar que métodos herdados existem
      expect(typeof adapter.move).toBe('function');
      expect(typeof adapter.click).toBe('function');
      expect(typeof adapter.clickAt).toBe('function');
      expect(typeof adapter.scroll).toBe('function');
      expect(typeof adapter.getPosition).toBe('function');
    });
  });

  describe('edge cases', () => {
    test('handles drag with same start and end positions', async () => {
      const position = { x: 150, y: 150 };
      const duration = 100;

      adapter.move = jest.fn().mockResolvedValue(undefined);

      await adapter.drag(position, position, duration);

      expect(mouse.pressButton).toHaveBeenCalled();
      expect(mouse.releaseButton).toHaveBeenCalled();
      expect(mockEventDispatcher.dispatch).toHaveBeenCalled();
    });

    test('handles drag with negative coordinates', async () => {
      const from = { x: -50, y: -50 };
      const to = { x: -100, y: -100 };
      const duration = 200;

      adapter.move = jest.fn().mockResolvedValue(undefined);

      await adapter.drag(from, to, duration);

      expect(mouse.pressButton).toHaveBeenCalled();
      expect(mouse.releaseButton).toHaveBeenCalled();

      const dispatchCalls = mockEventDispatcher.dispatch.mock.calls;
      expect(dispatchCalls[0][0].cursorX).toBe(-50);
      expect(dispatchCalls[0][0].cursorY).toBe(-50);
    });

    test('handles drag with very large coordinates', async () => {
      const from = { x: 10000, y: 10000 };
      const to = { x: 20000, y: 20000 };
      const duration = 500;

      adapter.move = jest.fn().mockResolvedValue(undefined);

      await adapter.drag(from, to, duration);

      expect(mouse.pressButton).toHaveBeenCalled();
      expect(mouse.releaseButton).toHaveBeenCalled();
      expect(mockEventDispatcher.dispatch).toHaveBeenCalled();
    });

    test('handles drag with zero duration', async () => {
      const from = { x: 0, y: 0 };
      const to = { x: 100, y: 100 };
      const duration = 0;

      adapter.move = jest.fn().mockResolvedValue(undefined);

      await adapter.drag(from, to, duration);

      expect(mouse.pressButton).toHaveBeenCalled();
      expect(mouse.releaseButton).toHaveBeenCalled();
      expect(mockEventDispatcher.dispatch).toHaveBeenCalled();
    });
  });
});
