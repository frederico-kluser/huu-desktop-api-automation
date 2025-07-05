// Mock @nut-tree-fork/nut-js antes de qualquer import
jest.mock('@nut-tree-fork/nut-js', () => {
  const mockMouse = {
    config: { mouseSpeed: 0 },
    getPosition: jest.fn().mockResolvedValue({ x: 100, y: 200 }),
    move: jest.fn().mockResolvedValue(undefined),
    click: jest.fn().mockResolvedValue(undefined),
    doubleClick: jest.fn().mockResolvedValue(undefined),
    pressButton: jest.fn().mockResolvedValue(undefined),
    releaseButton: jest.fn().mockResolvedValue(undefined),
    scrollDown: jest.fn().mockResolvedValue(undefined),
  };

  return {
    mouse: mockMouse,
    straightTo: jest.fn((point) => point),
    Button: {
      LEFT: 0,
      RIGHT: 2,
      MIDDLE: 1,
    },
    Point: class MockPoint {
      constructor(
        public x: number,
        public y: number,
      ) {}
    },
  };
});

jest.mock('../../../../../src/config/environment.js', () => ({
  environment: { mouseSpeed: 1000 },
}));

jest.mock('../../../../../src/config/mouse.config.js', () => ({
  MouseDefaults: { sampleRate: 60 },
}));

// Mock tsyringe
jest.mock('tsyringe', () => ({
  injectable: () => (target: any) => target,
  container: {
    resolve: jest.fn(),
  },
}));

