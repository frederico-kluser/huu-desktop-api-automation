// Mock de bibliotecas antes dos imports
jest.mock('pino', () => ({
  __esModule: true,
  default: () => ({
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  }),
}));

// Usando require para contornar verbatimModuleSyntax
const {
  MouseAction,
  MouseButton,
  Point,
  MouseMoveOptions,
  MouseClickOptions,
} = require('../../../src/domain/entities/mouse-action');

describe('mouse-action', () => {
  describe('MouseAction class', () => {
    test('constructor creates instance correctly', () => {
      const action = new MouseAction('move', { x: 10, y: 20 }, { smooth: true });
      expect(action.type).toBe('move');
      expect(action.position).toEqual({ x: 10, y: 20 });
      expect(action.options).toEqual({ smooth: true });
    });

    test('constructor works with all type variations', () => {
      const actions = [
        new MouseAction('move'),
        new MouseAction('click'),
        new MouseAction('drag'),
        new MouseAction('scroll'),
      ];

      expect(actions[0].type).toBe('move');
      expect(actions[1].type).toBe('click');
      expect(actions[2].type).toBe('drag');
      expect(actions[3].type).toBe('scroll');
    });

    test('constructor works with optional parameters', () => {
      const action1 = new MouseAction('click');
      expect(action1.position).toBeUndefined();
      expect(action1.options).toBeUndefined();

      const action2 = new MouseAction('click', { x: 1, y: 2 });
      expect(action2.position).toEqual({ x: 1, y: 2 });
      expect(action2.options).toBeUndefined();
    });
  });

  describe('static methods', () => {
    test('move creates move action', () => {
      const action = MouseAction.move(100, 200);
      expect(action.type).toBe('move');
      expect(action.position).toEqual({ x: 100, y: 200 });
      expect(action.options).toBeUndefined();
    });

    test('move with options', () => {
      const action = MouseAction.move(50, 75, { smooth: true, duration: 1000 });
      expect(action.type).toBe('move');
      expect(action.position).toEqual({ x: 50, y: 75 });
      expect(action.options).toEqual({ smooth: true, duration: 1000 });
    });

    test('click creates click action', () => {
      const action = MouseAction.click();
      expect(action.type).toBe('click');
      expect(action.position).toBeUndefined();
      expect(action.options).toBeUndefined();
    });

    test('click with position', () => {
      const action = MouseAction.click({ x: 10, y: 20 });
      expect(action.type).toBe('click');
      expect(action.position).toEqual({ x: 10, y: 20 });
      expect(action.options).toBeUndefined();
    });

    test('click with position and options', () => {
      const action = MouseAction.click(
        { x: 30, y: 40 },
        { button: MouseButton.RIGHT, doubleClick: true },
      );
      expect(action.type).toBe('click');
      expect(action.position).toEqual({ x: 30, y: 40 });
      expect(action.options).toEqual({ button: MouseButton.RIGHT, doubleClick: true });
    });

    test('drag creates drag action', () => {
      const from = { x: 0, y: 0 };
      const to = { x: 100, y: 100 };
      const action = MouseAction.drag(from, to);
      expect(action.type).toBe('drag');
      expect(action.position).toEqual(from);
      expect(action.options).toEqual({ to });
    });

    test('scroll creates scroll action', () => {
      const action = MouseAction.scroll('up', 5);
      expect(action.type).toBe('scroll');
      expect(action.position).toBeUndefined();
      expect(action.options).toEqual({ direction: 'up', amount: 5 });
    });

    test('scroll with down direction', () => {
      const action = MouseAction.scroll('down', 10);
      expect(action.type).toBe('scroll');
      expect(action.position).toBeUndefined();
      expect(action.options).toEqual({ direction: 'down', amount: 10 });
    });
  });

  describe('MouseButton enum', () => {
    test('has correct values', () => {
      expect(MouseButton.LEFT).toBe('left');
      expect(MouseButton.RIGHT).toBe('right');
      expect(MouseButton.MIDDLE).toBe('middle');
    });
  });

  describe('interfaces usage', () => {
    test('Point interface works correctly', () => {
      const point = { x: 10, y: 20 };
      const action = new MouseAction('move', point);
      expect(action.position).toEqual(point);
    });

    test('MouseMoveOptions interface works correctly', () => {
      const options = { smooth: true, duration: 500 };
      const action = new MouseAction('move', { x: 0, y: 0 }, options);
      expect(action.options).toEqual(options);
    });

    test('MouseClickOptions interface works correctly', () => {
      const options = { button: MouseButton.LEFT, doubleClick: true };
      const action = new MouseAction('click', { x: 0, y: 0 }, options);
      expect(action.options).toEqual(options);
    });
  });
});
