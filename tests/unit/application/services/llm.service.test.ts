// Mock dependencies before imports
jest.mock('pino', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  })),
}));

jest.mock('../../../../src/application/factory/output-parser.factory.js', () => ({
  OutputParserFactory: {
    getInstance: jest.fn(),
  },
}));

jest.mock('../../../../src/config/output-format.config.js', () => ({
  outputFormatConfig: {
    maxSchemaSize: 1000,
    parseTimeout: 5000,
    enableDebugLogs: false,
    defaultMode: 'string',
  },
}));

jest.mock('../../../../src/types/output-shape.js', () => ({
  createSuccessResponse: jest.fn((data, metadata) => ({ success: true, data, metadata })),
  createErrorResponse: jest.fn((error, code) => ({ success: false, error, code })),
}));

// Use require instead of import to avoid verbatimModuleSyntax issues
const { LLMService } = require('../../../../src/application/services/llm.service.js');
const {
  OutputParserFactory,
} = require('../../../../src/application/factory/output-parser.factory.js');
const { outputFormatConfig } = require('../../../../src/config/output-format.config.js');
const {
  createSuccessResponse,
  createErrorResponse,
} = require('../../../../src/types/output-shape.js');
const pino = require('pino');

describe('LLMService', () => {
  let service: any;
  let mockLLMAdapter: any;
  let mockParserFactory: any;
  let mockStrategy: any;
  let mockLogger: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup mock logger
    mockLogger = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    };
    (pino as any).default.mockReturnValue(mockLogger);

    // Setup mock LLM adapter
    mockLLMAdapter = {
      generateCompletion: jest.fn(),
    };

    // Setup mock parser strategy
    mockStrategy = {
      isSupported: jest.fn().mockReturnValue(true),
      parse: jest.fn(),
    };

    // Setup mock parser factory
    mockParserFactory = {
      getStrategy: jest.fn().mockReturnValue(mockStrategy),
    };
    (OutputParserFactory.getInstance as jest.Mock).mockReturnValue(mockParserFactory);

    // Create service instance
    service = new LLMService(mockLLMAdapter);
  });

  describe('generateCompletion', () => {
    const mockRequest = {
      model: 'gpt-3.5-turbo',
      prompt: 'Test prompt',
      temperature: 0.7,
    };

    const mockLLMResponse = {
      content: 'Test response',
      model: 'gpt-3.5-turbo',
      finishReason: 'stop',
      usage: {
        promptTokens: 10,
        completionTokens: 20,
        totalTokens: 30,
      },
    };

    test('should generate completion successfully without output format', async () => {
      mockLLMAdapter.generateCompletion.mockResolvedValue(mockLLMResponse);

      const result = await service.generateCompletion(mockRequest);

      expect(mockLLMAdapter.generateCompletion).toHaveBeenCalledWith(mockRequest);
      expect(createSuccessResponse).toHaveBeenCalledWith('Test response', {
        model: 'gpt-3.5-turbo',
        finishReason: 'stop',
        tokensUsed: 30,
        processingTime: expect.any(Number),
      });
      expect(mockLogger.info).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        success: true,
        data: 'Test response',
        metadata: expect.any(Object),
      });
    });

    test('should generate completion successfully with output format', async () => {
      const requestWithFormat = {
        ...mockRequest,
        outputFormat: {
          type: 'json',
          schema: { type: 'object' },
        },
      };
      const parsedData = { parsed: 'data' };

      mockLLMAdapter.generateCompletion.mockResolvedValue(mockLLMResponse);
      mockStrategy.parse.mockReturnValue(parsedData);

      const result = await service.generateCompletion(requestWithFormat);

      expect(mockParserFactory.getStrategy).toHaveBeenCalledWith(requestWithFormat.outputFormat);
      expect(mockStrategy.isSupported).toHaveBeenCalledWith(requestWithFormat.outputFormat);
      expect(mockStrategy.parse).toHaveBeenCalledWith(
        'Test response',
        requestWithFormat.outputFormat,
      );
      expect(createSuccessResponse).toHaveBeenCalledWith(parsedData, expect.any(Object));
      expect(result.data).toEqual(parsedData);
    });

    test('should handle LLM adapter errors', async () => {
      const error = new Error('LLM adapter error');
      mockLLMAdapter.generateCompletion.mockRejectedValue(error);

      const result = await service.generateCompletion(mockRequest);

      expect(mockLogger.error).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'LLM adapter error',
          model: 'gpt-3.5-turbo',
        }),
        'Error processing LLM request',
      );
      expect(createErrorResponse).toHaveBeenCalledWith('LLM adapter error', 'LLM_PROCESSING_ERROR');
      expect(result).toEqual({
        success: false,
        error: 'LLM adapter error',
        code: 'LLM_PROCESSING_ERROR',
      });
    });

    test('should handle non-Error objects in catch block', async () => {
      mockLLMAdapter.generateCompletion.mockRejectedValue('string error');

      const result = await service.generateCompletion(mockRequest);

      expect(createErrorResponse).toHaveBeenCalledWith(
        'Erro interno do servidor',
        'LLM_PROCESSING_ERROR',
      );
      expect(result.success).toBe(false);
    });

    test('should validate output format schema size', async () => {
      const largeSchema = { type: 'json', schema: 'x'.repeat(2000) };
      const requestWithLargeFormat = {
        ...mockRequest,
        outputFormat: largeSchema,
      };

      const result = await service.generateCompletion(requestWithLargeFormat);

      expect(result.success).toBe(false);
      expect(mockLogger.error).toHaveBeenCalled();
      expect(createErrorResponse).toHaveBeenCalledWith(
        expect.stringContaining('Output format muito grande'),
        'LLM_PROCESSING_ERROR',
      );
    });

    test('should handle unsupported output format', async () => {
      const unsupportedFormat = { type: 'unsupported' };
      const requestWithUnsupportedFormat = {
        ...mockRequest,
        outputFormat: unsupportedFormat,
      };

      mockStrategy.isSupported.mockReturnValue(false);

      const result = await service.generateCompletion(requestWithUnsupportedFormat);

      expect(result.success).toBe(false);
      expect(createErrorResponse).toHaveBeenCalledWith(
        expect.stringContaining('Output format não suportado'),
        'LLM_PROCESSING_ERROR',
      );
    });

    test('should handle parser factory errors', async () => {
      const requestWithFormat = {
        ...mockRequest,
        outputFormat: { type: 'json' },
      };

      mockParserFactory.getStrategy.mockImplementation(() => {
        throw new Error('Strategy not found');
      });

      const result = await service.generateCompletion(requestWithFormat);

      expect(result.success).toBe(false);
      expect(createErrorResponse).toHaveBeenCalledWith(
        expect.stringContaining('Output format inválido'),
        'LLM_PROCESSING_ERROR',
      );
    });

    test('should warn when parsing exceeds timeout', async () => {
      const requestWithFormat = {
        ...mockRequest,
        outputFormat: { type: 'json' },
      };

      mockLLMAdapter.generateCompletion.mockResolvedValue(mockLLMResponse);

      // Mock Date.now to simulate timeout
      const originalDateNow = Date.now;
      let callCount = 0;
      Date.now = jest.fn(() => {
        callCount++;
        return callCount === 1 ? 1000 : 7000; // 6 second difference
      });

      mockStrategy.parse.mockReturnValue({ parsed: 'data' });

      await service.generateCompletion(requestWithFormat);

      expect(mockLogger.warn).toHaveBeenCalledWith(
        expect.objectContaining({
          processingTime: 6000,
          timeout: 5000,
          schemaType: 'json',
        }),
        'Output parsing exceeded timeout, consider simplifying schema',
      );

      Date.now = originalDateNow;
    });

    test('should log debug information when debug logs enabled', async () => {
      (outputFormatConfig as any).enableDebugLogs = true;

      const requestWithFormat = {
        ...mockRequest,
        outputFormat: { type: 'json' },
      };

      mockLLMAdapter.generateCompletion.mockResolvedValue(mockLLMResponse);
      mockStrategy.parse.mockReturnValue({ parsed: 'data' });

      await service.generateCompletion(requestWithFormat);

      expect(mockLogger.debug).toHaveBeenCalledWith(
        expect.objectContaining({
          processingTime: expect.any(Number),
          schemaType: 'json',
          contentLength: 13,
        }),
        'Output parsing completed',
      );

      // Reset config
      (outputFormatConfig as any).enableDebugLogs = false;
    });

    test('should fallback to string output on parsing error when defaultMode is string', async () => {
      const requestWithFormat = {
        ...mockRequest,
        outputFormat: { type: 'json' },
      };

      mockLLMAdapter.generateCompletion.mockResolvedValue(mockLLMResponse);
      mockStrategy.parse.mockImplementation(() => {
        throw new Error('Parsing error');
      });

      const result = await service.generateCompletion(requestWithFormat);

      expect(mockLogger.warn).toHaveBeenCalledWith(
        'Falling back to string output due to parsing error',
      );
      expect(createSuccessResponse).toHaveBeenCalledWith('Test response', expect.any(Object));
      expect(result.success).toBe(true);
    });

    test('should throw error on parsing failure when defaultMode is not string', async () => {
      (outputFormatConfig as any).defaultMode = 'strict';

      const requestWithFormat = {
        ...mockRequest,
        outputFormat: { type: 'json' },
      };

      mockLLMAdapter.generateCompletion.mockResolvedValue(mockLLMResponse);
      mockStrategy.parse.mockImplementation(() => {
        throw new Error('Parsing error');
      });

      const result = await service.generateCompletion(requestWithFormat);

      expect(result.success).toBe(false);
      expect(createErrorResponse).toHaveBeenCalledWith(
        expect.stringContaining('Erro ao processar output format'),
        'LLM_PROCESSING_ERROR',
      );

      // Reset config
      (outputFormatConfig as any).defaultMode = 'string';
    });

    test('should handle non-Error objects in parsing catch block', async () => {
      const requestWithFormat = {
        ...mockRequest,
        outputFormat: { type: 'json' },
      };

      mockLLMAdapter.generateCompletion.mockResolvedValue(mockLLMResponse);
      mockStrategy.parse.mockImplementation(() => {
        throw 'string error';
      });

      const result = await service.generateCompletion(requestWithFormat);

      expect(mockLogger.error).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'Unknown parsing error',
          schemaType: 'json',
          contentPreview: 'Test response',
        }),
        'Failed to parse LLM output with custom format',
      );
      expect(result.success).toBe(true); // Due to fallback
    });
  });

  test('exports ILLMService interface', () => {
    expect(LLMService).toBeDefined();
    expect(typeof LLMService).toBe('function');
  });
});
