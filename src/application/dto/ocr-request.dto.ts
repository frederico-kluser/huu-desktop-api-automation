/**
 * DTO para requisições OCR
 * Define e valida dados de entrada para operações OCR
 */

import { z } from 'zod';
import type { OCRProcessingConfig } from '../../types/ocr.types.js';

/**
 * Schema de validação para requisição OCR base64
 */
export const ocrRequestSchema = z.object({
  /** Imagem em formato base64 com data URI */
  image: z
    .string()
    .min(1, 'Imagem é obrigatória')
    .regex(
      /^data:image\/(jpeg|jpg|png|gif|bmp|webp);base64,/,
      'Formato de imagem inválido. Use: data:image/[tipo];base64,[dados]',
    )
    .refine((value) => {
      // Validar tamanho máximo (14MB para dar margem ao encoding base64)
      const sizeInBytes = (value.length * 3) / 4;
      const maxSizeInBytes = 14 * 1024 * 1024;
      return sizeInBytes <= maxSizeInBytes;
    }, 'Imagem excede o tamanho máximo permitido de 10MB'),

  /** Configuração opcional de processamento */
  config: z
    .object({
      /** Linguagens para OCR */
      languages: z
        .array(z.enum(['eng', 'por', 'spa', 'fra', 'deu', 'ita', 'jpn', 'chi_sim']))
        .optional(),

      /** Modo de processamento */
      mode: z.enum(['fast', 'balanced', 'accurate']).optional(),

      /** Modo de segmentação de página */
      pageSegmentationMode: z.number().min(0).max(13).optional(),

      /** Timeout customizado em ms */
      timeout: z.number().min(1000).max(60000).optional(),
    })
    .optional(),
});

/**
 * Schema para requisição OCR em lote
 */
export const ocrBatchRequestSchema = z.object({
  /** Array de imagens base64 */
  images: z
    .array(ocrRequestSchema.shape.image)
    .min(1, 'Pelo menos uma imagem é obrigatória')
    .max(10, 'Máximo de 10 imagens por lote'),

  /** Configuração aplicada a todas as imagens */
  config: ocrRequestSchema.shape.config,
});

/**
 * Tipo inferido do schema de requisição OCR
 */
export type OcrRequestDto = z.infer<typeof ocrRequestSchema>;

/**
 * Tipo inferido do schema de requisição em lote
 */
export type OcrBatchRequestDto = z.infer<typeof ocrBatchRequestSchema>;

/**
 * Classe DTO para requisição OCR
 */
export class OcrRequest {
  image: string;
  config?: OCRProcessingConfig;

  constructor(data: OcrRequestDto) {
    this.image = data.image;
    this.config = data.config;
  }

  /**
   * Extrai o buffer da imagem base64
   * @returns Buffer da imagem
   */
  getImageBuffer(): Buffer {
    const imageData = this.image.replace(/^data:image\/\w+;base64,/, '');
    return Buffer.from(imageData, 'base64');
  }

  /**
   * Obtém o tipo MIME da imagem
   * @returns Tipo MIME
   */
  getMimeType(): string {
    const match = this.image.match(/^data:image\/(\w+);base64,/);
    return match ? `image/${match[1]}` : 'image/png';
  }

  /**
   * Valida e cria instância a partir de dados brutos
   * @param data Dados brutos
   * @returns Instância validada
   */
  static fromRawData(data: unknown): OcrRequest {
    const validated = ocrRequestSchema.parse(data);
    return new OcrRequest(validated);
  }
}

/**
 * Classe DTO para requisição OCR em lote
 */
export class OcrBatchRequest {
  images: string[];
  config?: OCRProcessingConfig;

  constructor(data: OcrBatchRequestDto) {
    this.images = data.images;
    this.config = data.config;
  }

  /**
   * Converte para array de OcrRequest individuais
   * @returns Array de requisições OCR
   */
  toIndividualRequests(): OcrRequest[] {
    return this.images.map((image) => new OcrRequest({ image, config: this.config }));
  }

  /**
   * Valida e cria instância a partir de dados brutos
   * @param data Dados brutos
   * @returns Instância validada
   */
  static fromRawData(data: unknown): OcrBatchRequest {
    const validated = ocrBatchRequestSchema.parse(data);
    return new OcrBatchRequest(validated);
  }
}

/**
 * Helpers para validação
 */
export const OcrValidation = {
  /**
   * Valida se uma string é uma imagem base64 válida
   * @param value String a validar
   * @returns True se válida
   */
  isValidBase64Image(value: string): boolean {
    try {
      ocrRequestSchema.shape.image.parse(value);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Extrai formato da imagem
   * @param base64Image Imagem base64
   * @returns Formato da imagem
   */
  getImageFormat(base64Image: string): string | null {
    const match = base64Image.match(/^data:image\/(\w+);base64,/);
    return match ? match[1] : null;
  },

  /**
   * Calcula tamanho aproximado da imagem
   * @param base64Image Imagem base64
   * @returns Tamanho em bytes
   */
  getImageSize(base64Image: string): number {
    const data = base64Image.replace(/^data:image\/\w+;base64,/, '');
    return (data.length * 3) / 4;
  },
};
