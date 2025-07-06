// Mock do módulo @nut-tree-fork/nut-js
const mockKeyboard = {
  type: jest.fn(),
  pressKey: jest.fn(),
  releaseKey: jest.fn(),
  config: {
    autoDelayMs: 0,
  },
};

const Key = {
  Enter: 'Enter',
  Tab: 'Tab',
  Escape: 'Escape',
  Space: 'Space',
  Backspace: 'Backspace',
  Delete: 'Delete',
  Up: 'Up',
  Down: 'Down',
  Left: 'Left',
  Right: 'Right',
  Home: 'Home',
  End: 'End',
  PageUp: 'PageUp',
  PageDown: 'PageDown',
  F1: 'F1',
  F2: 'F2',
  F3: 'F3',
  F4: 'F4',
  F5: 'F5',
  F6: 'F6',
  F7: 'F7',
  F8: 'F8',
  F9: 'F9',
  F10: 'F10',
  F11: 'F11',
  F12: 'F12',
  LeftControl: 'LeftControl',
  LeftAlt: 'LeftAlt',
  LeftShift: 'LeftShift',
  LeftSuper: 'LeftSuper',
  A: 'A',
  C: 'C',
  V: 'V',
  X: 'X',
  Z: 'Z',
  Y: 'Y',
};

jest.mock('@nut-tree-fork/nut-js', () => ({
  keyboard: mockKeyboard,
  Key,
}));

jest.mock('tsyringe', () => ({
  injectable: () => (target: any) => target,
}));

// Importar após os mocks
const {
  NutJSKeyboardAdapter,
} = require('../../../../../src/infrastructure/adapters/nutjs/nutjs-keyboard.adapter');

