// Mock environment antes de qualquer import
jest.doMock('dotenv', () => ({
  config: jest.fn(),
}));

describe('MouseDefaults', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  test('uses default values when no environment variables are set', () => {
    // Deletar todas as variáveis para testar defaults
    delete process.env.MOUSE_MIN_DUR;
    delete process.env.MOUSE_MAX_DUR;
    delete process.env.MOUSE_DEFAULT_SMOOTH;
    delete process.env.MOUSE_SAMPLE_RATE;
    delete process.env.MOUSE_STREAM_INTERVAL;
    delete process.env.MOUSE_DEFAULT_DURATION;

    const { MouseDefaults } = require('../../../src/config/mouse.config');

    expect(MouseDefaults.minDuration).toBe(100);
    expect(MouseDefaults.maxDuration).toBe(5000);
    expect(MouseDefaults.defaultSmooth).toBe(false);
    expect(MouseDefaults.sampleRate).toBe(30);
    expect(MouseDefaults.streamInterval).toBe(100);
    expect(MouseDefaults.defaultDuration).toBe(1000);
  });

  test('uses environment variables when set', () => {
    process.env.MOUSE_MIN_DUR = '200';
    process.env.MOUSE_MAX_DUR = '10000';
    process.env.MOUSE_DEFAULT_SMOOTH = 'true';
    process.env.MOUSE_SAMPLE_RATE = '60';
    process.env.MOUSE_STREAM_INTERVAL = '50';
    process.env.MOUSE_DEFAULT_DURATION = '2000';

    const { MouseDefaults } = require('../../../src/config/mouse.config');

    expect(MouseDefaults.minDuration).toBe(200);
    expect(MouseDefaults.maxDuration).toBe(10000);
    expect(MouseDefaults.defaultSmooth).toBe(true);
    expect(MouseDefaults.sampleRate).toBe(60);
    expect(MouseDefaults.streamInterval).toBe(50);
    expect(MouseDefaults.defaultDuration).toBe(2000);
  });

  test('handles invalid numeric values with NaN', () => {
    process.env.MOUSE_MIN_DUR = 'invalid';
    process.env.MOUSE_MAX_DUR = 'not-a-number';
    process.env.MOUSE_SAMPLE_RATE = 'abc';
    process.env.MOUSE_STREAM_INTERVAL = 'xyz';
    process.env.MOUSE_DEFAULT_DURATION = 'def';

    const { MouseDefaults } = require('../../../src/config/mouse.config');

    // parseInt com valores inválidos retorna NaN
    expect(MouseDefaults.minDuration).toBeNaN();
    expect(MouseDefaults.maxDuration).toBeNaN();
    expect(MouseDefaults.sampleRate).toBeNaN();
    expect(MouseDefaults.streamInterval).toBeNaN();
    expect(MouseDefaults.defaultDuration).toBeNaN();
  });

  test('handles defaultSmooth with various truthy/falsy values', () => {
    // Test 'true' string
    process.env.MOUSE_DEFAULT_SMOOTH = 'true';
    let { MouseDefaults } = require('../../../src/config/mouse.config');
    expect(MouseDefaults.defaultSmooth).toBe(true);

    // Test 'false' string
    jest.resetModules();
    process.env.MOUSE_DEFAULT_SMOOTH = 'false';
    MouseDefaults = require('../../../src/config/mouse.config').MouseDefaults;
    expect(MouseDefaults.defaultSmooth).toBe(false);

    // Test any other string
    jest.resetModules();
    process.env.MOUSE_DEFAULT_SMOOTH = 'yes';
    MouseDefaults = require('../../../src/config/mouse.config').MouseDefaults;
    expect(MouseDefaults.defaultSmooth).toBe(false);

    // Test empty string
    jest.resetModules();
    process.env.MOUSE_DEFAULT_SMOOTH = '';
    MouseDefaults = require('../../../src/config/mouse.config').MouseDefaults;
    expect(MouseDefaults.defaultSmooth).toBe(false);
  });

  test('handles edge case numeric values', () => {
    process.env.MOUSE_MIN_DUR = '0';
    process.env.MOUSE_MAX_DUR = '999999';
    process.env.MOUSE_SAMPLE_RATE = '-30';
    process.env.MOUSE_STREAM_INTERVAL = '0.5';
    process.env.MOUSE_DEFAULT_DURATION = '1.999';

    const { MouseDefaults } = require('../../../src/config/mouse.config');

    expect(MouseDefaults.minDuration).toBe(0);
    expect(MouseDefaults.maxDuration).toBe(999999);
    expect(MouseDefaults.sampleRate).toBe(-30);
    expect(MouseDefaults.streamInterval).toBe(0); // parseInt trunca decimais
    expect(MouseDefaults.defaultDuration).toBe(1); // parseInt trunca decimais
  });

  test('exports MouseConfig type', () => {
    const module = require('../../../src/config/mouse.config');

    // Verifica que o módulo exporta MouseDefaults
    expect(module.MouseDefaults).toBeDefined();
    expect(typeof module.MouseDefaults).toBe('object');

    // Verifica propriedades do objeto
    expect(module.MouseDefaults).toHaveProperty('minDuration');
    expect(module.MouseDefaults).toHaveProperty('maxDuration');
    expect(module.MouseDefaults).toHaveProperty('defaultSmooth');
    expect(module.MouseDefaults).toHaveProperty('sampleRate');
    expect(module.MouseDefaults).toHaveProperty('streamInterval');
    expect(module.MouseDefaults).toHaveProperty('defaultDuration');
  });

  test('handles parseInt with different radix scenarios', () => {
    // parseInt com base 10 explícita
    process.env.MOUSE_MIN_DUR = '0123'; // não deve ser interpretado como octal
    process.env.MOUSE_MAX_DUR = '0x10'; // hexadecimal ainda funciona com radix 10

    const { MouseDefaults } = require('../../../src/config/mouse.config');

    expect(MouseDefaults.minDuration).toBe(123); // decimal, não octal
    expect(MouseDefaults.maxDuration).toBe(0); // parseInt com radix 10 para 0x10
  });
});
