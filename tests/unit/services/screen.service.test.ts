// Mock de tsyringe antes dos imports
jest.mock('tsyringe', () => ({
  injectable: () => (target: any) => target,
  inject: () => () => {},
}));

// Mock de pino - precisa retornar uma função default
jest.mock('pino', () => {
  return {
    __esModule: true,
    default: jest.fn(() => ({
      debug: jest.fn(),
      info: jest.fn(),
      error: jest.fn(),
    })),
  };
});

// Importar com require devido ao verbatimModuleSyntax
const { ScreenService } = require('../../../src/application/services/screen.service');

describe('ScreenService coverage', () => {
  let service: any;
  let mockScreenAdapter: any;
  let mockLogger: any;

  beforeEach(() => {
    // Mock do adapter
    mockScreenAdapter = {
      capture: jest.fn(),
      find: jest.fn(),
      waitFor: jest.fn(),
    };

    // Mock do logger
    mockLogger = {
      debug: jest.fn(),
      info: jest.fn(),
      error: jest.fn(),
    };

    // Criar instância do serviço
    service = new ScreenService(mockScreenAdapter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findTemplate', () => {
    test('executes findTemplate with valid data', async () => {
      const mockMatches = [{ x: 100, y: 200, width: 50, height: 50, confidence: 0.9 }];
      mockScreenAdapter.find.mockResolvedValue(mockMatches);

      const request = {
        template: 'data:image/png;base64,iVBORw0KGgoAAAANS',
        confidence: 0.85,
        region: { x: 0, y: 0, width: 800, height: 600 },
      };

      const result = await service.findTemplate(request);

      expect(mockScreenAdapter.find).toHaveBeenCalledWith(
        expect.any(Buffer),
        0.85,
        request.region
      );
      expect(result).toEqual(mockMatches);
      expect(service.logger.debug).toHaveBeenCalled();
      expect(service.logger.info).toHaveBeenCalled();
    });

    test('executes findTemplate with default confidence', async () => {
      const mockMatches: any[] = [];
      mockScreenAdapter.find.mockResolvedValue(mockMatches);

      const request = {
        template: 'data:image/png;base64,ABC123',
      };

      await service.findTemplate(request);

      expect(mockScreenAdapter.find).toHaveBeenCalledWith(
        expect.any(Buffer),
        0.8,
        undefined
      );
    });

    test('handles findTemplate error', async () => {
      const error = new Error('Find failed');
      mockScreenAdapter.find.mockRejectedValue(error);

      const request = {
        template: 'data:image/png;base64,XYZ',
      };

      await expect(service.findTemplate(request)).rejects.toThrow('Find failed');
      expect(service.logger.error).toHaveBeenCalledWith({ error }, 'Failed to find template');
    });

    test('processes base64 with different image types', async () => {
      mockScreenAdapter.find.mockResolvedValue([]);

      const templates = [
        'data:image/jpeg;base64,/9j/4AAQ',
        'data:image/gif;base64,R0lGOD',
        'data:image/webp;base64,UklGR',
        'data:image/bmp;base64,Qk02',
      ];

      for (const template of templates) {
        await service.findTemplate({ template });
      }

      expect(mockScreenAdapter.find).toHaveBeenCalledTimes(4);
    });
  });

  describe('capture', () => {
    test('executes capture with region', async () => {
      const mockBuffer = Buffer.from('image data');
      mockScreenAdapter.capture.mockResolvedValue(mockBuffer);

      const request = {
        region: { x: 10, y: 20, width: 300, height: 400 },
        format: 'jpeg' as const,
      };

      const result = await service.capture(request);

      expect(mockScreenAdapter.capture).toHaveBeenCalledWith(request.region);
      expect(result).toMatch(/^data:image\/jpeg;base64,/);
    });

    test('executes capture with default format', async () => {
      const mockBuffer = Buffer.from('png image');
      mockScreenAdapter.capture.mockResolvedValue(mockBuffer);

      const request = {};

      const result = await service.capture(request);

      expect(mockScreenAdapter.capture).toHaveBeenCalledWith(undefined);
      expect(result).toMatch(/^data:image\/png;base64,/);
    });

    test('captures full screen when no region specified', async () => {
      const mockBuffer = Buffer.from('fullscreen');
      mockScreenAdapter.capture.mockResolvedValue(mockBuffer);

      await service.capture({});

      expect(mockScreenAdapter.capture).toHaveBeenCalledWith(undefined);
    });
  });

  describe('waitForTemplate', () => {
    test('executes waitForTemplate with custom parameters', async () => {
      const mockResult = { x: 50, y: 100, width: 30, height: 40, confidence: 0.95 };
      mockScreenAdapter.waitFor.mockResolvedValue(mockResult);

      const template = 'data:image/png;base64,WAIT123';
      const timeout = 10000;
      const confidence = 0.9;

      const result = await service.waitForTemplate(template, timeout, confidence);

      expect(mockScreenAdapter.waitFor).toHaveBeenCalledWith(
        expect.any(Buffer),
        timeout,
        confidence
      );
      expect(result).toEqual(mockResult);
    });

    test('executes waitForTemplate with default parameters', async () => {
      const mockResult = { x: 0, y: 0, width: 10, height: 10, confidence: 0.8 };
      mockScreenAdapter.waitFor.mockResolvedValue(mockResult);

      const template = 'data:image/png;base64,DEFAULT';

      await service.waitForTemplate(template);

      expect(mockScreenAdapter.waitFor).toHaveBeenCalledWith(
        expect.any(Buffer),
        5000,
        0.8
      );
    });

    test('handles waitForTemplate timeout', async () => {
      const error = new Error('Timeout waiting for template');
      mockScreenAdapter.waitFor.mockRejectedValue(error);

      await expect(
        service.waitForTemplate('data:image/png;base64,TIMEOUT')
      ).rejects.toThrow('Timeout waiting for template');
    });
  });

  describe('decodeBase64Image', () => {
    test('decodes base64 without data URI prefix', async () => {
      mockScreenAdapter.find.mockResolvedValue([]);

      // Template sem prefixo data URI
      const rawBase64 = 'SGVsbG8gV29ybGQ=';
      
      await service.findTemplate({ template: rawBase64 });

      const callArgs = mockScreenAdapter.find.mock.calls[0];
      const decodedBuffer = callArgs[0];
      expect(decodedBuffer.toString()).toBe('Hello World');
    });

    test('handles empty base64 string', async () => {
      mockScreenAdapter.find.mockResolvedValue([]);

      await service.findTemplate({ template: 'data:image/png;base64,' });

      const callArgs = mockScreenAdapter.find.mock.calls[0];
      const decodedBuffer = callArgs[0];
      expect(decodedBuffer.length).toBe(0);
    });

    test('handles malformed base64', async () => {
      mockScreenAdapter.find.mockResolvedValue([]);

      // Base64 inválido mas que não gera erro no Buffer.from
      await service.findTemplate({ template: 'data:image/png;base64,!!!invalid!!!' });

      expect(mockScreenAdapter.find).toHaveBeenCalled();
    });
  });

  describe('edge cases and coverage', () => {
    test('handles adapter throwing non-Error objects', async () => {
      mockScreenAdapter.find.mockRejectedValue('string error');

      await expect(
        service.findTemplate({ template: 'test' })
      ).rejects.toBe('string error');
    });

    test('processes very large base64 strings', async () => {
      mockScreenAdapter.capture.mockResolvedValue(Buffer.alloc(1000000));

      const result = await service.capture({});

      expect(result.length).toBeGreaterThan(1000000);
    });

    test('multiple concurrent operations', async () => {
      mockScreenAdapter.find.mockResolvedValue([]);
      mockScreenAdapter.capture.mockResolvedValue(Buffer.from('data'));
      mockScreenAdapter.waitFor.mockResolvedValue({ x: 0, y: 0, width: 1, height: 1, confidence: 1 });

      const operations = [
        service.findTemplate({ template: 'test1' }),
        service.capture({}),
        service.waitForTemplate('test2'),
      ];

      await Promise.all(operations);

      expect(mockScreenAdapter.find).toHaveBeenCalledTimes(1);
      expect(mockScreenAdapter.capture).toHaveBeenCalledTimes(1);
      expect(mockScreenAdapter.waitFor).toHaveBeenCalledTimes(1);
    });
  });
});