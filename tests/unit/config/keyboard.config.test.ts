// Mock dotenv antes de qualquer import
jest.mock('dotenv', () => ({
  config: jest.fn()
}));

describe('keyboard.config', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    jest.resetModules();
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  describe('KeyboardConfig', () => {
    test('uses default values when env vars not set', () => {
      // Clear all keyboard env vars
      delete process.env.KEYBOARD_DEFAULT_MODE;
      delete process.env.KEYBOARD_MAX_TEXT_LENGTH;
      delete process.env.KEYBOARD_DEFAULT_DELAY_PER_CHAR;
      delete process.env.KEYBOARD_MAX_DELAY;
      delete process.env.KEYBOARD_BATCH_SIZE;
      delete process.env.KEYBOARD_DEBUG;

      const { KeyboardConfig } = require('../../../src/config/keyboard.config');

      expect(KeyboardConfig.defaultMode).toBe('instant');
      expect(KeyboardConfig.maxTextLength).toBe(10000);
      expect(KeyboardConfig.defaultDelayPerChar).toBe(0);
      expect(KeyboardConfig.maxDelay).toBe(300000);
      expect(KeyboardConfig.batchSize).toBe(50);
      expect(KeyboardConfig.debugMode).toBe(false);
    });

    test('uses custom values from env vars', () => {
      process.env.KEYBOARD_DEFAULT_MODE = 'perChar';
      process.env.KEYBOARD_MAX_TEXT_LENGTH = '5000';
      process.env.KEYBOARD_DEFAULT_DELAY_PER_CHAR = '100';
      process.env.KEYBOARD_MAX_DELAY = '150000';
      process.env.KEYBOARD_BATCH_SIZE = '25';
      process.env.KEYBOARD_DEBUG = 'true';

      const { KeyboardConfig } = require('../../../src/config/keyboard.config');

      expect(KeyboardConfig.defaultMode).toBe('perChar');
      expect(KeyboardConfig.maxTextLength).toBe(5000);
      expect(KeyboardConfig.defaultDelayPerChar).toBe(100);
      expect(KeyboardConfig.maxDelay).toBe(150000);
      expect(KeyboardConfig.batchSize).toBe(25);
      expect(KeyboardConfig.debugMode).toBe(true);
    });

    test('handles invalid parseInt values', () => {
      process.env.KEYBOARD_MAX_TEXT_LENGTH = 'invalid';
      process.env.KEYBOARD_DEFAULT_DELAY_PER_CHAR = 'not-a-number';
      process.env.KEYBOARD_MAX_DELAY = 'abc';
      process.env.KEYBOARD_BATCH_SIZE = '!@#';

      const { KeyboardConfig } = require('../../../src/config/keyboard.config');

      // parseInt returns NaN for invalid values
      expect(KeyboardConfig.maxTextLength).toBeNaN();
      expect(KeyboardConfig.defaultDelayPerChar).toBeNaN();
      expect(KeyboardConfig.maxDelay).toBeNaN();
      expect(KeyboardConfig.batchSize).toBeNaN();
    });

    test('handles edge case numeric values', () => {
      process.env.KEYBOARD_MAX_TEXT_LENGTH = '0';
      process.env.KEYBOARD_DEFAULT_DELAY_PER_CHAR = '-100';
      process.env.KEYBOARD_MAX_DELAY = '99999999';
      process.env.KEYBOARD_BATCH_SIZE = '0.5';

      const { KeyboardConfig } = require('../../../src/config/keyboard.config');

      expect(KeyboardConfig.maxTextLength).toBe(0);
      expect(KeyboardConfig.defaultDelayPerChar).toBe(-100);
      expect(KeyboardConfig.maxDelay).toBe(99999999);
      expect(KeyboardConfig.batchSize).toBe(0); // parseInt truncates decimals
    });

    test('handles debugMode variations', () => {
      // Test false cases
      const falseCases = ['false', 'FALSE', 'True', 'TRUE', '1', '0', '', undefined];
      falseCases.forEach(value => {
        jest.resetModules();
        if (value === undefined) {
          delete process.env.KEYBOARD_DEBUG;
        } else {
          process.env.KEYBOARD_DEBUG = value;
        }
        const { KeyboardConfig } = require('../../../src/config/keyboard.config');
        expect(KeyboardConfig.debugMode).toBe(false);
      });

      // Test true case
      jest.resetModules();
      process.env.KEYBOARD_DEBUG = 'true';
      const { KeyboardConfig } = require('../../../src/config/keyboard.config');
      expect(KeyboardConfig.debugMode).toBe(true);
    });
  });

  describe('validateKeyboardConfig', () => {
    test('validates successfully with valid default config', () => {
      delete process.env.KEYBOARD_DEFAULT_MODE;
      delete process.env.KEYBOARD_MAX_TEXT_LENGTH;
      delete process.env.KEYBOARD_DEFAULT_DELAY_PER_CHAR;
      delete process.env.KEYBOARD_MAX_DELAY;
      delete process.env.KEYBOARD_BATCH_SIZE;

      const { validateKeyboardConfig } = require('../../../src/config/keyboard.config');
      
      expect(() => validateKeyboardConfig()).not.toThrow();
    });

    test('throws for invalid maxTextLength - too low', () => {
      process.env.KEYBOARD_MAX_TEXT_LENGTH = '0';
      const { validateKeyboardConfig } = require('../../../src/config/keyboard.config');
      
      expect(() => validateKeyboardConfig()).toThrow('KEYBOARD_MAX_TEXT_LENGTH must be between 1 and 100000');
    });

    test('throws for invalid maxTextLength - too high', () => {
      process.env.KEYBOARD_MAX_TEXT_LENGTH = '100001';
      const { validateKeyboardConfig } = require('../../../src/config/keyboard.config');
      
      expect(() => validateKeyboardConfig()).toThrow('KEYBOARD_MAX_TEXT_LENGTH must be between 1 and 100000');
    });

    test('throws for negative defaultDelayPerChar', () => {
      process.env.KEYBOARD_DEFAULT_DELAY_PER_CHAR = '-1';
      const { validateKeyboardConfig } = require('../../../src/config/keyboard.config');
      
      expect(() => validateKeyboardConfig()).toThrow('KEYBOARD_DEFAULT_DELAY_PER_CHAR must be non-negative');
    });

    test('throws for invalid maxDelay - negative', () => {
      process.env.KEYBOARD_MAX_DELAY = '-1';
      const { validateKeyboardConfig } = require('../../../src/config/keyboard.config');
      
      expect(() => validateKeyboardConfig()).toThrow('KEYBOARD_MAX_DELAY must be between 0 and 3600000 (1 hour)');
    });

    test('throws for invalid maxDelay - too high', () => {
      process.env.KEYBOARD_MAX_DELAY = '3600001';
      const { validateKeyboardConfig } = require('../../../src/config/keyboard.config');
      
      expect(() => validateKeyboardConfig()).toThrow('KEYBOARD_MAX_DELAY must be between 0 and 3600000 (1 hour)');
    });

    test('throws for invalid batchSize - too low', () => {
      process.env.KEYBOARD_BATCH_SIZE = '0';
      const { validateKeyboardConfig } = require('../../../src/config/keyboard.config');
      
      expect(() => validateKeyboardConfig()).toThrow('KEYBOARD_BATCH_SIZE must be between 1 and 1000');
    });

    test('throws for invalid batchSize - too high', () => {
      process.env.KEYBOARD_BATCH_SIZE = '1001';
      const { validateKeyboardConfig } = require('../../../src/config/keyboard.config');
      
      expect(() => validateKeyboardConfig()).toThrow('KEYBOARD_BATCH_SIZE must be between 1 and 1000');
    });

    test('throws for invalid defaultMode', () => {
      process.env.KEYBOARD_DEFAULT_MODE = 'invalid';
      const { validateKeyboardConfig } = require('../../../src/config/keyboard.config');
      
      expect(() => validateKeyboardConfig()).toThrow('KEYBOARD_DEFAULT_MODE must be one of: instant, perChar, total');
    });

    test('accepts all valid modes', () => {
      const validModes = ['instant', 'perChar', 'total'];
      
      validModes.forEach(mode => {
        jest.resetModules();
        process.env.KEYBOARD_DEFAULT_MODE = mode;
        const { validateKeyboardConfig } = require('../../../src/config/keyboard.config');
        
        expect(() => validateKeyboardConfig()).not.toThrow();
      });
    });

    test('accepts NaN values without throwing', () => {
      // Based on know-how.txt: NaN passes numeric validations
      process.env.KEYBOARD_MAX_TEXT_LENGTH = 'not-a-number';
      process.env.KEYBOARD_DEFAULT_DELAY_PER_CHAR = 'invalid';
      process.env.KEYBOARD_MAX_DELAY = 'abc';
      process.env.KEYBOARD_BATCH_SIZE = '!@#';

      const { validateKeyboardConfig } = require('../../../src/config/keyboard.config');
      
      // NaN doesn't satisfy any error conditions (NaN < 1 = false, NaN > 100000 = false)
      expect(() => validateKeyboardConfig()).not.toThrow();
    });

    test('validates edge case values at boundaries', () => {
      // Test minimum valid values
      process.env.KEYBOARD_MAX_TEXT_LENGTH = '1';
      process.env.KEYBOARD_DEFAULT_DELAY_PER_CHAR = '0';
      process.env.KEYBOARD_MAX_DELAY = '0';
      process.env.KEYBOARD_BATCH_SIZE = '1';
      
      let { validateKeyboardConfig } = require('../../../src/config/keyboard.config');
      expect(() => validateKeyboardConfig()).not.toThrow();

      // Test maximum valid values
      jest.resetModules();
      process.env.KEYBOARD_MAX_TEXT_LENGTH = '100000';
      process.env.KEYBOARD_MAX_DELAY = '3600000';
      process.env.KEYBOARD_BATCH_SIZE = '1000';
      
      ({ validateKeyboardConfig } = require('../../../src/config/keyboard.config'));
      expect(() => validateKeyboardConfig()).not.toThrow();
    });
  });
});