describe('NutJSKeyboardAdapter', () => {
  let adapter: any;

  beforeEach(() => {
    jest.clearAllMocks();
    adapter = new NutJSKeyboardAdapter();
  });

  describe('type', () => {
    it('should type text successfully', async () => {
      mockKeyboard.type.mockResolvedValueOnce(undefined);

      await adapter.type('Hello World');

      expect(mockKeyboard.type).toHaveBeenCalledWith('Hello World');
    });

    it('should throw error when typing fails', async () => {
      mockKeyboard.type.mockRejectedValueOnce(new Error('Keyboard error'));

      await expect(adapter.type('test')).rejects.toThrow('Failed to type text: Keyboard error');
    });

    it('should handle non-Error thrown values', async () => {
      mockKeyboard.type.mockRejectedValueOnce('string error');

      await expect(adapter.type('test')).rejects.toThrow('Failed to type text: Unknown error');
    });
  });

  describe('pressKey', () => {
    const testCases = [
      'enter',
      'tab',
      'escape',
      'space',
      'backspace',
      'delete',
      'up',
      'down',
      'left',
      'right',
      'home',
      'end',
      'pageup',
      'pagedown',
      'f1',
      'f2',
      'f3',
      'f4',
      'f5',
      'f6',
      'f7',
      'f8',
      'f9',
      'f10',
      'f11',
      'f12',
    ];

    test.each(testCases)('should press %s key successfully', async (key) => {
      mockKeyboard.pressKey.mockResolvedValueOnce(undefined);

      await adapter.pressKey(key);

      expect(mockKeyboard.pressKey).toHaveBeenCalled();
    });

    it('should handle uppercase key names', async () => {
      mockKeyboard.pressKey.mockResolvedValueOnce(undefined);

      await adapter.pressKey('ENTER');

      expect(mockKeyboard.pressKey).toHaveBeenCalledWith(Key.Enter);
    });

    it('should throw error for unsupported key', async () => {
      await expect(adapter.pressKey('unsupported')).rejects.toThrow(
        "Failed to press key 'unsupported': Unsupported key: unsupported",
      );
    });

    it('should throw error when pressKey fails', async () => {
      mockKeyboard.pressKey.mockRejectedValueOnce(new Error('Press error'));

      await expect(adapter.pressKey('enter')).rejects.toThrow(
        "Failed to press key 'enter': Press error",
      );
    });

    it('should handle non-Error thrown values', async () => {
      mockKeyboard.pressKey.mockRejectedValueOnce('string error');

      await expect(adapter.pressKey('enter')).rejects.toThrow(
        "Failed to press key 'enter': Unknown error",
      );
    });
  });

  describe('releaseKey', () => {
    const testCases = [
      'enter',
      'tab',
      'escape',
      'space',
      'backspace',
      'delete',
      'up',
      'down',
      'left',
      'right',
      'home',
      'end',
      'pageup',
      'pagedown',
      'f1',
      'f2',
      'f3',
      'f4',
      'f5',
      'f6',
      'f7',
      'f8',
      'f9',
      'f10',
      'f11',
      'f12',
    ];

    test.each(testCases)('should release %s key successfully', async (key) => {
      mockKeyboard.releaseKey.mockResolvedValueOnce(undefined);

      await adapter.releaseKey(key);

      expect(mockKeyboard.releaseKey).toHaveBeenCalled();
    });

    it('should handle uppercase key names', async () => {
      mockKeyboard.releaseKey.mockResolvedValueOnce(undefined);

      await adapter.releaseKey('TAB');

      expect(mockKeyboard.releaseKey).toHaveBeenCalledWith(Key.Tab);
    });

    it('should throw error for unsupported key', async () => {
      await expect(adapter.releaseKey('invalid')).rejects.toThrow(
        "Failed to release key 'invalid': Unsupported key: invalid",
      );
    });

    it('should throw error when releaseKey fails', async () => {
      mockKeyboard.releaseKey.mockRejectedValueOnce(new Error('Release error'));

      await expect(adapter.releaseKey('tab')).rejects.toThrow(
        "Failed to release key 'tab': Release error",
      );
    });

    it('should handle non-Error thrown values', async () => {
      mockKeyboard.releaseKey.mockRejectedValueOnce(123);

      await expect(adapter.releaseKey('tab')).rejects.toThrow(
        "Failed to release key 'tab': Unknown error",
      );
    });
  });

  describe('combination', () => {
    it('should perform key combination successfully', async () => {
      mockKeyboard.pressKey.mockResolvedValue(undefined);
      mockKeyboard.releaseKey.mockResolvedValue(undefined);

      await adapter.combination(['ctrl', 'c']);

      expect(mockKeyboard.pressKey).toHaveBeenCalledTimes(2);
      expect(mockKeyboard.pressKey).toHaveBeenNthCalledWith(1, Key.LeftControl);
      expect(mockKeyboard.pressKey).toHaveBeenNthCalledWith(2, Key.C);

      expect(mockKeyboard.releaseKey).toHaveBeenCalledTimes(2);
      expect(mockKeyboard.releaseKey).toHaveBeenNthCalledWith(1, Key.C);
      expect(mockKeyboard.releaseKey).toHaveBeenNthCalledWith(2, Key.LeftControl);
    });

    it('should handle various modifier keys', async () => {
      mockKeyboard.pressKey.mockResolvedValue(undefined);
      mockKeyboard.releaseKey.mockResolvedValue(undefined);

      const modifierCombos = [
        ['control', 'v'],
        ['alt', 'a'],
        ['shift', 'a'],
        ['cmd', 'x'],
        ['command', 'z'],
        ['meta', 'y'],
        ['win', 'a'],
      ];

      for (const combo of modifierCombos) {
        mockKeyboard.pressKey.mockClear();
        mockKeyboard.releaseKey.mockClear();

        await adapter.combination(combo);

        expect(mockKeyboard.pressKey).toHaveBeenCalledTimes(2);
        expect(mockKeyboard.releaseKey).toHaveBeenCalledTimes(2);
      }
    });

    it('should handle uppercase keys in combination', async () => {
      mockKeyboard.pressKey.mockResolvedValue(undefined);
      mockKeyboard.releaseKey.mockResolvedValue(undefined);

      await adapter.combination(['CTRL', 'V']);

      expect(mockKeyboard.pressKey).toHaveBeenCalledWith(Key.LeftControl);
      expect(mockKeyboard.pressKey).toHaveBeenCalledWith(Key.V);
    });

    it('should throw error for unsupported key in combination', async () => {
      await expect(adapter.combination(['ctrl', 'invalid'])).rejects.toThrow(
        'Failed to perform key combination: Unsupported key in combination: invalid',
      );
    });

    it('should throw error when pressKey fails in combination', async () => {
      mockKeyboard.pressKey.mockRejectedValueOnce(new Error('Press failed'));

      await expect(adapter.combination(['ctrl', 'c'])).rejects.toThrow(
        'Failed to perform key combination: Press failed',
      );
    });

    it('should throw error when releaseKey fails in combination', async () => {
      mockKeyboard.pressKey.mockResolvedValue(undefined);
      mockKeyboard.releaseKey.mockRejectedValueOnce(new Error('Release failed'));

      await expect(adapter.combination(['ctrl', 'c'])).rejects.toThrow(
        'Failed to perform key combination: Release failed',
      );
    });

    it('should handle non-Error thrown values in combination', async () => {
      mockKeyboard.pressKey.mockRejectedValueOnce({ error: 'object error' });

      await expect(adapter.combination(['ctrl', 'c'])).rejects.toThrow(
        'Failed to perform key combination: Unknown error',
      );
    });

    it('should handle single key combination', async () => {
      mockKeyboard.pressKey.mockResolvedValue(undefined);
      mockKeyboard.releaseKey.mockResolvedValue(undefined);

      await adapter.combination(['a']);

      expect(mockKeyboard.pressKey).toHaveBeenCalledTimes(1);
      expect(mockKeyboard.pressKey).toHaveBeenCalledWith(Key.A);
      expect(mockKeyboard.releaseKey).toHaveBeenCalledTimes(1);
      expect(mockKeyboard.releaseKey).toHaveBeenCalledWith(Key.A);
    });

    it('should handle three key combination', async () => {
      mockKeyboard.pressKey.mockResolvedValue(undefined);
      mockKeyboard.releaseKey.mockResolvedValue(undefined);

      await adapter.combination(['ctrl', 'shift', 'a']);

      expect(mockKeyboard.pressKey).toHaveBeenCalledTimes(3);
      expect(mockKeyboard.releaseKey).toHaveBeenCalledTimes(3);

      // Verifica ordem reversa na liberação
      expect(mockKeyboard.releaseKey).toHaveBeenNthCalledWith(1, Key.A);
      expect(mockKeyboard.releaseKey).toHaveBeenNthCalledWith(2, Key.LeftShift);
      expect(mockKeyboard.releaseKey).toHaveBeenNthCalledWith(3, Key.LeftControl);
    });

    it('should handle empty combination array', async () => {
      await adapter.combination([]);

      expect(mockKeyboard.pressKey).not.toHaveBeenCalled();
      expect(mockKeyboard.releaseKey).not.toHaveBeenCalled();
    });
  });

  describe('delay', () => {
    let setTimeoutSpy: jest.SpyInstance;

    beforeEach(() => {
      jest.useFakeTimers();
      setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    });

    afterEach(() => {
      setTimeoutSpy.mockRestore();
      jest.useRealTimers();
    });

    it('should delay for specified milliseconds', async () => {
      const delayPromise = adapter.delay(1000);

      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 1000);

      jest.runAllTimers();

      await delayPromise;
    });

    it('should handle zero delay', async () => {
      const delayPromise = adapter.delay(0);

      jest.runAllTimers();

      await delayPromise;

      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 0);
    });

    it('should handle negative delay', async () => {
      const delayPromise = adapter.delay(-100);

      jest.runAllTimers();

      await delayPromise;

      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), -100);
    });
  });
});
