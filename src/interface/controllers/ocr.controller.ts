/**
 * Controller para operações OCR
 * Expõe endpoints REST para reconhecimento de texto em imagens
 */

import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { injectable, inject } from 'tsyringe';
import { OcrService } from '../../application/services/ocr.service.js';
import { OcrRequest, OcrBatchRequest } from '../../application/dto/ocr-request.dto.js';
import { logger } from '../../config/logger.js';
import { authenticationMiddleware } from '../middleware/auth.middleware.js';
import {
  ocrBase64RequestSchema,
  ocrBatchRequestSchema,
  ocrResponseSchema,
  ocrErrorResponseSchema,
  ocrMetricsResponseSchema,
  ocrClearCacheRequestSchema,
} from '../schemas/ocr.schemas.js';
import { OCRErrorCode } from '../../types/ocr.types.js';
import type { OCRError } from '../../types/ocr.types.js';
import { LimitExceededError } from '../middleware/error-handler.middleware.js';
import type { OcrRequestDto, OcrBatchRequestDto } from '../../application/dto/ocr-request.dto.js';

/**
 * Controller responsável pelos endpoints OCR
 */
@injectable()
export class OcrController {
  constructor(@inject(OcrService) private ocrService: OcrService) {}

  /**
   * Registra as rotas OCR no Fastify
   * @param app Instância do Fastify
   */
  registerRoutes(app: FastifyInstance): void {
    // Endpoint principal OCR - processar imagem base64
    app.post(
      '/ocr/base64',
      {
        preHandler: authenticationMiddleware,
        schema: {
          body: ocrBase64RequestSchema,
          response: {
            200: ocrResponseSchema,
            400: ocrErrorResponseSchema,
            401: ocrErrorResponseSchema,
            413: ocrErrorResponseSchema,
            500: ocrErrorResponseSchema,
            504: ocrErrorResponseSchema,
          },
          summary: 'Extrair texto de imagem base64',
          description:
            'Processa uma imagem em formato base64 e retorna o texto extraído com coordenadas',
          tags: ['OCR'],
        },
      } as const,
      this.processBase64Image.bind(this),
    );

    // Endpoint para processamento em lote
    app.post(
      '/ocr/batch',
      {
        preHandler: authenticationMiddleware,
        schema: {
          body: ocrBatchRequestSchema,
          summary: 'Processar múltiplas imagens',
          description: 'Processa até 10 imagens em paralelo',
          tags: ['OCR'],
        },
      } as const,
      this.processBatch.bind(this),
    );

    // Endpoint para obter métricas
    app.get(
      '/ocr/metrics',
      {
        preHandler: authenticationMiddleware,
        schema: {
          response: {
            200: ocrMetricsResponseSchema,
          },
          summary: 'Obter métricas do serviço OCR',
          description: 'Retorna estatísticas de uso e performance',
          tags: ['OCR'],
        },
      } as const,
      this.getMetrics.bind(this),
    );

    // Endpoint para limpar cache
    app.post(
      '/ocr/cache/clear',
      {
        preHandler: authenticationMiddleware,
        schema: {
          body: ocrClearCacheRequestSchema,
          summary: 'Limpar cache OCR',
          description: 'Remove todos os resultados em cache',
          tags: ['OCR'],
        },
      } as const,
      this.clearCache.bind(this),
    );

    // Endpoint de health check
    app.get('/ocr/health', this.healthCheck.bind(this));

    logger.info('Rotas OCR registradas com sucesso');
  }

  /**
   * Processa uma imagem base64 e extrai texto
   */
  private async processBase64Image(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const startTime = Date.now();

    try {
      logger.info('Requisição OCR recebida', {
        ip: request.ip,
        userAgent: request.headers['user-agent'],
      });

      // Validar e criar DTO
      const ocrRequest = OcrRequest.fromRawData(request.body);

      // Verificar tamanho
      const sizeMb = ocrRequest.getImageBuffer().length / (1024 * 1024);
      logger.debug(`Tamanho da imagem: ${sizeMb.toFixed(2)}MB`);

      // Processar imagem
      const result = await this.ocrService.processImage(ocrRequest.image, ocrRequest.config);

      logger.info('OCR processado com sucesso', {
        textLength: result.text.length,
        wordCount: result.words.length,
        confidence: result.confidence,
        processingTime: Date.now() - startTime,
      });

      reply.code(200).send(result);
    } catch (error: any) {
      this.handleOcrError(error, reply);
    }
  }

