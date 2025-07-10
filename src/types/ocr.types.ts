/**
 * Tipos para funcionalidade OCR (Optical Character Recognition)
 * Define estruturas de dados para processamento de texto em imagens
 */

/**
 * Representa uma caixa delimitadora de texto na imagem
 */
export interface OCRBoundingBox {
  x0: number; // Coordenada X inicial
  y0: number; // Coordenada Y inicial
  x1: number; // Coordenada X final
  y1: number; // Coordenada Y final
}

/**
 * Representa uma palavra reconhecida pelo OCR
 */
export interface OCRWord {
  text: string;
  confidence: number; // 0-100 indicando confiança da detecção
  bbox: OCRBoundingBox;
  baseline: OCRBoundingBox;
}

/**
 * Representa uma linha de texto reconhecida
 */
export interface OCRLine {
  text: string;
  confidence: number;
  bbox: OCRBoundingBox;
  words: OCRWord[];
}

/**
 * Representa um parágrafo de texto reconhecido
 */
export interface OCRParagraph {
  text: string;
  confidence: number;
  bbox: OCRBoundingBox;
  lines: OCRLine[];
}

/**
 * Representa um bloco de texto reconhecido
 */
export interface OCRBlock {
  text: string;
  confidence: number;
  bbox: OCRBoundingBox;
  paragraphs: OCRParagraph[];
}

/**
 * Formato simplificado de bbox para resposta da API
 */
export interface SimpleBoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Palavra no formato de resposta da API
 */
export interface OCRWordResponse {
  text: string;
  confidence: number;
  bbox: SimpleBoundingBox;
}

/**
 * Resposta completa do serviço OCR
 */
export interface OCRResponse {
  success: boolean;
  text: string;
  confidence: number;
  words: OCRWordResponse[];
  lines: OCRLine[];
  processingTime: number; // Tempo de processamento em ms
  error?: string;
}

/**
 * Opções de pré-processamento de imagem
 */
export interface PreprocessingOptions {
  targetWidth?: number;
  threshold?: number;
  contrastBoost?: boolean;
  denoiseLevel?: number;
  sharpen?: boolean;
}

/**
 * Configuração para processamento OCR
 */
export interface OCRProcessingConfig {
  languages?: ('eng' | 'por' | 'spa' | 'fra' | 'deu' | 'ita' | 'jpn' | 'chi_sim')[];
  mode?: 'fast' | 'balanced' | 'accurate';
  pageSegmentationMode?: number;
  timeout?: number;
}

/**
 * Métrica de performance do OCR
 */
export interface OCRMetrics {
  totalJobs: number;
  successfulJobs: number;
  failedJobs: number;
  averageProcessingTime: number;
  successRate: number;
  uptime: number;
}

/**
 * Erro customizado para operações OCR
 */
export interface OCRError {
  code: string;
  message: string;
  statusCode: number;
}

/**
 * Tipos de erro OCR
 */
export enum OCRErrorCode {
  INVALID_IMAGE = 'INVALID_IMAGE',
  PROCESSING_ABORTED = 'PROCESSING_ABORTED',
  PROCESSING_TIMEOUT = 'PROCESSING_TIMEOUT',
  OUT_OF_MEMORY = 'OUT_OF_MEMORY',
  UNSUPPORTED_FORMAT = 'UNSUPPORTED_FORMAT',
  NO_TEXT_FOUND = 'NO_TEXT_FOUND',
  WORKER_NOT_INITIALIZED = 'WORKER_NOT_INITIALIZED',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}
