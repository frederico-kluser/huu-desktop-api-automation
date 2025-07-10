/**
 * Pool de workers para processamento OCR paralelo
 * Gerencia múltiplos workers Tesseract.js para otimizar performance
 */

import { createWorker, createScheduler, OEM, PSM } from 'tesseract.js';
import type { Worker, Scheduler } from 'tesseract.js';
import { injectable } from 'tsyringe';
import { logger } from '../../config/logger.js';
import { ocrConfig } from '../../config/ocr.config.js';
import type { OCRMetrics } from '../../types/ocr.types.js';
import * as path from 'path';
import * as fs from 'fs/promises';

/**
 * Gerencia um pool de workers Tesseract para processamento paralelo
 * Implementa reciclagem de workers e métricas de performance
 */
@injectable()
export class OcrWorkerPool {
  private scheduler: Scheduler | null = null;
  private workers: Worker[] = [];
  private jobCount: number = 0;
  private readonly maxJobsPerWorker: number;
  private isInitialized: boolean = false;

  // Métricas
  private metrics: OCRMetrics = {
    totalJobs: 0,
    successfulJobs: 0,
    failedJobs: 0,
    averageProcessingTime: 0,
    successRate: 0,
    uptime: Date.now(),
  };

  constructor() {
    this.maxJobsPerWorker = ocrConfig.jobsPerWorker;
  }

  /**
   * Inicializa o pool de workers
   * @param languages Linguagens a serem carregadas
   */
  async initialize(languages: string[] = ocrConfig.languages): Promise<void> {
    if (this.isInitialized) {
      logger.warn('OcrWorkerPool já está inicializado');
      return;
    }

    try {
      logger.info('Inicializando OcrWorkerPool', {
        workerCount: ocrConfig.workerCount,
        languages,
      });

      // Verificar se o diretório de linguagens existe
      await this.ensureLanguageDataExists();

      // Criar scheduler
      this.scheduler = createScheduler();

      // Criar pool de workers
      for (let i = 0; i < ocrConfig.workerCount; i++) {
        const worker = await this.createConfiguredWorker(languages);
        this.workers.push(worker);
        this.scheduler.addWorker(worker);
        logger.debug(`Worker ${i + 1} criado e adicionado ao pool`);
      }

      this.isInitialized = true;
      logger.info('OcrWorkerPool inicializado com sucesso', {
        workerCount: this.workers.length,
      });
    } catch (error: any) {
      logger.error('Falha ao inicializar OcrWorkerPool', error);
      await this.terminate();
      throw new Error(`Falha na inicialização do OCR: ${error.message}`);
    }
  }

  /**
   * Cria um worker configurado
   * @param languages Linguagens a serem carregadas
   * @returns Worker configurado
   */
  private async createConfiguredWorker(languages: string[]): Promise<Worker> {
    const worker = await createWorker(languages, OEM.LSTM_ONLY, {
      langPath: ocrConfig.langPath,
      cachePath: ocrConfig.cachePath,
      cacheMethod: 'write',
      logger: ocrConfig.enableMetrics ? this.logWorkerProgress.bind(this) : undefined,
    });

    // Configurar parâmetros otimizados para precisão
    await worker.setParameters({
      tessedit_pageseg_mode: PSM.AUTO,
      preserve_interword_spaces: '1',
      tessedit_char_whitelist: '',
      tessedit_enable_doc_dict: '1',
      textord_heavy_nr: '1',
    });

    return worker;
  }

  /**
   * Logger personalizado para progresso do worker
   * @param log Log do worker
   */
  private logWorkerProgress(log: any): void {
    if (log.status === 'recognizing text' && log.progress) {
      logger.debug(`OCR progresso: ${Math.round(log.progress * 100)}%`);
    }
  }

  /**
   * Reconhece texto em uma imagem com coordenadas
   * @param imageData Buffer ou caminho da imagem
   * @returns Dados do reconhecimento
   */
  async recognizeWithCoordinates(imageData: string | Buffer): Promise<any> {
    if (!this.isInitialized || !this.scheduler) {
      throw new Error('Worker pool não inicializado');
    }

    const startTime = Date.now();

    try {
      // Verificar se precisa reciclar workers
      if (this.jobCount >= this.maxJobsPerWorker) {
        logger.info('Reciclando workers após atingir limite de jobs');
        await this.recycleWorkers();
        this.jobCount = 0;
      }

      // Adicionar job ao scheduler
      const result = await this.scheduler.addJob('recognize', imageData);

      this.jobCount++;
      this.updateMetrics(true, Date.now() - startTime);

      return result.data;
    } catch (error: any) {
      logger.error('Erro no reconhecimento OCR', error);
      this.updateMetrics(false, Date.now() - startTime);
      throw error;
    }
  }

