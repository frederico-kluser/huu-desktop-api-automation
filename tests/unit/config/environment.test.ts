// Mock dotenv antes de qualquer import
jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

describe('environment', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  test('loads default values when env vars are not set', () => {
    delete process.env.NODE_ENV;
    delete process.env.PORT;
    delete process.env.HOST;
    delete process.env.LOG_LEVEL;
    delete process.env.MOUSE_SPEED;
    delete process.env.SCREEN_CONFIDENCE;
    delete process.env.API_KEY;
    
    const { environment, isDevelopment, isProduction } = require('../../../src/config/environment');
    
    expect(environment.nodeEnv).toBe('development');
    expect(environment.port).toBe(3000);
    expect(environment.host).toBe('0.0.0.0');
    expect(environment.logLevel).toBe('info');
    expect(environment.mouseSpeed).toBe(500);
    expect(environment.screenConfidence).toBe(0.8);
    expect(environment.apiKey).toBe('default-api-key');
    expect(isDevelopment).toBe(true);
    expect(isProduction).toBe(false);
  });

  test('uses custom values from environment variables', () => {
    process.env.NODE_ENV = 'production';
    process.env.PORT = '8080';
    process.env.HOST = 'localhost';
    process.env.LOG_LEVEL = 'debug';
    process.env.MOUSE_SPEED = '1000';
    process.env.SCREEN_CONFIDENCE = '0.95';
    process.env.API_KEY = 'custom-key';

    const { environment, isDevelopment, isProduction } = require('../../../src/config/environment');
    
    expect(environment.nodeEnv).toBe('production');
    expect(environment.port).toBe(8080);
    expect(environment.host).toBe('localhost');
    expect(environment.logLevel).toBe('debug');
    expect(environment.mouseSpeed).toBe(1000);
    expect(environment.screenConfidence).toBe(0.95);
    expect(environment.apiKey).toBe('custom-key');
    expect(isDevelopment).toBe(false);
    expect(isProduction).toBe(true);
  });

  test('handles invalid parseInt values', () => {
    process.env.PORT = 'invalid';
    process.env.MOUSE_SPEED = 'not-a-number';

    const { environment } = require('../../../src/config/environment');
    
    expect(environment.port).toBe(NaN);
    expect(environment.mouseSpeed).toBe(NaN);
  });

  test('handles invalid parseFloat values', () => {
    process.env.SCREEN_CONFIDENCE = 'invalid-float';

    const { environment } = require('../../../src/config/environment');
    
    expect(environment.screenConfidence).toBe(NaN);
  });

  test('isDevelopment is true when NODE_ENV is development', () => {
    process.env.NODE_ENV = 'development';
    
    const { isDevelopment, isProduction } = require('../../../src/config/environment');
    
    expect(isDevelopment).toBe(true);
    expect(isProduction).toBe(false);
  });

  test('isProduction is true when NODE_ENV is production', () => {
    process.env.NODE_ENV = 'production';
    
    const { isDevelopment, isProduction } = require('../../../src/config/environment');
    
    expect(isDevelopment).toBe(false);
    expect(isProduction).toBe(true);
  });

  test('both flags are false for other NODE_ENV values', () => {
    process.env.NODE_ENV = 'test';
    
    const { isDevelopment, isProduction } = require('../../../src/config/environment');
    
    expect(isDevelopment).toBe(false);
    expect(isProduction).toBe(false);
  });

  test('dotenv config is called', () => {
    const dotenv = require('dotenv');
    require('../../../src/config/environment');
    
    expect(dotenv.config).toHaveBeenCalled();
  });
});