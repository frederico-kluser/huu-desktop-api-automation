// Mock do @nut-tree-fork/nut-js
const mockScreen = {
  config: {
    confidence: 0.95,
    autoHighlight: false,
    highlightDurationMs: 500,
  },
  grab: jest.fn(),
  grabRegion: jest.fn(),
};

const mockRegion = jest.fn();

jest.mock('@nut-tree-fork/nut-js', () => ({
  screen: mockScreen,
  Region: mockRegion,
}));

// Mock do sharp
const mockSharp = {
  png: jest.fn().mockReturnThis(),
  toBuffer: jest.fn(),
};

const sharp = jest.fn(() => mockSharp);
jest.mock('sharp', () => sharp);

// Mock do pino
jest.mock('pino', () => () => ({
  info: jest.fn(),
  debug: jest.fn(),
  error: jest.fn(),
}));

// Mock do environment
jest.mock('../../../../../src/config/environment.js', () => ({
  environment: {
    screenConfidence: 0.9,
  },
}));

// Usar require para evitar problemas com verbatimModuleSyntax
const {
  NutJSScreenAdapter,
} = require('../../../../../src/infrastructure/adapters/nutjs/nutjs-screen.adapter');

describe('NutJSScreenAdapter', () => {
  let adapter: any;

  beforeEach(() => {
    jest.clearAllMocks();
    adapter = new NutJSScreenAdapter();
    mockRegion.mockImplementation((x, y, width, height) => ({ x, y, width, height }));
  });

  describe('constructor', () => {
    test('initializes with correct configuration', () => {
      const newAdapter = new NutJSScreenAdapter();
      expect(mockScreen.config.confidence).toBe(0.9);
      expect(mockScreen.config.autoHighlight).toBe(false);
      expect(mockScreen.config.highlightDurationMs).toBe(500);
      expect(newAdapter).toBeDefined();
    });
  });

  describe('capture', () => {
    const mockImageData = {
      width: 1920,
      height: 1080,
      channels: 4,
      hasAlphaChannel: true,
      data: Buffer.from('mock-image-data'),
      pixelDensity: { scaleX: 1, scaleY: 1 },
      toRGB: jest.fn(),
      toBGR: jest.fn(),
    };

    const mockPngBuffer = Buffer.from('mock-png-data');

    beforeEach(() => {
      mockScreen.grab.mockResolvedValue(mockImageData);
      mockScreen.grabRegion.mockResolvedValue(mockImageData);
      mockSharp.toBuffer.mockResolvedValue(mockPngBuffer);
    });

    test('captures full screen when no region is provided', async () => {
      const result = await adapter.capture();

      expect(mockScreen.grab).toHaveBeenCalled();
      expect(mockScreen.grabRegion).not.toHaveBeenCalled();
      expect(sharp).toHaveBeenCalledWith(mockImageData.data, {
        raw: {
          width: mockImageData.width,
          height: mockImageData.height,
          channels: mockImageData.channels,
        },
      });
      expect(mockSharp.png).toHaveBeenCalledWith({ compressionLevel: 6, palette: false });
      expect(mockSharp.toBuffer).toHaveBeenCalled();
      expect(result).toBe(mockPngBuffer);
    });

    test('captures specific region when region is provided', async () => {
      const region = { x: 100, y: 200, width: 300, height: 400 };
      const result = await adapter.capture(region);

      expect(mockScreen.grabRegion).toHaveBeenCalled();
      expect(mockScreen.grab).not.toHaveBeenCalled();
      expect(mockRegion).toHaveBeenCalledWith(100, 200, 300, 400);
      expect(result).toBe(mockPngBuffer);
    });

    test('handles capture errors', async () => {
      const error = new Error('Capture failed');
      mockScreen.grab.mockRejectedValue(error);

      await expect(adapter.capture()).rejects.toThrow('Capture failed');
    });

    test('handles different channel counts', async () => {
      const testCases = [1, 2, 3, 4];

      for (const channels of testCases) {
        mockScreen.grab.mockResolvedValue({ ...mockImageData, channels });
        await adapter.capture();
        expect(sharp).toHaveBeenCalledWith(mockImageData.data, {
          raw: {
            width: mockImageData.width,
            height: mockImageData.height,
            channels,
          },
        });
      }
    });

    test('handles sharp conversion errors', async () => {
      const error = new Error('Sharp conversion failed');
      mockSharp.toBuffer.mockRejectedValue(error);

      await expect(adapter.capture()).rejects.toThrow('Sharp conversion failed');
    });
  });

  describe('find', () => {
    test('returns empty array', async () => {
      const template = Buffer.from('template');
      const confidence = 0.95;
      const region = { x: 0, y: 0, width: 100, height: 100 };

      const result = await adapter.find(template, confidence);
      expect(result).toEqual([]);

      const resultWithRegion = await adapter.find(template, confidence, region);
      expect(resultWithRegion).toEqual([]);
    });
  });

  describe('waitFor', () => {
    test('rejects with not implemented error', async () => {
      const template = Buffer.from('template');
      const timeout = 5000;
      const confidence = 0.95;

      await expect(adapter.waitFor(template, timeout, confidence)).rejects.toThrow(
        'waitFor functionality not yet implemented for this nut-js version',
      );
    });
  });
});
