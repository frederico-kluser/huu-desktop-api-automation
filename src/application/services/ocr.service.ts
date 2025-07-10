/**
 * Serviço principal de OCR
 * Orquestra o pré-processamento de imagem e reconhecimento de texto
 */

import { injectable, inject } from 'tsyringe';
import { logger } from '../../config/logger.js';
import { ocrConfig, getModeConfig } from '../../config/ocr.config.js';
import { ImagePreprocessor } from './image-preprocessor.service.js';
import { OcrWorkerPool } from './ocr-worker-pool.service.js';
import { OCRErrorCode } from '../../types/ocr.types.js';
import type {
  OCRResponse,
  OCRProcessingConfig,
  OCRWordResponse,
  OCRLine,
  PreprocessingOptions,
} from '../../types/ocr.types.js';
import * as crypto from 'crypto';

/**
 * Cache LRU simples para resultados OCR
 */
class LRUCache<T> {
  private cache: Map<string, { value: T; timestamp: number }> = new Map();
  private readonly maxSize: number;
  private readonly ttl: number;

  constructor(maxSize: number = 10000, ttl: number = 0) {
    this.maxSize = maxSize;
    this.ttl = ttl * 1000; // Converter para ms
  }

  get(key: string): T | undefined {
    const item = this.cache.get(key);
    if (!item) return undefined;

    // Verificar TTL
    if (this.ttl > 0 && Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return undefined;
    }

    // Mover para o final (mais recente)
    this.cache.delete(key);
    this.cache.set(key, item);

    return item.value;
  }

