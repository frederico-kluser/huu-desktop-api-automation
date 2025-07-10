/**
 * Schemas JSON para validação de requisições OCR no Fastify
 * Compatível com JSON Schema Draft 7
 */

/**
 * Schema para requisição OCR com imagem base64
 */
export const ocrBase64RequestSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  required: ['image'],
  additionalProperties: false,
  properties: {
    image: {
      type: 'string',
      minLength: 100,
      maxLength: 20000000, // ~14MB em base64
      pattern: '^data:image\\/(jpeg|jpg|png|gif|bmp|webp);base64,',
      description: 'Imagem em formato base64 com data URI',
    },
    config: {
      type: 'object',
      additionalProperties: false,
      properties: {
        languages: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['eng', 'por', 'spa', 'fra', 'deu', 'ita', 'jpn', 'chi_sim'],
          },
          description: 'Linguagens para OCR',
        },
        mode: {
          type: 'string',
          enum: ['fast', 'balanced', 'accurate'],
          description: 'Modo de processamento OCR',
        },
        pageSegmentationMode: {
          type: 'integer',
          minimum: 0,
          maximum: 13,
          description: 'Modo de segmentação de página do Tesseract',
        },
        timeout: {
          type: 'integer',
          minimum: 1000,
          maximum: 60000,
          description: 'Timeout customizado em milissegundos',
        },
      },
    },
  },
} as const;

/**
 * Schema para requisição OCR em lote
 */
export const ocrBatchRequestSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  required: ['images'],
  additionalProperties: false,
  properties: {
    images: {
      type: 'array',
      minItems: 1,
      maxItems: 10,
      items: {
        type: 'string',
        minLength: 100,
        maxLength: 20000000,
        pattern: '^data:image\\/(jpeg|jpg|png|gif|bmp|webp);base64,',
      },
      description: 'Array de imagens em formato base64',
    },
    config: {
      type: 'object',
      additionalProperties: false,
      properties: {
        languages: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['eng', 'por', 'spa', 'fra', 'deu', 'ita', 'jpn', 'chi_sim'],
          },
        },
        mode: {
          type: 'string',
          enum: ['fast', 'balanced', 'accurate'],
        },
        pageSegmentationMode: {
          type: 'integer',
          minimum: 0,
          maximum: 13,
        },
        timeout: {
          type: 'integer',
          minimum: 1000,
          maximum: 60000,
        },
      },
      description: 'Configuração aplicada a todas as imagens',
    },
  },
} as const;

/**
 * Schema para resposta OCR de sucesso
 */
export const ocrResponseSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  required: ['success', 'text', 'confidence', 'words', 'lines', 'processingTime'],
  properties: {
    success: {
      type: 'boolean',
      const: true,
    },
    text: {
      type: 'string',
      description: 'Texto completo extraído',
    },
    confidence: {
      type: 'number',
      minimum: 0,
      maximum: 100,
      description: 'Confiança geral da detecção',
    },
    words: {
      type: 'array',
      items: {
        type: 'object',
        required: ['text', 'confidence', 'bbox'],
        properties: {
          text: {
            type: 'string',
          },
          confidence: {
            type: 'number',
            minimum: 0,
            maximum: 100,
          },
          bbox: {
            type: 'object',
            required: ['x', 'y', 'width', 'height'],
            properties: {
              x: { type: 'number' },
              y: { type: 'number' },
              width: { type: 'number' },
              height: { type: 'number' },
            },
          },
        },
      },
      description: 'Palavras detectadas com coordenadas',
    },
    lines: {
      type: 'array',
      items: {
        type: 'object',
        required: ['text', 'confidence', 'bbox', 'words'],
        properties: {
          text: {
            type: 'string',
          },
          confidence: {
            type: 'number',
            minimum: 0,
            maximum: 100,
          },
          bbox: {
            type: 'object',
            required: ['x0', 'y0', 'x1', 'y1'],
            properties: {
              x0: { type: 'number' },
              y0: { type: 'number' },
              x1: { type: 'number' },
              y1: { type: 'number' },
            },
          },
          words: {
            type: 'array',
            items: {
              type: 'object',
            },
          },
        },
      },
      description: 'Linhas de texto detectadas',
    },
    processingTime: {
      type: 'number',
      minimum: 0,
      description: 'Tempo de processamento em milissegundos',
    },
  },
} as const;

/**
 * Schema para resposta de erro OCR
 */
export const ocrErrorResponseSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  required: ['success', 'error', 'code'],
  properties: {
    success: {
      type: 'boolean',
      const: false,
    },
    error: {
      type: 'string',
      description: 'Mensagem de erro',
    },
    code: {
      type: 'string',
      enum: [
        'INVALID_IMAGE',
        'PROCESSING_ABORTED',
        'PROCESSING_TIMEOUT',
        'OUT_OF_MEMORY',
        'UNSUPPORTED_FORMAT',
        'NO_TEXT_FOUND',
        'WORKER_NOT_INITIALIZED',
        'UNKNOWN_ERROR',
      ],
      description: 'Código do erro',
    },
    details: {
      type: 'object',
      description: 'Detalhes adicionais do erro',
    },
  },
} as const;

/**
 * Schema para resposta de métricas OCR
 */
export const ocrMetricsResponseSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  required: [
    'totalJobs',
    'successfulJobs',
    'failedJobs',
    'averageProcessingTime',
    'successRate',
    'uptime',
  ],
  properties: {
    totalJobs: {
      type: 'integer',
      minimum: 0,
      description: 'Total de jobs processados',
    },
    successfulJobs: {
      type: 'integer',
      minimum: 0,
      description: 'Jobs bem-sucedidos',
    },
    failedJobs: {
      type: 'integer',
      minimum: 0,
      description: 'Jobs que falharam',
    },
    averageProcessingTime: {
      type: 'number',
      minimum: 0,
      description: 'Tempo médio de processamento em ms',
    },
    successRate: {
      type: 'number',
      minimum: 0,
      maximum: 1,
      description: 'Taxa de sucesso (0-1)',
    },
    uptime: {
      type: 'number',
      minimum: 0,
      description: 'Tempo de execução em ms',
    },
    cacheSize: {
      type: 'integer',
      minimum: 0,
      description: 'Número de itens no cache',
    },
    isInitialized: {
      type: 'boolean',
      description: 'Se o serviço está inicializado',
    },
  },
} as const;

/**
 * Schema de requisição para limpar cache OCR
 */
export const ocrClearCacheRequestSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  additionalProperties: false,
  properties: {},
} as const;
