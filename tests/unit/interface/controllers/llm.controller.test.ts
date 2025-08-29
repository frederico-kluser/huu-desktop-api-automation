// Mocks antes de qualquer import
jest.mock('pino', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    info: jest.fn(),
    error: jest.fn(),
  })),
}));

jest.mock('tsyringe', () => ({
  container: {
    resolve: jest.fn(),
  },
}));

jest.mock('../../../../src/interface/middleware/auth.middleware.js', () => ({
  authenticationMiddleware: jest.fn(),
}));

jest.mock('../../../../src/interface/schemas/llm.schemas.js', () => ({
  llmRequestJsonSchema: {
    type: 'object',
    properties: {
      prompt: { type: 'string' },
      model: { type: 'string' },
      outputFormat: { type: 'object' },
    },
  },
}));

jest.mock('../../../../src/application/dto/llm-request.dto.js', () => ({
  llmRequestSchema: {
    parse: jest.fn(),
  },
}));

jest.mock('../../../../src/config/output-format.config.js', () => ({
  outputFormatConfig: {
    maxSchemaSize: 1000,
  },
}));

// Imports após mocks
const { container } = require('tsyringe');
const { llmRequestSchema } = require('../../../../src/application/dto/llm-request.dto.js');
const { LLMController } = require('../../../../src/interface/controllers/llm.controller.js');