  set(key: string, value: T): void {
    // Remover se já existe
    this.cache.delete(key);

    // Verificar limite de tamanho
    if (this.cache.size >= this.maxSize) {
      // Remover o mais antigo (primeiro)
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(key, { value, timestamp: Date.now() });
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

/**
 * Serviço responsável por coordenar o processo completo de OCR
 */
@injectable()
export class OcrService {
  private cache: LRUCache<OCRResponse>;
  private isInitialized: boolean = false;

  constructor(
    @inject(ImagePreprocessor) private imagePreprocessor: ImagePreprocessor,
    @inject(OcrWorkerPool) private workerPool: OcrWorkerPool,
  ) {
    this.cache = new LRUCache<OCRResponse>(10000, ocrConfig.cacheTtl);
  }

  /**
   * Inicializa o serviço OCR
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      logger.warn('OcrService já está inicializado');
      return;
    }

    try {
      logger.info('Inicializando OcrService');
      await this.workerPool.initialize();
      this.isInitialized = true;
      logger.info('OcrService inicializado com sucesso');
    } catch (error: any) {
      logger.error('Falha ao inicializar OcrService', error);
      throw error;
    }
  }

  /**
   * Processa uma imagem base64 e extrai texto
   * @param base64Image Imagem em formato base64
   * @param config Configuração opcional de processamento
   * @returns Resposta com texto extraído e coordenadas
   */
  async processImage(base64Image: string, config?: OCRProcessingConfig): Promise<OCRResponse> {
    const startTime = Date.now();

    try {
      // Verificar se está inicializado
      if (!this.isInitialized) {
        await this.initialize();
      }

      // Extrair dados da imagem base64
      const imageData = base64Image.replace(/^data:image\/\w+;base64,/, '');
      const imageBuffer = Buffer.from(imageData, 'base64');

      // Validar tamanho da imagem
      const sizeMb = imageBuffer.length / (1024 * 1024);
      if (sizeMb > ocrConfig.maxImageSizeMb) {
        throw {
          code: OCRErrorCode.INVALID_IMAGE,
          message: `Imagem excede o tamanho máximo de ${ocrConfig.maxImageSizeMb}MB`,
          statusCode: 413,
        };
      }

      // Verificar cache se habilitado
      if (ocrConfig.cacheTtl > 0) {
        const cacheKey = this.generateCacheKey(imageBuffer);
        const cachedResult = this.cache.get(cacheKey);
        if (cachedResult) {
          logger.debug('Resultado OCR obtido do cache');
          return {
            ...cachedResult,
            processingTime: Date.now() - startTime,
          };
        }
      }

      // Validar imagem
      const isValid = await this.imagePreprocessor.isValidImage(imageBuffer);
      if (!isValid) {
        throw {
          code: OCRErrorCode.INVALID_IMAGE,
          message: 'Formato de imagem inválido ou corrompido',
          statusCode: 400,
        };
      }

      // Obter configuração de modo
      const mode = config?.mode || ocrConfig.defaultMode;
      const modeConfig = getModeConfig(mode);

      // Configurar worker pool para o modo
      await this.workerPool.setMode(mode);

      // Pré-processar imagem
      logger.debug('Iniciando pré-processamento de imagem');
      const preprocessingOptions: PreprocessingOptions = {
        ...ocrConfig.preprocessing,
        ...modeConfig.preprocessing,
      };

      const processedImage = await this.imagePreprocessor.adaptivePreprocess(imageBuffer);

      // Realizar OCR com timeout
      logger.debug('Iniciando reconhecimento OCR');
      const ocrResult = await this.performOCRWithTimeout(
        processedImage,
        config?.timeout || modeConfig.timeout,
      );

      // Formatar resposta
      const response = this.formatOCRResponse(ocrResult, startTime);

      // Verificar se encontrou texto
      if (!response.text || response.text.trim().length === 0) {
        throw {
          code: OCRErrorCode.NO_TEXT_FOUND,
          message: 'Nenhum texto foi encontrado na imagem',
          statusCode: 204,
        };
      }

      // Armazenar em cache se habilitado
      if (ocrConfig.cacheTtl > 0) {
        const cacheKey = this.generateCacheKey(imageBuffer);
        this.cache.set(cacheKey, response);
      }

      return response;
    } catch (error: any) {
      logger.error('Erro no processamento OCR', error);

      // Tratar erros específicos
      if (error.code && error.statusCode) {
        throw error;
      }

      // Erro genérico
      throw {
        code: OCRErrorCode.UNKNOWN_ERROR,
        message: error.message || 'Erro desconhecido no processamento OCR',
        statusCode: 500,
      };
    }
  }

  /**
   * Realiza OCR com timeout
   * @param imageBuffer Buffer da imagem processada
   * @param timeout Timeout em ms
   * @returns Resultado do OCR
   */
  private async performOCRWithTimeout(imageBuffer: Buffer, timeout: number): Promise<any> {
    return Promise.race([
      this.workerPool.recognizeWithCoordinates(imageBuffer),
      new Promise((_, reject) =>
        setTimeout(
          () =>
            reject({
              code: OCRErrorCode.PROCESSING_TIMEOUT,
              message: `Processamento OCR excedeu o tempo limite de ${timeout}ms`,
              statusCode: 504,
            }),
          timeout,
        ),
      ),
    ]);
  }

  /**
   * Formata a resposta do OCR
   * @param ocrData Dados brutos do Tesseract
   * @param startTime Tempo de início do processamento
   * @returns Resposta formatada
   */
  private formatOCRResponse(ocrData: any, startTime: number): OCRResponse {
    // Formatar palavras com bounding boxes simplificadas
    const words: OCRWordResponse[] =
      ocrData.words?.map((word: any) => ({
        text: word.text,
        confidence: word.confidence,
        bbox: {
          x: word.bbox.x0,
          y: word.bbox.y0,
          width: word.bbox.x1 - word.bbox.x0,
          height: word.bbox.y1 - word.bbox.y0,
        },
      })) || [];

    // Formatar linhas
    const lines: OCRLine[] =
      ocrData.lines?.map((line: any) => ({
        text: line.text,
        confidence: line.confidence,
        bbox: line.bbox,
        words: line.words || [],
      })) || [];

    return {
      success: true,
      text: ocrData.text || '',
      confidence: ocrData.confidence || 0,
      words,
      lines,
      processingTime: Date.now() - startTime,
    };
  }

  /**
   * Gera chave de cache baseada no hash da imagem
   * @param buffer Buffer da imagem
   * @returns Chave hash
   */
  private generateCacheKey(buffer: Buffer): string {
    return crypto.createHash('sha256').update(buffer).digest('hex');
  }

  /**
   * Processa múltiplas imagens em lote
   * @param base64Images Array de imagens base64
   * @param config Configuração opcional
   * @returns Array de respostas OCR
   */
  async processBatch(base64Images: string[], config?: OCRProcessingConfig): Promise<OCRResponse[]> {
    logger.info(`Processando lote de ${base64Images.length} imagens`);

    // Processar imagens em paralelo
    const promises = base64Images.map((image) =>
      this.processImage(image, config).catch((error) => ({
        success: false,
        text: '',
        confidence: 0,
        words: [],
        lines: [],
        processingTime: 0,
        error: error.message || 'Erro desconhecido',
      })),
    );

    return Promise.all(promises);
  }

  /**
   * Obtém métricas do serviço
   * @returns Métricas atuais
   */
  getMetrics() {
    const poolMetrics = this.workerPool.getMetrics();

    return {
      ...poolMetrics,
      cacheSize: this.cache.size(),
      isInitialized: this.isInitialized,
    };
  }

  /**
   * Limpa o cache de resultados
   */
  clearCache(): void {
    this.cache.clear();
    logger.info('Cache OCR limpo');
  }

  /**
   * Verifica se o serviço está pronto
   * @returns True se pronto para processar
   */
  isReady(): boolean {
    return this.isInitialized && this.workerPool.isReady();
  }

  /**
   * Finaliza o serviço e libera recursos
   */
  async shutdown(): Promise<void> {
    logger.info('Finalizando OcrService');

    try {
      await this.workerPool.terminate();
      this.cache.clear();
      this.isInitialized = false;
      logger.info('OcrService finalizado com sucesso');
    } catch (error: any) {
      logger.error('Erro ao finalizar OcrService', error);
      throw error;
    }
  }
}
