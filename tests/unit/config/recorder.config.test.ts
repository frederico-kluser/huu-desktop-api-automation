// Mock dotenv antes de qualquer require
jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

describe('recorder.config', () => {
  const originalEnv = process.env;
  const originalConsoleLog = console.log;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    console.log = jest.fn();
  });

  afterEach(() => {
    process.env = originalEnv;
    console.log = originalConsoleLog;
  });

  describe('validateConfig', () => {
    test('returns default config when no env vars are set', () => {
      delete process.env.RECORDER_INCLUDE_SCREENSHOT;
      delete process.env.RECORDER_MOVE_INTERVAL_MS;
      delete process.env.RECORDER_MAX_SCREENSHOT_SIZE;
      delete process.env.NODE_ENV;

      const { recorderConfig } = require('../../../src/config/recorder.config');

      expect(recorderConfig).toEqual({
        includeScreenshot: true,
        moveIntervalMs: 50,
        maxScreenshotSize: 2097152,
      });
    });

    test('logs config in non-production environment', () => {
      process.env.NODE_ENV = 'development';

      const { recorderConfig } = require('../../../src/config/recorder.config');

      expect(console.log).toHaveBeenCalledWith('Recorder config:', recorderConfig);
    });

    test('does not log config in production environment', () => {
      process.env.NODE_ENV = 'production';

      require('../../../src/config/recorder.config');

      expect(console.log).not.toHaveBeenCalled();
    });

    test('handles RECORDER_INCLUDE_SCREENSHOT=false', () => {
      process.env.RECORDER_INCLUDE_SCREENSHOT = 'false';

      const { recorderConfig } = require('../../../src/config/recorder.config');

      expect(recorderConfig.includeScreenshot).toBe(false);
    });

    test('handles RECORDER_INCLUDE_SCREENSHOT with any other value', () => {
      process.env.RECORDER_INCLUDE_SCREENSHOT = 'true';

      const { recorderConfig } = require('../../../src/config/recorder.config');

      expect(recorderConfig.includeScreenshot).toBe(true);
    });

    test('handles valid RECORDER_MOVE_INTERVAL_MS values', () => {
      const validValues = ['20', '50', '100', '200'];

      validValues.forEach((value) => {
        jest.resetModules();
        process.env.RECORDER_MOVE_INTERVAL_MS = value;

        const { recorderConfig } = require('../../../src/config/recorder.config');

        expect(recorderConfig.moveIntervalMs).toBe(parseInt(value, 10));
      });
    });

    test('throws error for RECORDER_MOVE_INTERVAL_MS below minimum', () => {
      process.env.RECORDER_MOVE_INTERVAL_MS = '19';

      expect(() => {
        require('../../../src/config/recorder.config');
      }).toThrow('RECORDER_MOVE_INTERVAL_MS deve estar entre 20 e 200ms (valor: 19)');
    });

    test('throws error for RECORDER_MOVE_INTERVAL_MS above maximum', () => {
      process.env.RECORDER_MOVE_INTERVAL_MS = '201';

      expect(() => {
        require('../../../src/config/recorder.config');
      }).toThrow('RECORDER_MOVE_INTERVAL_MS deve estar entre 20 e 200ms (valor: 201)');
    });

    test('handles invalid RECORDER_MOVE_INTERVAL_MS (NaN)', () => {
      process.env.RECORDER_MOVE_INTERVAL_MS = 'invalid';

      // NaN doesn't fail the validation since NaN < 20 is false and NaN > 200 is also false
      const { recorderConfig } = require('../../../src/config/recorder.config');
      expect(recorderConfig.moveIntervalMs).toBeNaN();
    });

    test('handles valid RECORDER_MAX_SCREENSHOT_SIZE values', () => {
      const validValues = ['10240', '2097152', '10485760'];

      validValues.forEach((value) => {
        jest.resetModules();
        process.env.RECORDER_MAX_SCREENSHOT_SIZE = value;

        const { recorderConfig } = require('../../../src/config/recorder.config');

        expect(recorderConfig.maxScreenshotSize).toBe(parseInt(value, 10));
      });
    });

    test('throws error for RECORDER_MAX_SCREENSHOT_SIZE below minimum', () => {
      process.env.RECORDER_MAX_SCREENSHOT_SIZE = '10239';

      expect(() => {
        require('../../../src/config/recorder.config');
      }).toThrow('RECORDER_MAX_SCREENSHOT_SIZE deve estar entre 10KB e 10MB (valor: 10239)');
    });

    test('throws error for RECORDER_MAX_SCREENSHOT_SIZE above maximum', () => {
      process.env.RECORDER_MAX_SCREENSHOT_SIZE = '10485761';

      expect(() => {
        require('../../../src/config/recorder.config');
      }).toThrow('RECORDER_MAX_SCREENSHOT_SIZE deve estar entre 10KB e 10MB (valor: 10485761)');
    });

    test('handles invalid RECORDER_MAX_SCREENSHOT_SIZE (NaN)', () => {
      process.env.RECORDER_MAX_SCREENSHOT_SIZE = 'invalid';

      // NaN doesn't fail the validation since NaN < 10240 is false and NaN > 10485760 is also false
      const { recorderConfig } = require('../../../src/config/recorder.config');
      expect(recorderConfig.maxScreenshotSize).toBeNaN();
    });

    test('handles edge case values for intervals', () => {
      // Test minimum edge
      process.env.RECORDER_MOVE_INTERVAL_MS = '20';
      process.env.RECORDER_MAX_SCREENSHOT_SIZE = '10240';

      const config1 = require('../../../src/config/recorder.config').recorderConfig;
      expect(config1.moveIntervalMs).toBe(20);
      expect(config1.maxScreenshotSize).toBe(10240);

      // Test maximum edge
      jest.resetModules();
      process.env.RECORDER_MOVE_INTERVAL_MS = '200';
      process.env.RECORDER_MAX_SCREENSHOT_SIZE = '10485760';

      const config2 = require('../../../src/config/recorder.config').recorderConfig;
      expect(config2.moveIntervalMs).toBe(200);
      expect(config2.maxScreenshotSize).toBe(10485760);
    });

    test('handles empty string for numeric values', () => {
      process.env.RECORDER_MOVE_INTERVAL_MS = '';

      // Empty string is falsy, so default value is used
      const { recorderConfig } = require('../../../src/config/recorder.config');
      expect(recorderConfig.moveIntervalMs).toBe(50);
    });

    test('validates all configs together', () => {
      process.env.RECORDER_INCLUDE_SCREENSHOT = 'true';
      process.env.RECORDER_MOVE_INTERVAL_MS = '75';
      process.env.RECORDER_MAX_SCREENSHOT_SIZE = '1048576';
      process.env.NODE_ENV = 'test';

      const { recorderConfig } = require('../../../src/config/recorder.config');

      expect(recorderConfig).toEqual({
        includeScreenshot: true,
        moveIntervalMs: 75,
        maxScreenshotSize: 1048576,
      });
    });

    test('handles RECORDER_INCLUDE_SCREENSHOT with various truthy values', () => {
      const truthyValues = ['true', 'yes', '1', 'TRUE', 'any-value'];

      truthyValues.forEach((value) => {
        jest.resetModules();
        process.env.RECORDER_INCLUDE_SCREENSHOT = value;

        const { recorderConfig } = require('../../../src/config/recorder.config');
        expect(recorderConfig.includeScreenshot).toBe(true);
      });
    });

    test('only false string sets includeScreenshot to false', () => {
      process.env.RECORDER_INCLUDE_SCREENSHOT = 'false';
      const config1 = require('../../../src/config/recorder.config').recorderConfig;
      expect(config1.includeScreenshot).toBe(false);

      jest.resetModules();
      process.env.RECORDER_INCLUDE_SCREENSHOT = 'FALSE';
      const config2 = require('../../../src/config/recorder.config').recorderConfig;
      expect(config2.includeScreenshot).toBe(true); // case sensitive
    });

    test('handles whitespace in numeric values', () => {
      process.env.RECORDER_MOVE_INTERVAL_MS = '  50  ';
      process.env.RECORDER_MAX_SCREENSHOT_SIZE = '  2097152  ';

      const { recorderConfig } = require('../../../src/config/recorder.config');

      expect(recorderConfig.moveIntervalMs).toBe(50);
      expect(recorderConfig.maxScreenshotSize).toBe(2097152);
    });

    test('handles negative values', () => {
      process.env.RECORDER_MOVE_INTERVAL_MS = '-50';

      expect(() => {
        require('../../../src/config/recorder.config');
      }).toThrow('RECORDER_MOVE_INTERVAL_MS deve estar entre 20 e 200ms (valor: -50)');
    });

    test('handles floating point values (truncates to integer)', () => {
      process.env.RECORDER_MOVE_INTERVAL_MS = '50.99';
      process.env.RECORDER_MAX_SCREENSHOT_SIZE = '2097152.123';

      const { recorderConfig } = require('../../../src/config/recorder.config');

      expect(recorderConfig.moveIntervalMs).toBe(50); // parseInt truncates
      expect(recorderConfig.maxScreenshotSize).toBe(2097152);
    });
  });
});