describe('LLMController', () => {
  let controller: any;
  let mockServer: any;
  let mockLLMService: any;
  let mockRequest: any;
  let mockReply: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock do LLMService
    mockLLMService = {
      generateCompletion: jest.fn(),
    };

    // Mock do container.resolve
    (container.resolve as jest.Mock).mockReturnValue(mockLLMService);

    // Mock do servidor Fastify
    mockServer = {
      post: jest.fn(),
    };

    // Mock do request/reply
    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    mockRequest = {
      body: {},
      headers: {
        'x-api-key': 'test-key',
      },
    };

    // Criar instância do controller
    controller = new LLMController();
  });

  describe('constructor', () => {
    test('should create instance and resolve LLMService', () => {
      expect(container.resolve).toHaveBeenCalledWith('LLMService');
      expect(controller).toBeDefined();
    });
  });

  describe('registerRoutes', () => {
    test('should register POST /llm route with correct configuration', () => {
      controller.registerRoutes(mockServer);

      expect(mockServer.post).toHaveBeenCalledWith(
        '/llm',
        expect.objectContaining({
          schema: expect.objectContaining({
            body: expect.any(Object),
            response: expect.any(Object),
          }),
        }),
        expect.any(Function),
      );

      // Verificar estrutura do schema
      const callArgs = mockServer.post.mock.calls[0];
      const schema = callArgs[1].schema;

      // Autenticação removida - não há mais headers
      expect(schema.headers).toBeUndefined();
      expect(schema.response[200]).toBeDefined();
      expect(schema.response[400]).toBeDefined();
      expect(schema.response[401]).toBeDefined();
      expect(schema.response[413]).toBeDefined();
      expect(schema.response[422]).toBeDefined();
      expect(schema.response[500]).toBeDefined();
    });
  });

  describe('generateCompletion', () => {
    test('should process valid request successfully', async () => {
      const validatedRequest = {
        prompt: 'test prompt',
        model: 'gpt-4',
        outputFormat: { type: 'string' },
      };

      const serviceResponse = {
        success: true,
        data: 'test response',
        metadata: {
          model: 'gpt-4',
          tokensUsed: 100,
        },
      };

      llmRequestSchema.parse.mockReturnValue(validatedRequest);
      mockLLMService.generateCompletion.mockResolvedValue(serviceResponse);

      await controller.generateCompletion(mockRequest, mockReply);

      expect(llmRequestSchema.parse).toHaveBeenCalledWith(mockRequest.body);
      expect(mockLLMService.generateCompletion).toHaveBeenCalledWith(validatedRequest);
      expect(mockReply.send).toHaveBeenCalledWith(serviceResponse);
    });

    test('should reject request with oversized outputFormat', async () => {
      const largeSchema: any = { type: 'object', properties: {} };
      // Criar um schema grande
      for (let i = 0; i < 100; i++) {
        largeSchema.properties[`field${i}`] = {
          type: 'string',
          description: 'A very long description',
        };
      }

      const validatedRequest = {
        prompt: 'test',
        model: 'gpt-4',
        outputFormat: largeSchema,
      };

      llmRequestSchema.parse.mockReturnValue(validatedRequest);

      await controller.generateCompletion(mockRequest, mockReply);

      expect(mockReply.status).toHaveBeenCalledWith(413);
      expect(mockReply.send).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          code: 'SCHEMA_TOO_LARGE',
        }),
      );
    });

    test('should handle service error with JSON validation failure', async () => {
      const validatedRequest = {
        prompt: 'test',
        model: 'gpt-4',
      };

      llmRequestSchema.parse.mockReturnValue(validatedRequest);
      mockLLMService.generateCompletion.mockResolvedValue({
        success: false,
        error: 'Erro ao gerar JSON válido',
      });

      await controller.generateCompletion(mockRequest, mockReply);

      expect(mockReply.status).toHaveBeenCalledWith(422);
      expect(mockReply.send).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          code: 'INVALID_JSON_OUTPUT',
        }),
      );
    });

    test('should handle service error with unsupported format', async () => {
      const validatedRequest = {
        prompt: 'test',
        model: 'gpt-4',
      };

      llmRequestSchema.parse.mockReturnValue(validatedRequest);
      mockLLMService.generateCompletion.mockResolvedValue({
        success: false,
        error: 'Formato não suportado',
      });

      await controller.generateCompletion(mockRequest, mockReply);

      expect(mockReply.status).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          code: 'UNSUPPORTED_FORMAT',
        }),
      );
    });

    test('should handle service error with output parsing error', async () => {
      const validatedRequest = {
        prompt: 'test',
        model: 'gpt-4',
      };

      llmRequestSchema.parse.mockReturnValue(validatedRequest);
      mockLLMService.generateCompletion.mockResolvedValue({
        success: false,
        error: 'Erro ao processar output format',
      });

      await controller.generateCompletion(mockRequest, mockReply);

      expect(mockReply.status).toHaveBeenCalledWith(422);
      expect(mockReply.send).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          code: 'OUTPUT_PARSING_ERROR',
        }),
      );
    });

    test('should handle generic service error', async () => {
      const validatedRequest = {
        prompt: 'test',
        model: 'gpt-4',
      };

      llmRequestSchema.parse.mockReturnValue(validatedRequest);
      mockLLMService.generateCompletion.mockResolvedValue({
        success: false,
        error: 'Some other error',
      });

      await controller.generateCompletion(mockRequest, mockReply);

      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          code: 'INTERNAL_ERROR',
        }),
      );
    });

    test('should handle Zod validation error', async () => {
      const zodError = new Error('Validation failed');
      zodError.name = 'ZodError';

      llmRequestSchema.parse.mockImplementation(() => {
        throw zodError;
      });

      await controller.generateCompletion(mockRequest, mockReply);

      expect(mockReply.status).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          code: 'VALIDATION_ERROR',
        }),
      );
    });

    test('should handle unexpected error', async () => {
      llmRequestSchema.parse.mockImplementation(() => {
        throw new Error('Unexpected error');
      });

      await controller.generateCompletion(mockRequest, mockReply);

      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          error: 'Unexpected error',
          code: 'INTERNAL_ERROR',
        }),
      );
    });

    test('should handle non-Error exceptions', async () => {
      llmRequestSchema.parse.mockImplementation(() => {
        throw 'String error';
      });

      await controller.generateCompletion(mockRequest, mockReply);

      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          error: 'Internal server error',
          code: 'INTERNAL_ERROR',
        }),
      );
    });

    test('should process request without outputFormat', async () => {
      const validatedRequest = {
        prompt: 'test prompt',
        model: 'gpt-4',
      };

      const serviceResponse = {
        success: true,
        data: 'response',
      };

      llmRequestSchema.parse.mockReturnValue(validatedRequest);
      mockLLMService.generateCompletion.mockResolvedValue(serviceResponse);

      await controller.generateCompletion(mockRequest, mockReply);

      expect(mockReply.send).toHaveBeenCalledWith(serviceResponse);
    });
  });

  // Test para garantir cobertura de todos os métodos através da instância
  test('should cover all methods through instance calls', () => {
    // Testar que o bind foi aplicado corretamente no registerRoutes
    controller.registerRoutes(mockServer);
    const handler = mockServer.post.mock.calls[0][2];
    expect(typeof handler).toBe('function');
    // Verificar que o handler foi passado corretamente
    expect(mockServer.post.mock.calls[0][0]).toBe('/llm');
  });
});