  /**
   * Processa múltiplas imagens em lote
   * @param images Array de buffers de imagem
   * @returns Array de resultados OCR
   */
  async processBatch(images: Buffer[]): Promise<any[]> {
    if (!this.isInitialized || !this.scheduler) {
      throw new Error('Worker pool não inicializado');
    }

    logger.info(`Processando lote de ${images.length} imagens`);

    // Processar em paralelo usando o scheduler
    const promises = images.map((image) => this.recognizeWithCoordinates(image));
    const results = await Promise.allSettled(promises);

    // Processar resultados
    return results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        logger.error(`Falha ao processar imagem ${index}`, result.reason);
        return { error: result.reason.message };
      }
    });
  }

  /**
   * Recicla os workers para prevenir vazamentos de memória
   */
  private async recycleWorkers(): Promise<void> {
    if (!this.scheduler) return;

    logger.debug('Iniciando reciclagem de workers');

    // Terminar workers atuais
    await this.scheduler.terminate();
    this.workers = [];

    // Criar novo scheduler e workers
    this.scheduler = createScheduler();

    for (let i = 0; i < ocrConfig.workerCount; i++) {
      const worker = await this.createConfiguredWorker(ocrConfig.languages);
      this.workers.push(worker);
      this.scheduler.addWorker(worker);
    }

    logger.debug('Workers reciclados com sucesso');
  }

  /**
   * Atualiza métricas de performance
   * @param success Se o job foi bem-sucedido
   * @param processingTime Tempo de processamento em ms
   */
  private updateMetrics(success: boolean, processingTime: number): void {
    this.metrics.totalJobs++;

    if (success) {
      this.metrics.successfulJobs++;
    } else {
      this.metrics.failedJobs++;
    }

    // Calcular média móvel
    this.metrics.averageProcessingTime =
      (this.metrics.averageProcessingTime * (this.metrics.totalJobs - 1) + processingTime) /
      this.metrics.totalJobs;

    // Calcular taxa de sucesso
    this.metrics.successRate =
      this.metrics.totalJobs > 0 ? this.metrics.successfulJobs / this.metrics.totalJobs : 0;
  }

  /**
   * Obtém métricas do pool
   * @returns Métricas atuais
   */
  getMetrics(): OCRMetrics {
    return {
      ...this.metrics,
      uptime: Date.now() - this.metrics.uptime,
    };
  }

  /**
   * Verifica se o pool está pronto
   * @returns True se inicializado
   */
  isReady(): boolean {
    return this.isInitialized && this.scheduler !== null && this.workers.length > 0;
  }

  /**
   * Termina todos os workers e limpa recursos
   */
  async terminate(): Promise<void> {
    logger.info('Terminando OcrWorkerPool');

    if (this.scheduler) {
      await this.scheduler.terminate();
      this.scheduler = null;
    }

    this.workers = [];
    this.isInitialized = false;
    this.jobCount = 0;

    logger.info('OcrWorkerPool terminado');
  }

  /**
   * Garante que os dados de linguagem existam
   */
  private async ensureLanguageDataExists(): Promise<void> {
    try {
      await fs.access(ocrConfig.langPath);
    } catch {
      logger.warn(`Diretório de linguagens não existe, criando: ${ocrConfig.langPath}`);
      await fs.mkdir(ocrConfig.langPath, { recursive: true });
    }

    // Verificar se os arquivos de linguagem existem
    for (const lang of ocrConfig.languages) {
      const langFile = path.join(ocrConfig.langPath, `${lang}.traineddata.gz`);
      try {
        await fs.access(langFile);
        logger.debug(`Arquivo de linguagem encontrado: ${langFile}`);
      } catch {
        logger.warn(`Arquivo de linguagem não encontrado: ${langFile}`);
        logger.warn('O arquivo será baixado automaticamente na primeira execução');
      }
    }
  }

  /**
   * Configura o modo de operação
   * @param mode Modo de operação
   */
  async setMode(mode: 'fast' | 'balanced' | 'accurate'): Promise<void> {
    if (!this.workers.length) {
      throw new Error('Nenhum worker disponível');
    }

    const params = this.getModeParameters(mode);

    for (const worker of this.workers) {
      await worker.setParameters(params);
    }

    logger.info(`Modo OCR alterado para: ${mode}`);
  }

  /**
   * Obtém parâmetros para cada modo
   * @param mode Modo de operação
   * @returns Parâmetros do Tesseract
   */
  private getModeParameters(mode: 'fast' | 'balanced' | 'accurate'): any {
    const params = {
      fast: {
        tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
        tessedit_enable_doc_dict: '0',
        textord_heavy_nr: '0',
      },
      balanced: {
        tessedit_pageseg_mode: PSM.AUTO,
        tessedit_enable_doc_dict: '1',
        textord_heavy_nr: '0',
      },
      accurate: {
        tessedit_pageseg_mode: PSM.AUTO,
        tessedit_enable_doc_dict: '1',
        textord_heavy_nr: '1',
        tessedit_do_invert: '0',
        tessedit_create_pdf: '0',
      },
    };

    return {
      ...params[mode],
      preserve_interword_spaces: '1',
    };
  }
}