  /**
   * Processa múltiplas imagens em lote
   */
  private async processBatch(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      logger.info('Requisição OCR em lote recebida', {
        imageCount: (request.body as OcrBatchRequestDto).images.length,
      });

      // Validar e criar DTO
      const batchRequest = OcrBatchRequest.fromRawData(request.body);

      // Processar lote
      const results = await this.ocrService.processBatch(batchRequest.images, batchRequest.config);

      logger.info('Lote OCR processado', {
        totalImages: results.length,
        successCount: results.filter((r) => r.success).length,
      });

      reply.code(200).send({
        success: true,
        results,
        totalProcessed: results.length,
      });
    } catch (error: any) {
      this.handleOcrError(error, reply);
    }
  }

  /**
   * Obtém métricas do serviço
   */
  private async getMetrics(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const metrics = this.ocrService.getMetrics();
      reply.code(200).send(metrics);
    } catch (error: any) {
      logger.error('Erro ao obter métricas OCR', error);
      reply.code(500).send({
        success: false,
        error: 'Falha ao obter métricas',
        code: OCRErrorCode.UNKNOWN_ERROR,
      });
    }
  }

  /**
   * Limpa o cache de resultados
   */
  private async clearCache(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      this.ocrService.clearCache();
      logger.info('Cache OCR limpo');

      reply.code(200).send({
        success: true,
        message: 'Cache limpo com sucesso',
      });
    } catch (error: any) {
      logger.error('Erro ao limpar cache OCR', error);
      reply.code(500).send({
        success: false,
        error: 'Falha ao limpar cache',
        code: OCRErrorCode.UNKNOWN_ERROR,
      });
    }
  }

  /**
   * Verifica a saúde do serviço
   */
  private async healthCheck(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const isReady = this.ocrService.isReady();
      const metrics = this.ocrService.getMetrics();

      const status = {
        status: isReady ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        uptime: metrics.uptime,
        initialized: metrics.isInitialized,
        details: {
          totalJobs: metrics.totalJobs,
          successRate: metrics.successRate,
          cacheSize: metrics.cacheSize,
        },
      };

      reply.code(isReady ? 200 : 503).send(status);
    } catch (error: any) {
      logger.error('Erro no health check OCR', error);
      reply.code(503).send({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error.message,
      });
    }
  }

  /**
   * Trata erros OCR e responde adequadamente
   */
  private handleOcrError(error: any, reply: FastifyReply): void {
    logger.error('Erro no processamento OCR', {
      code: error.code,
      message: error.message,
      stack: error.stack,
    });

    // Mapear erros específicos
    if (error.code === OCRErrorCode.INVALID_IMAGE) {
      reply.code(400).send({
        success: false,
        error: error.message,
        code: error.code,
      });
    } else if (error.code === OCRErrorCode.PROCESSING_TIMEOUT) {
      reply.code(504).send({
        success: false,
        error: error.message,
        code: error.code,
      });
    } else if (error.code === OCRErrorCode.OUT_OF_MEMORY) {
      reply.code(507).send({
        success: false,
        error: error.message,
        code: error.code,
      });
    } else if (error.code === OCRErrorCode.NO_TEXT_FOUND) {
      reply.code(204).send();
    } else if (error.code === OCRErrorCode.WORKER_NOT_INITIALIZED) {
      reply.code(503).send({
        success: false,
        error: 'Serviço OCR não está pronto',
        code: error.code,
      });
    } else if (error.code === OCRErrorCode.UNSUPPORTED_FORMAT) {
      reply.code(415).send({
        success: false,
        error: error.message,
        code: error.code,
      });
    } else if (error.statusCode === 413 || error.message?.includes('excede')) {
      throw new LimitExceededError('Imagem excede o tamanho máximo permitido');
    } else if (error.name === 'ZodError') {
      reply.code(400).send({
        success: false,
        error: 'Dados de entrada inválidos',
        code: OCRErrorCode.INVALID_IMAGE,
        details: error.errors,
      });
    } else {
      reply.code(500).send({
        success: false,
        error: 'Erro interno no processamento OCR',
        code: OCRErrorCode.UNKNOWN_ERROR,
      });
    }
  }
}
