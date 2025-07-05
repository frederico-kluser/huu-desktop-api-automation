import { LLMService } from '../../../src/application/services/llm.service.js';
import { OutputParserFactory } from '../../../src/application/factory/output-parser.factory.js';
import type { ILLMAdapter } from '../../../src/infrastructure/adapters/langchain/langchain-llm.adapter.js';
import type { LLMRequest } from '../../../src/application/dto/llm-request.dto.js';
import type { LLMResponse } from '../../../src/domain/entities/llm-response.js';

// Mock do OutputParserFactory
jest.mock('../../../src/application/factory/output-parser.factory.js');

// Mock do logger
jest.mock('pino', () => {
  return jest.fn(() => ({
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  }));
});

// Mock do config
jest.mock('../../../src/config/output-format.config.js', () => ({
  outputFormatConfig: {
    maxSchemaSize: 10240,
    maxDepth: 5,
    parseTimeout: 5000,
    defaultMode: 'string',
    enableDebugLogs: false,
  },
}));

describe('LLMService', () => {
  let llmService: LLMService;
  let mockLLMAdapter: jest.Mocked<ILLMAdapter>;
  let mockOutputParserFactory: jest.Mocked<OutputParserFactory>;

  beforeEach(() => {
    // Mock do LLM Adapter
    mockLLMAdapter = {
      generateCompletion: jest.fn(),
    };

    // Mock do OutputParserFactory
    mockOutputParserFactory = {
      getStrategy: jest.fn(),
      registerStrategy: jest.fn(),
      cleanup: jest.fn(),
    } as any;

    // Mock do OutputParserFactory.getInstance
    (OutputParserFactory.getInstance as jest.Mock).mockReturnValue(mockOutputParserFactory);

    // Mock de estratégia de parser
    const mockStrategy = {
      parse: jest.fn(),
      isSupported: jest.fn().mockReturnValue(true),
    };

    mockOutputParserFactory.getStrategy.mockReturnValue(mockStrategy);

    llmService = new LLMService(mockLLMAdapter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generateCompletion', () => {
    const mockLLMResponse: LLMResponse = {
      content: 'Test response',
      model: 'gpt-3.5-turbo',
      finishReason: 'stop',
      usage: {
        promptTokens: 10,
        completionTokens: 5,
        totalTokens: 15,
      },
    };

    test('should generate completion without output format', async () => {
      // Arrange
      const request: LLMRequest = {
        prompt: 'Test prompt',
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        maxTokens: 100,
      };

      mockLLMAdapter.generateCompletion.mockResolvedValue(mockLLMResponse);

      // Act
      const result = await llmService.generateCompletion(request);

      // Assert
      expect(result).toEqual({
        success: true,
        data: 'Test response',
        metadata: {
          model: 'gpt-3.5-turbo',
          finishReason: 'stop',
          tokensUsed: 15,
          processingTime: expect.any(Number),
        },
      });
      expect(mockLLMAdapter.generateCompletion).toHaveBeenCalledWith(request);
    });

    test('should generate completion with output format', async () => {
      // Arrange
      const request: LLMRequest = {
        prompt: 'Test prompt',
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        maxTokens: 100,
        outputFormat: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            age: { type: 'number' },
          },
        },
      };

      const parsedResponse = { name: 'Test', age: 25 };
      mockLLMAdapter.generateCompletion.mockResolvedValue(mockLLMResponse);

      const mockStrategy = mockOutputParserFactory.getStrategy(request.outputFormat!);
      (mockStrategy.parse as jest.Mock).mockReturnValue(parsedResponse);

      // Act
      const result = await llmService.generateCompletion(request);

      // Assert
      expect(result).toEqual({
        success: true,
        data: parsedResponse,
        metadata: {
          model: 'gpt-3.5-turbo',
          finishReason: 'stop',
          tokensUsed: 15,
          processingTime: expect.any(Number),
        },
      });
      expect(mockOutputParserFactory.getStrategy).toHaveBeenCalledWith(request.outputFormat);
      expect(mockStrategy.parse).toHaveBeenCalledWith(
        mockLLMResponse.content,
        request.outputFormat,
      );
    });

    test('should handle LLM adapter errors', async () => {
      // Arrange
      const request: LLMRequest = {
        prompt: 'Test prompt',
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        maxTokens: 100,
      };

      mockLLMAdapter.generateCompletion.mockRejectedValue(new Error('LLM Error'));

      // Act
      const result = await llmService.generateCompletion(request);

      // Assert
      expect(result).toEqual({
        success: false,
        error: 'LLM Error',
        code: 'LLM_PROCESSING_ERROR',
      });
    });

    test('should handle parser errors and fallback to string', async () => {
      // Arrange
      const request: LLMRequest = {
        prompt: 'Test prompt',
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        maxTokens: 100,
        outputFormat: {
          type: 'object',
          properties: {
            name: { type: 'string' },
          },
        },
      };

      mockLLMAdapter.generateCompletion.mockResolvedValue(mockLLMResponse);

      const mockStrategy = mockOutputParserFactory.getStrategy(request.outputFormat!);
      (mockStrategy.parse as jest.Mock).mockImplementation(() => {
        throw new Error('Parse error');
      });

      // Act
      const result = await llmService.generateCompletion(request);

      // Assert
      expect(result).toEqual({
        success: true,
        data: 'Test response', // Fallback to string
        metadata: {
          model: 'gpt-3.5-turbo',
          finishReason: 'stop',
          tokensUsed: 15,
          processingTime: expect.any(Number),
        },
      });
    });

    test('should validate output format size', async () => {
      // Arrange
      const largeSchema = {
        type: 'object' as const,
        properties: {},
        description: 'A'.repeat(11000), // Exceeds maxSchemaSize
      };

      const request: LLMRequest = {
        prompt: 'Test prompt',
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        maxTokens: 100,
        outputFormat: largeSchema,
      };

      // Act
      const result = await llmService.generateCompletion(request);

      // Assert
      expect(result).toEqual({
        success: false,
        error: expect.stringContaining('Output format muito grande'),
        code: 'LLM_PROCESSING_ERROR',
      });
    });
  });
});
