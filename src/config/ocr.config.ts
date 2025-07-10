/**
 * Configuração para o serviço OCR
 * Carrega parâmetros de ambiente e define valores padrão
 */

import * as path from 'path';
import * as os from 'os';
import { environment } from './environment.js';

/**
 * Interface de configuração do OCR
 */
export interface OcrConfig {
  /** Tamanho máximo da imagem em MB */
  maxImageSizeMb: number;

  /** Timeout máximo para processamento em ms */
  maxProcessingMs: number;

  /** Número de workers para processamento paralelo */
  workerCount: number;

  /** TTL do cache em segundos (0 desabilita cache) */
  cacheTtl: number;

  /** Linguagens habilitadas para OCR */
  languages: string[];

  /** Caminho para arquivos de linguagem */
  langPath: string;

  /** Caminho para cache temporário */
  cachePath: string;

  /** Número máximo de jobs por worker antes de reciclar */
  jobsPerWorker: number;

  /** Configurações de pré-processamento */
  preprocessing: {
    targetWidth: number;
    threshold: number;
    contrastBoost: boolean;
    denoiseLevel: number;
    sharpen: boolean;
  };

  /** Modo de operação padrão */
  defaultMode: 'fast' | 'balanced' | 'accurate';

  /** Habilitar métricas */
  enableMetrics: boolean;
}

/**
 * Função para parsear JSON de ambiente com fallback
 */
function parseJsonEnv<T>(envVar: string | undefined, defaultValue: T): T {
  if (!envVar) return defaultValue;

  try {
    return JSON.parse(envVar) as T;
  } catch {
    return defaultValue;
  }
}

/**
 * Carrega configuração do OCR a partir das variáveis de ambiente
 */
function loadOcrConfig(): OcrConfig {
  const cpuCount = os.cpus().length;

  return {
    maxImageSizeMb: parseInt(process.env.OCR_MAX_IMAGE_SIZE_MB || '10', 10),
    maxProcessingMs: parseInt(process.env.OCR_TIMEOUT_MS || '30000', 10),
    workerCount: Math.min(parseInt(process.env.OCR_WORKERS || '4', 10), cpuCount),
    cacheTtl: parseInt(process.env.OCR_CACHE_TTL || '0', 10),
    languages: (process.env.OCR_LANGUAGES || 'eng,por').split(',').map((l) => l.trim()),
    langPath: process.env.OCR_LANG_PATH || path.join(process.cwd(), 'tessdata'),
    cachePath: process.env.OCR_CACHE_PATH || path.join(os.tmpdir(), 'ocr-cache'),
    jobsPerWorker: parseInt(process.env.OCR_JOBS_PER_WORKER || '500', 10),
    preprocessing: parseJsonEnv<OcrConfig['preprocessing']>(process.env.OCR_PREPROCESSING, {
      targetWidth: 1000,
      threshold: 128,
      contrastBoost: true,
      denoiseLevel: 0,
      sharpen: true,
    }),
    defaultMode: (process.env.OCR_DEFAULT_MODE as OcrConfig['defaultMode']) || 'balanced',
    enableMetrics: process.env.OCR_ENABLE_METRICS === 'true',
  };
}

/**
 * Configuração exportada do OCR
 */
export const ocrConfig = loadOcrConfig();

/**
 * Validação da configuração
 */
export function validateOcrConfig(config: OcrConfig): void {
  if (config.maxImageSizeMb < 1 || config.maxImageSizeMb > 50) {
    throw new Error('OCR_MAX_IMAGE_SIZE_MB deve estar entre 1 e 50');
  }

  if (config.maxProcessingMs < 1000 || config.maxProcessingMs > 300000) {
    throw new Error('OCR_TIMEOUT_MS deve estar entre 1000 e 300000');
  }

  if (config.workerCount < 1 || config.workerCount > 8) {
    throw new Error('OCR_WORKERS deve estar entre 1 e 8');
  }

  if (config.cacheTtl < 0) {
    throw new Error('OCR_CACHE_TTL não pode ser negativo');
  }

  if (config.languages.length === 0) {
    throw new Error('Pelo menos uma linguagem deve ser configurada');
  }

  const validLanguages = ['eng', 'por', 'spa', 'fra', 'deu', 'ita', 'jpn', 'chi_sim'];
  for (const lang of config.languages) {
    if (!validLanguages.includes(lang)) {
      throw new Error(`Linguagem não suportada: ${lang}`);
    }
  }

  if (config.preprocessing.targetWidth < 100 || config.preprocessing.targetWidth > 4000) {
    throw new Error('targetWidth deve estar entre 100 e 4000');
  }

  if (config.preprocessing.threshold < 0 || config.preprocessing.threshold > 255) {
    throw new Error('threshold deve estar entre 0 e 255');
  }
}

// Validar configuração na inicialização em produção
if (environment.nodeEnv === 'production') {
  try {
    validateOcrConfig(ocrConfig);
  } catch (error) {
    console.error(
      'Configuração OCR inválida:',
      error instanceof Error ? error.message : String(error),
    );
    process.exit(1);
  }
}

/**
 * Helper para obter configuração de modo
 */
export function getModeConfig(mode: 'fast' | 'balanced' | 'accurate') {
  const configs = {
    fast: {
      preprocessing: {
        targetWidth: 800,
        threshold: 128,
        contrastBoost: false,
        denoiseLevel: 0,
        sharpen: false,
      },
      timeout: 10000,
    },
    balanced: {
      preprocessing: {
        targetWidth: 1000,
        threshold: 128,
        contrastBoost: true,
        denoiseLevel: 0,
        sharpen: true,
      },
      timeout: 20000,
    },
    accurate: {
      preprocessing: {
        targetWidth: 1500,
        threshold: 128,
        contrastBoost: true,
        denoiseLevel: 1,
        sharpen: true,
      },
      timeout: 30000,
    },
  };

  return configs[mode];
}
