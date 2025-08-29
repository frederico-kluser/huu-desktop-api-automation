// Mock das dependências antes de qualquer import
jest.mock('../../../../src/config/logger.js', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock('../../../../src/interface/middleware/error-handler.middleware.js', () => ({
  LimitExceededError: class LimitExceededError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'LimitExceededError';
    }
  },
}));

// Usar require devido ao verbatimModuleSyntax
const { OcrController } = require('../../../../src/interface/controllers/ocr.controller');
const { OcrService } = require('../../../../src/application/services/ocr.service');
const { OcrRequest, OcrBatchRequest } = require('../../../../src/application/dto/ocr-request.dto');
const { OCRErrorCode } = require('../../../../src/types/ocr.types');
const {
  LimitExceededError,
} = require('../../../../src/interface/middleware/error-handler.middleware');
const { logger } = require('../../../../src/config/logger');

describe('OcrController', () => {
  let ocrController: any;
  let mockOcrService: any;
  let mockFastifyInstance: any;
  let mockRequest: any;
  let mockReply: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock do OcrService
    mockOcrService = {
      processImage: jest.fn(),
      processBatch: jest.fn(),
      getMetrics: jest.fn(),
      clearCache: jest.fn(),
      isReady: jest.fn(),
    };

    // Mock da instância Fastify
    mockFastifyInstance = {
      post: jest.fn(),
      get: jest.fn(),
    };

    // Mock do reply
    mockReply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mock do request
    mockRequest = {
      body: {},
      ip: '127.0.0.1',
      headers: {
        'user-agent': 'test-agent',
        'x-api-key': 'test-key',
      },
    };

    // Criar instância do controller
    ocrController = new OcrController(mockOcrService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('registerRoutes', () => {
    test('deve registrar todas as rotas OCR', () => {
      ocrController.registerRoutes(mockFastifyInstance);

      // Verificar registro de rotas
      expect(mockFastifyInstance.post).toHaveBeenCalledTimes(3);
      expect(mockFastifyInstance.get).toHaveBeenCalledTimes(2);

      // Verificar rotas específicas
      const postCalls = mockFastifyInstance.post.mock.calls;
      const getCalls = mockFastifyInstance.get.mock.calls;

      expect(postCalls[0][0]).toBe('/ocr/base64');
      expect(postCalls[1][0]).toBe('/ocr/batch');
      expect(postCalls[2][0]).toBe('/ocr/cache/clear');
      expect(getCalls[0][0]).toBe('/ocr/metrics');
      expect(getCalls[1][0]).toBe('/ocr/health');

      expect(logger.info).toHaveBeenCalledWith('Rotas OCR registradas com sucesso');
    });

    test('deve configurar schemas corretamente', () => {
      ocrController.registerRoutes(mockFastifyInstance);

      const base64Route = mockFastifyInstance.post.mock.calls[0];
      const routeConfig = base64Route[1];

      // Autenticação removida - não há mais preHandler
      expect(routeConfig.preHandler).toBeUndefined();
      expect(routeConfig.schema).toBeDefined();
      expect(routeConfig.schema.body).toBeDefined();
      expect(routeConfig.schema.response).toBeDefined();
    });
  });

  describe('processBase64Image', () => {
    const validImageData =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

    beforeEach(() => {
      // Mock do OcrRequest.fromRawData
      jest.spyOn(OcrRequest, 'fromRawData').mockImplementation((data: any) => ({
        image: validImageData,
        config: {},
        getImageBuffer: jest.fn().mockReturnValue(Buffer.from('test')),
      }));
    });

    test('deve processar imagem com sucesso', async () => {
      const mockResult = {
        text: 'Texto extraído',
        words: ['Texto', 'extraído'],
        confidence: 0.95,
      };

      mockOcrService.processImage.mockResolvedValue(mockResult);
      mockRequest.body = { image: validImageData };

      await ocrController.processBase64Image(mockRequest, mockReply);

      expect(OcrRequest.fromRawData).toHaveBeenCalledWith(mockRequest.body);
      expect(mockOcrService.processImage).toHaveBeenCalledWith(validImageData, {});
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith(mockResult);
      expect(logger.info).toHaveBeenCalledWith('Requisição OCR recebida', expect.any(Object));
      expect(logger.info).toHaveBeenCalledWith('OCR processado com sucesso', expect.any(Object));
    });

    test('deve tratar erro de imagem inválida', async () => {
      const error = new Error('Imagem inválida');
      (error as any).code = OCRErrorCode.INVALID_IMAGE;

      mockOcrService.processImage.mockRejectedValue(error);
      mockRequest.body = { image: 'invalid' };

      await ocrController.processBase64Image(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        error: 'Imagem inválida',
        code: OCRErrorCode.INVALID_IMAGE,
      });
    });

    test('deve logar tamanho da imagem', async () => {
      mockOcrService.processImage.mockResolvedValue({ text: 'test' });
      mockRequest.body = { image: validImageData };

      await ocrController.processBase64Image(mockRequest, mockReply);

      expect(logger.debug).toHaveBeenCalledWith(expect.stringContaining('Tamanho da imagem:'));
    });
  });

  describe('processBatch', () => {
    beforeEach(() => {
      // Mock do OcrBatchRequest.fromRawData
      jest.spyOn(OcrBatchRequest, 'fromRawData').mockImplementation((data: any) => ({
        images: data.images || [],
        config: {},
      }));
    });

    test('deve processar lote com sucesso', async () => {
      const mockResults = [
        { success: true, text: 'Texto 1' },
        { success: true, text: 'Texto 2' },
        { success: false, error: 'Erro' },
      ];

      mockOcrService.processBatch.mockResolvedValue(mockResults);
      mockRequest.body = { images: ['img1', 'img2', 'img3'] };

      await ocrController.processBatch(mockRequest, mockReply);

      expect(OcrBatchRequest.fromRawData).toHaveBeenCalledWith(mockRequest.body);
      expect(mockOcrService.processBatch).toHaveBeenCalled();
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        results: mockResults,
        totalProcessed: 3,
      });
      expect(logger.info).toHaveBeenCalledWith('Requisição OCR em lote recebida', {
        imageCount: 3,
      });
      expect(logger.info).toHaveBeenCalledWith('Lote OCR processado', {
        totalImages: 3,
        successCount: 2,
      });
    });

    test('deve tratar erro no processamento em lote', async () => {
      const error = new Error('Erro no lote');
      mockOcrService.processBatch.mockRejectedValue(error);
      mockRequest.body = { images: ['img1'] };

      await ocrController.processBatch(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        error: 'Erro interno no processamento OCR',
        code: OCRErrorCode.UNKNOWN_ERROR,
      });
    });
  });

  describe('getMetrics', () => {
    test('deve retornar métricas com sucesso', async () => {
      const mockMetrics = {
        totalJobs: 100,
        successRate: 0.95,
        cacheSize: 50,
        uptime: 3600,
        isInitialized: true,
      };

      mockOcrService.getMetrics.mockReturnValue(mockMetrics);

      await ocrController.getMetrics(mockRequest, mockReply);

      expect(mockOcrService.getMetrics).toHaveBeenCalled();
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith(mockMetrics);
    });

    test('deve tratar erro ao obter métricas', async () => {
      mockOcrService.getMetrics.mockImplementation(() => {
        throw new Error('Erro nas métricas');
      });

      await ocrController.getMetrics(mockRequest, mockReply);

      expect(logger.error).toHaveBeenCalledWith('Erro ao obter métricas OCR', expect.any(Error));
      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        error: 'Falha ao obter métricas',
        code: OCRErrorCode.UNKNOWN_ERROR,
      });
    });
  });

  describe('clearCache', () => {
    test('deve limpar cache com sucesso', async () => {
      await ocrController.clearCache(mockRequest, mockReply);

      expect(mockOcrService.clearCache).toHaveBeenCalled();
      expect(logger.info).toHaveBeenCalledWith('Cache OCR limpo');
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        message: 'Cache limpo com sucesso',
      });
    });

    test('deve tratar erro ao limpar cache', async () => {
      mockOcrService.clearCache.mockImplementation(() => {
        throw new Error('Erro ao limpar cache');
      });

      await ocrController.clearCache(mockRequest, mockReply);

      expect(logger.error).toHaveBeenCalledWith('Erro ao limpar cache OCR', expect.any(Error));
      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        error: 'Falha ao limpar cache',
        code: OCRErrorCode.UNKNOWN_ERROR,
      });
    });
  });

  describe('healthCheck', () => {
    test('deve retornar healthy quando serviço está pronto', async () => {
      mockOcrService.isReady.mockReturnValue(true);
      mockOcrService.getMetrics.mockReturnValue({
        uptime: 3600,
        isInitialized: true,
        totalJobs: 100,
        successRate: 0.95,
        cacheSize: 50,
      });

      await ocrController.healthCheck(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'healthy',
          timestamp: expect.any(String),
          uptime: 3600,
          initialized: true,
          details: {
            totalJobs: 100,
            successRate: 0.95,
            cacheSize: 50,
          },
        }),
      );
    });

    test('deve retornar unhealthy quando serviço não está pronto', async () => {
      mockOcrService.isReady.mockReturnValue(false);
      mockOcrService.getMetrics.mockReturnValue({
        uptime: 0,
        isInitialized: false,
        totalJobs: 0,
        successRate: 0,
        cacheSize: 0,
      });

      await ocrController.healthCheck(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(503);
      expect(mockReply.send).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'unhealthy',
        }),
      );
    });

    test('deve tratar erro no health check', async () => {
      const error = new Error('Health check error');
      mockOcrService.isReady.mockImplementation(() => {
        throw error;
      });

      await ocrController.healthCheck(mockRequest, mockReply);

      expect(logger.error).toHaveBeenCalledWith('Erro no health check OCR', error);
      expect(mockReply.code).toHaveBeenCalledWith(503);
      expect(mockReply.send).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'unhealthy',
          timestamp: expect.any(String),
          error: 'Health check error',
        }),
      );
    });
  });

  describe('handleOcrError', () => {
    test('deve tratar erro INVALID_IMAGE', () => {
      const error = new Error('Imagem inválida');
      (error as any).code = OCRErrorCode.INVALID_IMAGE;

      ocrController.handleOcrError(error, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        error: 'Imagem inválida',
        code: OCRErrorCode.INVALID_IMAGE,
      });
    });

    test('deve tratar erro PROCESSING_TIMEOUT', () => {
      const error = new Error('Timeout');
      (error as any).code = OCRErrorCode.PROCESSING_TIMEOUT;

      ocrController.handleOcrError(error, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(504);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        error: 'Timeout',
        code: OCRErrorCode.PROCESSING_TIMEOUT,
      });
    });

    test('deve tratar erro OUT_OF_MEMORY', () => {
      const error = new Error('Sem memória');
      (error as any).code = OCRErrorCode.OUT_OF_MEMORY;

      ocrController.handleOcrError(error, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(507);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        error: 'Sem memória',
        code: OCRErrorCode.OUT_OF_MEMORY,
      });
    });

    test('deve tratar erro NO_TEXT_FOUND', () => {
      const error = new Error('Sem texto');
      (error as any).code = OCRErrorCode.NO_TEXT_FOUND;

      ocrController.handleOcrError(error, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(204);
      expect(mockReply.send).toHaveBeenCalledWith();
    });

    test('deve tratar erro WORKER_NOT_INITIALIZED', () => {
      const error = new Error('Worker não inicializado');
      (error as any).code = OCRErrorCode.WORKER_NOT_INITIALIZED;

      ocrController.handleOcrError(error, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(503);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        error: 'Serviço OCR não está pronto',
        code: OCRErrorCode.WORKER_NOT_INITIALIZED,
      });
    });

    test('deve tratar erro UNSUPPORTED_FORMAT', () => {
      const error = new Error('Formato não suportado');
      (error as any).code = OCRErrorCode.UNSUPPORTED_FORMAT;

      ocrController.handleOcrError(error, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(415);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        error: 'Formato não suportado',
        code: OCRErrorCode.UNSUPPORTED_FORMAT,
      });
    });

    test('deve lançar LimitExceededError para erro 413', () => {
      const error = new Error('Payload too large');
      (error as any).statusCode = 413;

      expect(() => ocrController.handleOcrError(error, mockReply)).toThrow(LimitExceededError);
    });

    test('deve lançar LimitExceededError quando mensagem contém "excede"', () => {
      const error = new Error('Imagem excede o tamanho máximo');

      expect(() => ocrController.handleOcrError(error, mockReply)).toThrow(LimitExceededError);
    });

    test('deve tratar ZodError', () => {
      const error = new Error('Validation error');
      (error as any).name = 'ZodError';
      (error as any).errors = [{ path: ['image'], message: 'Required' }];

      ocrController.handleOcrError(error, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        error: 'Dados de entrada inválidos',
        code: OCRErrorCode.INVALID_IMAGE,
        details: [{ path: ['image'], message: 'Required' }],
      });
    });

    test('deve tratar erro genérico', () => {
      const error = new Error('Erro desconhecido');

      ocrController.handleOcrError(error, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        error: 'Erro interno no processamento OCR',
        code: OCRErrorCode.UNKNOWN_ERROR,
      });
    });

    test('deve logar todos os erros', () => {
      const error = new Error('Teste de log');
      (error as any).code = 'TEST_CODE';
      (error as any).stack = 'stack trace';

      ocrController.handleOcrError(error, mockReply);

      expect(logger.error).toHaveBeenCalledWith('Erro no processamento OCR', {
        code: 'TEST_CODE',
        message: 'Teste de log',
        stack: 'stack trace',
      });
    });
  });

  // Testes para garantir coverage de edge cases
  describe('edge cases e coverage', () => {
    test('deve cobrir construtor', () => {
      const instance = new OcrController(mockOcrService);
      expect(instance).toBeDefined();
    });

    test('deve cobrir bind de métodos nas rotas', () => {
      ocrController.registerRoutes(mockFastifyInstance);

      // Verificar que os handlers estão vinculados corretamente
      const handlers = [
        mockFastifyInstance.post.mock.calls[0][2], // processBase64Image
        mockFastifyInstance.post.mock.calls[1][2], // processBatch
        mockFastifyInstance.get.mock.calls[0][2], // getMetrics
        mockFastifyInstance.post.mock.calls[2][2], // clearCache
        mockFastifyInstance.get.mock.calls[1][1], // healthCheck (sem middleware)
      ];

      handlers.forEach((handler) => {
        expect(typeof handler).toBe('function');
      });
    });

    test('deve executar todos os métodos privados através das rotas', async () => {
      // Registrar rotas
      ocrController.registerRoutes(mockFastifyInstance);

      // Executar handler de processBase64Image
      const processBase64Handler = mockFastifyInstance.post.mock.calls[0][2];
      mockOcrService.processImage.mockResolvedValue({ text: 'test' });
      await processBase64Handler(mockRequest, mockReply);

      // Executar handler de processBatch
      const processBatchHandler = mockFastifyInstance.post.mock.calls[1][2];
      mockOcrService.processBatch.mockResolvedValue([]);
      mockRequest.body = { images: [] };
      await processBatchHandler(mockRequest, mockReply);

      // Executar handler de getMetrics
      const getMetricsHandler = mockFastifyInstance.get.mock.calls[0][2];
      mockOcrService.getMetrics.mockReturnValue({});
      await getMetricsHandler(mockRequest, mockReply);

      // Executar handler de clearCache
      const clearCacheHandler = mockFastifyInstance.post.mock.calls[2][2];
      await clearCacheHandler(mockRequest, mockReply);

      // Executar handler de healthCheck
      const healthCheckHandler = mockFastifyInstance.get.mock.calls[1][1];
      mockOcrService.isReady.mockReturnValue(true);
      mockOcrService.getMetrics.mockReturnValue({
        uptime: 0,
        isInitialized: true,
        totalJobs: 0,
        successRate: 0,
        cacheSize: 0,
      });
      await healthCheckHandler(mockRequest, mockReply);
    });
  });
});
