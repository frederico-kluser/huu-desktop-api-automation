// Mock environment.js antes de qualquer import
jest.mock('../../../src/config/environment.js', () => ({
  environment: {
    nodeEnv: 'test',
  },
}));

// Mock os e path
jest.mock('os', () => ({
  cpus: jest.fn(() => new Array(4).fill({})),
  tmpdir: jest.fn(() => '/tmp'),
}));

jest.mock('path', () => ({
  join: jest.fn((...args) => args.join('/')),
}));

describe('ocr.config coverage', () => {
  const originalEnv = process.env;
  let exitSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    exitSpy = jest.spyOn(process, 'exit').mockImplementation((code?: any) => {
      throw new Error(`Process exit with code ${code}`);
    });
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    process.env = originalEnv;
    exitSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  test('loadOcrConfig with defaults', () => {
    // Remove all OCR env vars to test defaults
    delete process.env.OCR_MAX_IMAGE_SIZE_MB;
    delete process.env.OCR_TIMEOUT_MS;
    delete process.env.OCR_WORKERS;
    delete process.env.OCR_CACHE_TTL;
    delete process.env.OCR_LANGUAGES;
    delete process.env.OCR_LANG_PATH;
    delete process.env.OCR_CACHE_PATH;
    delete process.env.OCR_JOBS_PER_WORKER;
    delete process.env.OCR_PREPROCESSING;
    delete process.env.OCR_DEFAULT_MODE;
    delete process.env.OCR_ENABLE_METRICS;

    const { ocrConfig } = require('../../../src/config/ocr.config');

    expect(ocrConfig.maxImageSizeMb).toBe(10);
    expect(ocrConfig.maxProcessingMs).toBe(30000);
    expect(ocrConfig.workerCount).toBe(4);
    expect(ocrConfig.cacheTtl).toBe(0);
    expect(ocrConfig.languages).toEqual(['eng', 'por']);
    expect(ocrConfig.langPath).toContain('tessdata');
    expect(ocrConfig.cachePath).toBe('/tmp/ocr-cache');
    expect(ocrConfig.jobsPerWorker).toBe(500);
    expect(ocrConfig.preprocessing).toEqual({
      targetWidth: 1000,
      threshold: 128,
      contrastBoost: true,
      denoiseLevel: 0,
      sharpen: true,
    });
    expect(ocrConfig.defaultMode).toBe('balanced');
    expect(ocrConfig.enableMetrics).toBe(false);
  });

  test('loadOcrConfig with custom values', () => {
    process.env.OCR_MAX_IMAGE_SIZE_MB = '20';
    process.env.OCR_TIMEOUT_MS = '60000';
    process.env.OCR_WORKERS = '2';
    process.env.OCR_CACHE_TTL = '3600';
    process.env.OCR_LANGUAGES = 'eng, por, spa';
    process.env.OCR_LANG_PATH = '/custom/tessdata';
    process.env.OCR_CACHE_PATH = '/custom/cache';
    process.env.OCR_JOBS_PER_WORKER = '1000';
    process.env.OCR_PREPROCESSING =
      '{"targetWidth":2000,"threshold":200,"contrastBoost":false,"denoiseLevel":2,"sharpen":false}';
    process.env.OCR_DEFAULT_MODE = 'fast';
    process.env.OCR_ENABLE_METRICS = 'true';

    const { ocrConfig } = require('../../../src/config/ocr.config');

    expect(ocrConfig.maxImageSizeMb).toBe(20);
    expect(ocrConfig.maxProcessingMs).toBe(60000);
    expect(ocrConfig.workerCount).toBe(2);
    expect(ocrConfig.cacheTtl).toBe(3600);
    expect(ocrConfig.languages).toEqual(['eng', 'por', 'spa']);
    expect(ocrConfig.langPath).toBe('/custom/tessdata');
    expect(ocrConfig.cachePath).toBe('/custom/cache');
    expect(ocrConfig.jobsPerWorker).toBe(1000);
    expect(ocrConfig.preprocessing).toEqual({
      targetWidth: 2000,
      threshold: 200,
      contrastBoost: false,
      denoiseLevel: 2,
      sharpen: false,
    });
    expect(ocrConfig.defaultMode).toBe('fast');
    expect(ocrConfig.enableMetrics).toBe(true);
  });

  test('loadOcrConfig with invalid JSON preprocessing', () => {
    process.env.OCR_PREPROCESSING = 'invalid json';

    const { ocrConfig } = require('../../../src/config/ocr.config');

    // Should fall back to default
    expect(ocrConfig.preprocessing).toEqual({
      targetWidth: 1000,
      threshold: 128,
      contrastBoost: true,
      denoiseLevel: 0,
      sharpen: true,
    });
  });

  test('loadOcrConfig with more workers than CPUs', () => {
    process.env.OCR_WORKERS = '10';

    const { ocrConfig } = require('../../../src/config/ocr.config');

    // Should be limited to CPU count (4)
    expect(ocrConfig.workerCount).toBe(4);
  });

  test('validateOcrConfig with valid config', () => {
    const { validateOcrConfig } = require('../../../src/config/ocr.config');

    const validConfig = {
      maxImageSizeMb: 20,
      maxProcessingMs: 30000,
      workerCount: 4,
      cacheTtl: 3600,
      languages: ['eng', 'por'],
      langPath: '/path/to/tessdata',
      cachePath: '/path/to/cache',
      jobsPerWorker: 500,
      preprocessing: {
        targetWidth: 1000,
        threshold: 128,
        contrastBoost: true,
        denoiseLevel: 0,
        sharpen: true,
      },
      defaultMode: 'balanced' as const,
      enableMetrics: true,
    };

    expect(() => validateOcrConfig(validConfig)).not.toThrow();
  });

  test.each([
    ['maxImageSizeMb < 1', { maxImageSizeMb: 0 }, 'OCR_MAX_IMAGE_SIZE_MB deve estar entre 1 e 50'],
    [
      'maxImageSizeMb > 50',
      { maxImageSizeMb: 51 },
      'OCR_MAX_IMAGE_SIZE_MB deve estar entre 1 e 50',
    ],
    [
      'maxProcessingMs < 1000',
      { maxProcessingMs: 999 },
      'OCR_TIMEOUT_MS deve estar entre 1000 e 300000',
    ],
    [
      'maxProcessingMs > 300000',
      { maxProcessingMs: 300001 },
      'OCR_TIMEOUT_MS deve estar entre 1000 e 300000',
    ],
    ['workerCount < 1', { workerCount: 0 }, 'OCR_WORKERS deve estar entre 1 e 8'],
    ['workerCount > 8', { workerCount: 9 }, 'OCR_WORKERS deve estar entre 1 e 8'],
    ['cacheTtl < 0', { cacheTtl: -1 }, 'OCR_CACHE_TTL não pode ser negativo'],
    ['empty languages', { languages: [] }, 'Pelo menos uma linguagem deve ser configurada'],
    ['invalid language', { languages: ['eng', 'invalid'] }, 'Linguagem não suportada: invalid'],
    [
      'targetWidth < 100',
      { preprocessing: { targetWidth: 99 } },
      'targetWidth deve estar entre 100 e 4000',
    ],
    [
      'targetWidth > 4000',
      { preprocessing: { targetWidth: 4001 } },
      'targetWidth deve estar entre 100 e 4000',
    ],
    ['threshold < 0', { preprocessing: { threshold: -1 } }, 'threshold deve estar entre 0 e 255'],
    [
      'threshold > 255',
      { preprocessing: { threshold: 256 } },
      'threshold deve estar entre 0 e 255',
    ],
  ])('validateOcrConfig throws for %s', (_, overrides, expectedError) => {
    const { validateOcrConfig } = require('../../../src/config/ocr.config');

    const config = {
      maxImageSizeMb: 20,
      maxProcessingMs: 30000,
      workerCount: 4,
      cacheTtl: 3600,
      languages: ['eng', 'por'],
      langPath: '/path/to/tessdata',
      cachePath: '/path/to/cache',
      jobsPerWorker: 500,
      preprocessing: {
        targetWidth: 1000,
        threshold: 128,
        contrastBoost: true,
        denoiseLevel: 0,
        sharpen: true,
      },
      defaultMode: 'balanced' as const,
      enableMetrics: true,
      ...overrides,
    };

    // Handle nested preprocessing overrides
    if ('preprocessing' in overrides && overrides.preprocessing) {
      config.preprocessing = { ...config.preprocessing, ...overrides.preprocessing };
    }

    expect(() => validateOcrConfig(config)).toThrow(expectedError);
  });

  test.each([
    [
      'fast',
      {
        preprocessing: {
          targetWidth: 800,
          threshold: 128,
          contrastBoost: false,
          denoiseLevel: 0,
          sharpen: false,
        },
        timeout: 10000,
      },
    ],
    [
      'balanced',
      {
        preprocessing: {
          targetWidth: 1000,
          threshold: 128,
          contrastBoost: true,
          denoiseLevel: 0,
          sharpen: true,
        },
        timeout: 20000,
      },
    ],
    [
      'accurate',
      {
        preprocessing: {
          targetWidth: 1500,
          threshold: 128,
          contrastBoost: true,
          denoiseLevel: 1,
          sharpen: true,
        },
        timeout: 30000,
      },
    ],
  ])('getModeConfig returns correct config for %s mode', (mode, expected) => {
    const { getModeConfig } = require('../../../src/config/ocr.config');

    const result = getModeConfig(mode as any);
    expect(result).toEqual(expected);
  });

  test('parseJsonEnv function coverage', () => {
    process.env.OCR_PREPROCESSING = '{"test": "value"}';
    const module = require('../../../src/config/ocr.config');

    // The function is called internally, verify its effects
    expect(module.ocrConfig.preprocessing).toBeDefined();
  });

  test('production mode validation on load', () => {
    jest.resetModules();

    // Mock environment to production
    jest.doMock('../../../src/config/environment.js', () => ({
      environment: {
        nodeEnv: 'production',
      },
    }));

    // Set invalid config
    process.env.OCR_MAX_IMAGE_SIZE_MB = '100';

    try {
      require('../../../src/config/ocr.config');
    } catch (error: any) {
      expect(error.message).toContain('Process exit with code 1');
    }

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Configuração OCR inválida:',
      'OCR_MAX_IMAGE_SIZE_MB deve estar entre 1 e 50',
    );
  });

  test('production mode validation succeeds with valid config', () => {
    jest.resetModules();

    jest.doMock('../../../src/config/environment.js', () => ({
      environment: {
        nodeEnv: 'production',
      },
    }));

    // Set all valid values
    process.env.OCR_MAX_IMAGE_SIZE_MB = '10';
    process.env.OCR_WORKERS = '4';

    // Should not throw error
    const module = require('../../../src/config/ocr.config');
    expect(module.ocrConfig).toBeDefined();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });
});
