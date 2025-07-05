// Mock de @nut-tree-fork/nut-js
jest.mock('@nut-tree-fork/nut-js', () => ({
  screen: {
    width: jest.fn().mockResolvedValue(1920),
    height: jest.fn().mockResolvedValue(1080),
  },
}));

// Mock do pino logger antes de qualquer import
jest.mock('pino', () => {
  return jest.fn(() => ({
    debug: jest.fn(),
    info: jest.fn(),
    error: jest.fn(),
  }));
});

// Mock do environment
jest.mock('../../../src/config/environment', () => ({
  environment: {
    logLevel: 'info',
    nodeEnv: 'test',
  },
}));

// Mock do setTimeout para evitar timeouts
global.setTimeout = jest.fn((fn: any) => fn()) as any;

import 'reflect-metadata';
import { container } from 'tsyringe';

const { MouseService } = require('../../../src/application/services/mouse.service');
const { MouseButton } = require('../../../src/domain/entities/mouse-action');
const { EventDispatcher } = require('../../../src/application/services/event-dispatcher.service');

describe('MouseService', () => {
  let mouseService: any;
  let mockMouseAdapter: any;
  let mockEventDispatcher: any;

  beforeEach(() => {
    // Clear container
    container.reset();

    mockMouseAdapter = {
      move: jest.fn().mockResolvedValue(undefined),
      click: jest.fn().mockResolvedValue(undefined),
      clickAt: jest.fn().mockResolvedValue(undefined),
      drag: jest.fn().mockResolvedValue(undefined),
      scroll: jest.fn().mockResolvedValue(undefined),
      getPosition: jest.fn().mockResolvedValue({ x: 100, y: 200 }),
    };

    mockEventDispatcher = {
      dispatch: jest.fn(),
    };

    // Register mock dependencies
    container.register('MouseAdapter', { useValue: mockMouseAdapter });
    container.register(EventDispatcher, { useValue: mockEventDispatcher });

    mouseService = container.resolve(MouseService);
  });

  describe('move', () => {
    test('moves mouse to valid coordinates with default smooth and duration', async () => {
      await mouseService.move({ x: 500, y: 300 });
      expect(mockMouseAdapter.move).toHaveBeenCalledWith({ x: 500, y: 300 }, true, 1000);
    });

    test('moves mouse with custom smooth and duration', async () => {
      await mouseService.move({ x: 500, y: 300, smooth: false, duration: 500 });
      expect(mockMouseAdapter.move).toHaveBeenCalledWith({ x: 500, y: 300 }, false, 500);
    });

    test('throws error for invalid X coordinate (negative)', async () => {
      await expect(mouseService.move({ x: -1, y: 500 })).rejects.toThrow(
        'Invalid X coordinate: -1',
      );
    });

    test('throws error for invalid X coordinate (too large)', async () => {
      await expect(mouseService.move({ x: 1920, y: 500 })).rejects.toThrow(
        'Invalid X coordinate: 1920',
      );
    });

    test('throws error for invalid Y coordinate (negative)', async () => {
      await expect(mouseService.move({ x: 500, y: -1 })).rejects.toThrow(
        'Invalid Y coordinate: -1',
      );
    });

    test('throws error for invalid Y coordinate (too large)', async () => {
      await expect(mouseService.move({ x: 500, y: 1080 })).rejects.toThrow(
        'Invalid Y coordinate: 1080',
      );
    });

    test('logs and rethrows adapter errors', async () => {
      const error = new Error('Adapter error');
      mockMouseAdapter.move.mockRejectedValue(error);
      await expect(mouseService.move({ x: 500, y: 300 })).rejects.toThrow('Adapter error');
    });
  });

  describe('click', () => {
    test('clicks at specific coordinates with defaults', async () => {
      await mouseService.click({ x: 500, y: 300 });
      expect(mockMouseAdapter.move).toHaveBeenCalledWith({ x: 500, y: 300 }, true, 1000);
      expect(mockMouseAdapter.clickAt).toHaveBeenCalledWith(
        { x: 500, y: 300 },
        MouseButton.LEFT,
        false,
      );
      expect(mockEventDispatcher.dispatch).toHaveBeenCalledTimes(2);
    });

    test('clicks at specific coordinates without smooth movement', async () => {
      await mouseService.click({ x: 500, y: 300, smooth: false });
      expect(mockMouseAdapter.move).not.toHaveBeenCalled();
      expect(mockMouseAdapter.clickAt).toHaveBeenCalledWith(
        { x: 500, y: 300 },
        MouseButton.LEFT,
        false,
      );
    });

    test('double clicks with right button', async () => {
      await mouseService.click({ x: 500, y: 300, button: MouseButton.RIGHT, doubleClick: true });
      expect(mockMouseAdapter.clickAt).toHaveBeenCalledWith(
        { x: 500, y: 300 },
        MouseButton.RIGHT,
        true,
      );
    });

    test('clicks at current position when no coordinates provided', async () => {
      await mouseService.click({});
      expect(mockMouseAdapter.getPosition).toHaveBeenCalled();
      expect(mockMouseAdapter.click).toHaveBeenCalledWith(MouseButton.LEFT, false);
      expect(mockEventDispatcher.dispatch).toHaveBeenCalledTimes(2);
    });

    test('validates coordinates before clicking', async () => {
      await expect(mouseService.click({ x: -1, y: 500 })).rejects.toThrow(
        'Invalid X coordinate: -1',
      );
    });

    test('handles all mouse buttons', async () => {
      const buttons = [MouseButton.LEFT, MouseButton.MIDDLE, MouseButton.RIGHT];
      for (const button of buttons) {
        await mouseService.click({ button });
        expect(mockMouseAdapter.click).toHaveBeenCalledWith(button, false);
      }
    });

    test('dispatches events with correct data structure', async () => {
      await mouseService.click({ x: 500, y: 300, button: MouseButton.MIDDLE });

      expect(mockEventDispatcher.dispatch).toHaveBeenCalledWith({
        id: '',
        type: 'mouse',
        timestamp: expect.any(Number),
        cursorX: 500,
        cursorY: 300,
        data: {
          action: 'click',
          x: 500,
          y: 300,
          button: MouseButton.MIDDLE,
        },
      });

      expect(mockEventDispatcher.dispatch).toHaveBeenCalledWith({
        id: '',
        type: 'mouse',
        timestamp: expect.any(Number),
        cursorX: 500,
        cursorY: 300,
        data: {
          action: 'release',
          x: 500,
          y: 300,
          button: MouseButton.MIDDLE,
        },
      });
    });

    test('uses custom duration for smooth movement', async () => {
      await mouseService.click({ x: 500, y: 300, duration: 2000 });
      expect(mockMouseAdapter.move).toHaveBeenCalledWith({ x: 500, y: 300 }, true, 2000);
    });
  });

  describe('drag', () => {
    test('drags with default duration and smooth', async () => {
      const from = { x: 100, y: 100 };
      const to = { x: 500, y: 500 };
      await mouseService.drag({ from, to });
      expect(mockMouseAdapter.move).toHaveBeenCalledWith(from, true, expect.closeTo(333.33, 1));
      expect(mockMouseAdapter.drag).toHaveBeenCalledWith(from, to, 1000);
    });

    test('drags without smooth movement', async () => {
      const from = { x: 100, y: 100 };
      const to = { x: 500, y: 500 };
      await mouseService.drag({ from, to, smooth: false });
      expect(mockMouseAdapter.move).not.toHaveBeenCalled();
      expect(mockMouseAdapter.drag).toHaveBeenCalledWith(from, to, 1000);
    });

    test('validates from coordinates', async () => {
      const from = { x: -1, y: 100 };
      const to = { x: 500, y: 500 };
      await expect(mouseService.drag({ from, to })).rejects.toThrow('Invalid X coordinate: -1');
    });

    test('validates to coordinates', async () => {
      const from = { x: 100, y: 100 };
      const to = { x: 500, y: 1080 };
      await expect(mouseService.drag({ from, to })).rejects.toThrow('Invalid Y coordinate: 1080');
    });

    test('logs and rethrows adapter errors', async () => {
      const error = new Error('Drag error');
      mockMouseAdapter.drag.mockRejectedValue(error);
      const from = { x: 100, y: 100 };
      const to = { x: 500, y: 500 };
      await expect(mouseService.drag({ from, to })).rejects.toThrow('Drag error');
    });

    test('uses custom duration for drag', async () => {
      const from = { x: 100, y: 100 };
      const to = { x: 500, y: 500 };
      await mouseService.drag({ from, to, duration: 3000 });
      expect(mockMouseAdapter.move).toHaveBeenCalledWith(from, true, 1000);
      expect(mockMouseAdapter.drag).toHaveBeenCalledWith(from, to, 3000);
    });
  });

  describe('scroll', () => {
    test('scrolls with default amount and smooth', async () => {
      await mouseService.scroll({ direction: 'up' });
      expect(mockMouseAdapter.scroll).toHaveBeenCalledWith('up', 0.1);
    });

    test('scrolls down with custom amount', async () => {
      await mouseService.scroll({ direction: 'down', amount: 5 });
      expect(mockMouseAdapter.scroll).toHaveBeenCalledWith('down', expect.any(Number));
    });

    test('scrolls instantly when smooth is false', async () => {
      await mouseService.scroll({ direction: 'up', smooth: false });
      expect(mockMouseAdapter.scroll).toHaveBeenCalledWith('up', 3);
      expect(mockMouseAdapter.scroll).toHaveBeenCalledTimes(1);
    });

    test('scrolls instantly when duration is 0', async () => {
      await mouseService.scroll({ direction: 'down', duration: 0 });
      expect(mockMouseAdapter.scroll).toHaveBeenCalledWith('down', 3);
      expect(mockMouseAdapter.scroll).toHaveBeenCalledTimes(1);
    });

    test('logs and rethrows adapter errors', async () => {
      const error = new Error('Scroll error');
      mockMouseAdapter.scroll.mockRejectedValue(error);
      await expect(mouseService.scroll({ direction: 'up' })).rejects.toThrow('Scroll error');
    });

    test('calculates correct step amount for smooth scrolling', async () => {
      await mouseService.scroll({ direction: 'up', amount: 10, duration: 100 });
      const calls = mockMouseAdapter.scroll.mock.calls;
      expect(calls.length).toBeGreaterThan(0);
      const totalAmount = calls.reduce((sum: number, call: any[]) => sum + call[1], 0);
      expect(totalAmount).toBeCloseTo(10, 1);
    });

    test('handles scroll with 1 step for very short durations', async () => {
      await mouseService.scroll({ direction: 'down', amount: 5, duration: 10 });
      expect(mockMouseAdapter.scroll).toHaveBeenCalledTimes(1);
      expect(mockMouseAdapter.scroll).toHaveBeenCalledWith('down', 5);
    });

    test('does not call setTimeout on last iteration', async () => {
      const setTimeoutSpy = global.setTimeout as unknown as jest.Mock;
      setTimeoutSpy.mockClear();

      await mouseService.scroll({ direction: 'up', amount: 6, duration: 100 });

      const steps = Math.max(1, Math.floor((100 * 30) / 1000));
      expect(setTimeoutSpy).toHaveBeenCalledTimes(steps - 1);
    });
  });

  describe('getPosition', () => {
    test('returns current mouse position', async () => {
      const position = await mouseService.getPosition();
      expect(position).toEqual({ x: 100, y: 200 });
      expect(mockMouseAdapter.getPosition).toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    test('handles boundary coordinates', async () => {
      await mouseService.move({ x: 0, y: 0 });
      expect(mockMouseAdapter.move).toHaveBeenCalledWith({ x: 0, y: 0 }, true, 1000);

      await mouseService.move({ x: 1919, y: 1079 });
      expect(mockMouseAdapter.move).toHaveBeenCalledWith({ x: 1919, y: 1079 }, true, 1000);
    });

    test('click with only y coordinate undefined', async () => {
      await mouseService.click({ x: 500 });
      expect(mockMouseAdapter.getPosition).toHaveBeenCalled();
      expect(mockMouseAdapter.click).toHaveBeenCalled();
    });

    test('click with only x coordinate undefined', async () => {
      await mouseService.click({ y: 300 });
      expect(mockMouseAdapter.getPosition).toHaveBeenCalled();
      expect(mockMouseAdapter.click).toHaveBeenCalled();
    });
  });
});