describe('NutJSMouseAdapter', () => {
  let adapter: any;
  let mockMouse: any;
  let mockStraightTo: any;
  let mockButton: any;
  let mockPoint: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Importar após os mocks
    const nutjs = require('@nut-tree-fork/nut-js');
    mockMouse = nutjs.mouse;
    mockStraightTo = nutjs.straightTo;
    mockButton = nutjs.Button;
    mockPoint = nutjs.Point;

    // Usar require para contornar verbatimModuleSyntax
    const {
      NutJSMouseAdapter,
    } = require('../../../../../src/infrastructure/adapters/nutjs/nutjs-mouse.adapter');
    adapter = new NutJSMouseAdapter();
  });

  describe('constructor', () => {
    it('should set mouse speed from environment', () => {
      expect(mockMouse.config.mouseSpeed).toBe(1000);
    });
  });

  describe('move', () => {
    it('should move instantly when smooth is false', async () => {
      await adapter.move({ x: 300, y: 400 }, false, 1000);

      expect(mockMouse.config.mouseSpeed).toBe(10000);
      expect(mockStraightTo).toHaveBeenCalledWith(expect.objectContaining({ x: 300, y: 400 }));
      expect(mockMouse.move).toHaveBeenCalled();
    });

    it('should move smoothly with interpolation when smooth is true', async () => {
      mockMouse.getPosition.mockResolvedValue({ x: 0, y: 0 });

      // Mock setTimeout para execução imediata
      const originalSetTimeout = global.setTimeout;
      global.setTimeout = jest.fn((callback) => {
        callback();
        return 1;
      }) as any;

      await adapter.move({ x: 100, y: 100 }, true, 1000);

      // Verificar que houve múltiplas chamadas de move
      expect(mockMouse.move).toHaveBeenCalledTimes(60); // 1000ms * 60fps / 1000

      global.setTimeout = originalSetTimeout;
    });

    it('should handle single step movement', async () => {
      mockMouse.getPosition.mockResolvedValue({ x: 0, y: 0 });

      await adapter.move({ x: 10, y: 10 }, true, 10);

      expect(mockMouse.move).toHaveBeenCalledTimes(1);
    });

    it('should calculate intermediate positions correctly', async () => {
      mockMouse.getPosition.mockResolvedValue({ x: 0, y: 0 });

      const originalSetTimeout = global.setTimeout;
      global.setTimeout = jest.fn((callback) => {
        callback();
        return 1;
      }) as any;

      await adapter.move({ x: 100, y: 50 }, true, 100);

      // Verificar que a última chamada foi para a posição final
      const lastCall = mockStraightTo.mock.calls[mockStraightTo.mock.calls.length - 1];
      expect(lastCall[0]).toMatchObject({ x: 100, y: 50 });

      global.setTimeout = originalSetTimeout;
    });
  });

  describe('click', () => {
    it('should perform single click with left button', async () => {
      const { MouseButton } = require('../../../../../src/domain/entities/mouse-action');
      await adapter.click(MouseButton.LEFT, false);

      expect(mockMouse.click).toHaveBeenCalledWith(mockButton.LEFT);
      expect(mockMouse.doubleClick).not.toHaveBeenCalled();
    });

    it('should perform single click with right button', async () => {
      const { MouseButton } = require('../../../../../src/domain/entities/mouse-action');
      await adapter.click(MouseButton.RIGHT, false);

      expect(mockMouse.click).toHaveBeenCalledWith(mockButton.RIGHT);
    });

    it('should perform single click with middle button', async () => {
      const { MouseButton } = require('../../../../../src/domain/entities/mouse-action');
      await adapter.click(MouseButton.MIDDLE, false);

      expect(mockMouse.click).toHaveBeenCalledWith(mockButton.MIDDLE);
    });

    it('should perform double click when doubleClick is true', async () => {
      const { MouseButton } = require('../../../../../src/domain/entities/mouse-action');
      await adapter.click(MouseButton.LEFT, true);

      expect(mockMouse.doubleClick).toHaveBeenCalledWith(mockButton.LEFT);
      expect(mockMouse.click).not.toHaveBeenCalled();
    });
  });

  describe('clickAt', () => {
    it('should move to position and then click', async () => {
      const { MouseButton } = require('../../../../../src/domain/entities/mouse-action');
      mockMouse.getPosition.mockResolvedValue({ x: 0, y: 0 });

      const originalSetTimeout = global.setTimeout;
      global.setTimeout = jest.fn((callback) => {
        callback();
        return 1;
      }) as any;

      await adapter.clickAt({ x: 150, y: 250 }, MouseButton.RIGHT, false);

      // Verificar que move foi chamado
      expect(mockMouse.move).toHaveBeenCalled();
      // Verificar que click foi chamado
      expect(mockMouse.click).toHaveBeenCalledWith(mockButton.RIGHT);

      global.setTimeout = originalSetTimeout;
    });

    it('should move to position and then double click', async () => {
      const { MouseButton } = require('../../../../../src/domain/entities/mouse-action');
      mockMouse.getPosition.mockResolvedValue({ x: 0, y: 0 });

      const originalSetTimeout = global.setTimeout;
      global.setTimeout = jest.fn((callback) => {
        callback();
        return 1;
      }) as any;

      await adapter.clickAt({ x: 150, y: 250 }, MouseButton.LEFT, true);

      expect(mockMouse.doubleClick).toHaveBeenCalledWith(mockButton.LEFT);

      global.setTimeout = originalSetTimeout;
    });
  });

  describe('drag', () => {
    it('should perform drag operation from one point to another', async () => {
      mockMouse.getPosition.mockResolvedValue({ x: 0, y: 0 });

      const originalSetTimeout = global.setTimeout;
      global.setTimeout = jest.fn((callback) => {
        callback();
        return 1;
      }) as any;

      await adapter.drag({ x: 100, y: 100 }, { x: 200, y: 200 }, 900);

      // Verificar sequência de operações
      expect(mockMouse.move).toHaveBeenCalled();
      expect(mockMouse.pressButton).toHaveBeenCalledWith(mockButton.LEFT);
      expect(mockMouse.releaseButton).toHaveBeenCalledWith(mockButton.LEFT);

      // Verificar que pressButton foi chamado antes de releaseButton
      const pressOrder = mockMouse.pressButton.mock.invocationCallOrder[0];
      const releaseOrder = mockMouse.releaseButton.mock.invocationCallOrder[0];
      expect(pressOrder).toBeLessThan(releaseOrder);

      global.setTimeout = originalSetTimeout;
    });
  });

  describe('scroll', () => {
    it('should scroll up with negative amount', async () => {
      await adapter.scroll('up', 5);

      expect(mockMouse.scrollDown).toHaveBeenCalledWith(-5);
    });

    it('should scroll down with positive amount', async () => {
      await adapter.scroll('down', 10);

      expect(mockMouse.scrollDown).toHaveBeenCalledWith(10);
    });

    it('should handle zero scroll amount', async () => {
      await adapter.scroll('up', 0);

      expect(mockMouse.scrollDown).toHaveBeenCalledWith(-0);
    });
  });

  describe('getPosition', () => {
    it('should return current mouse position', async () => {
      mockMouse.getPosition.mockResolvedValue({ x: 500, y: 600 });

      const position = await adapter.getPosition();

      expect(position).toEqual({ x: 500, y: 600 });
      expect(mockMouse.getPosition).toHaveBeenCalled();
    });

    it('should handle different position values', async () => {
      mockMouse.getPosition.mockResolvedValue({ x: 0, y: 0 });

      const position = await adapter.getPosition();

      expect(position).toEqual({ x: 0, y: 0 });
    });
  });

  describe('delay', () => {
    it('should wait for specified milliseconds', async () => {
      // Testar o método privado delay através do move suave
      const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
      mockMouse.getPosition.mockResolvedValue({ x: 0, y: 0 });

      const originalSetTimeout = global.setTimeout;
      global.setTimeout = jest.fn((callback) => {
        callback();
        return 1;
      }) as any;

      await adapter.move({ x: 50, y: 50 }, true, 200);

      // Verificar que setTimeout foi chamado
      expect(global.setTimeout).toHaveBeenCalled();

      global.setTimeout = originalSetTimeout;
      setTimeoutSpy.mockRestore();
    });
  });

  describe('edge cases', () => {
    it('should handle move to same position', async () => {
      mockMouse.getPosition.mockResolvedValue({ x: 100, y: 100 });

      const originalSetTimeout = global.setTimeout;
      global.setTimeout = jest.fn((callback) => {
        callback();
        return 1;
      }) as any;

      await adapter.move({ x: 100, y: 100 }, true, 100);

      // Ainda deve executar o movimento
      expect(mockMouse.move).toHaveBeenCalled();

      global.setTimeout = originalSetTimeout;
    });

    it('should handle very short duration', async () => {
      mockMouse.getPosition.mockResolvedValue({ x: 0, y: 0 });

      await adapter.move({ x: 200, y: 200 }, true, 1);

      // Deve ter pelo menos 1 movimento
      expect(mockMouse.move).toHaveBeenCalledTimes(1);
    });

    it('should handle negative coordinates', async () => {
      mockMouse.getPosition.mockResolvedValue({ x: 0, y: 0 });

      const originalSetTimeout = global.setTimeout;
      global.setTimeout = jest.fn((callback) => {
        callback();
        return 1;
      }) as any;

      await adapter.move({ x: -50, y: -50 }, true, 100);

      expect(mockMouse.move).toHaveBeenCalled();

      global.setTimeout = originalSetTimeout;
    });

    it('should handle large coordinate values', async () => {
      await adapter.move({ x: 5000, y: 3000 }, false, 100);

      expect(mockMouse.move).toHaveBeenCalledWith(expect.objectContaining({ x: 5000, y: 3000 }));
    });

    it('should handle fractional durations', async () => {
      mockMouse.getPosition.mockResolvedValue({ x: 0, y: 0 });

      await adapter.move({ x: 50, y: 50 }, true, 16.67); // ~1 frame at 60fps

      expect(mockMouse.move).toHaveBeenCalledTimes(1);
    });
  });

  describe('button mapping', () => {
    it('should map all mouse buttons correctly', async () => {
      const { MouseButton } = require('../../../../../src/domain/entities/mouse-action');

      // Testar mapeamento através do método click
      await adapter.click(MouseButton.LEFT, false);
      expect(mockMouse.click).toHaveBeenCalledWith(0);

      await adapter.click(MouseButton.RIGHT, false);
      expect(mockMouse.click).toHaveBeenCalledWith(2);

      await adapter.click(MouseButton.MIDDLE, false);
      expect(mockMouse.click).toHaveBeenCalledWith(1);
    });
  });

  describe('coverage edge cases', () => {
    it('should handle all code paths in move method', async () => {
      // Testar movimento instantâneo e suave em sequência
      await adapter.move({ x: 100, y: 100 }, false, 500);
      expect(mockMouse.config.mouseSpeed).toBe(10000);

      mockMouse.getPosition.mockResolvedValue({ x: 100, y: 100 });
      const originalSetTimeout = global.setTimeout;
      global.setTimeout = jest.fn((callback) => {
        callback();
        return 1;
      }) as any;

      await adapter.move({ x: 200, y: 200 }, true, 50);
      expect(mockMouse.move).toHaveBeenCalled();

      global.setTimeout = originalSetTimeout;
    });

    it('should cover all clickAt scenarios', async () => {
      const { MouseButton } = require('../../../../../src/domain/entities/mouse-action');
      mockMouse.getPosition.mockResolvedValue({ x: 50, y: 50 });

      const originalSetTimeout = global.setTimeout;
      global.setTimeout = jest.fn((callback) => {
        callback();
        return 1;
      }) as any;

      // Testar com diferentes botões e modos
      await adapter.clickAt({ x: 100, y: 100 }, MouseButton.MIDDLE, false);
      expect(mockMouse.click).toHaveBeenCalledWith(mockButton.MIDDLE);

      await adapter.clickAt({ x: 200, y: 200 }, MouseButton.RIGHT, true);
      expect(mockMouse.doubleClick).toHaveBeenCalledWith(mockButton.RIGHT);

      global.setTimeout = originalSetTimeout;
    });

    it('should cover drag method completely', async () => {
      mockMouse.getPosition.mockResolvedValue({ x: 10, y: 10 });

      const originalSetTimeout = global.setTimeout;
      global.setTimeout = jest.fn((callback) => {
        callback();
        return 1;
      }) as any;

      await adapter.drag({ x: 10, y: 10 }, { x: 300, y: 300 }, 600);

      // Verificar todas as chamadas esperadas
      expect(mockMouse.move).toHaveBeenCalled();
      expect(mockMouse.pressButton).toHaveBeenCalledTimes(1);
      expect(mockMouse.releaseButton).toHaveBeenCalledTimes(1);

      global.setTimeout = originalSetTimeout;
    });
  });
});
