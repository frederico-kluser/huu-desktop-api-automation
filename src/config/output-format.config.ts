import { isDevelopment } from './environment.js';

/**
 * Configuração do sistema de formatação de saída personalizada
 * Controla limites de segurança e performance para esquemas dinâmicos
 */
export interface OutputFormatConfig {
  /** Tamanho máximo permitido para esquemas JSON em bytes */
  maxSchemaSize: number;
  /** Profundidade máxima de aninhamento para evitar recursão infinita */
  maxDepth: number;
  /** Modo padrão quando outputFormat não é especificado */
  defaultMode: 'string' | 'object';
  /** Timeout máximo para parsing de esquemas complexos em ms */
  parseTimeout: number;
  /** Habilita cache de esquemas compilados */
  enableCache: boolean;
  /** TTL do cache em minutos */
  cacheTtl: number;
  /** Habilita logs detalhados para debug */
  enableDebugLogs: boolean;
}

/**
 * Valida configurações de output format
 * @param config - Configuração a ser validada
 * @throws Error se configuração inválida
 */
function validateOutputFormatConfig(config: OutputFormatConfig): void {
  if (config.maxSchemaSize <= 0 || config.maxSchemaSize > 1024 * 1024) {
    throw new Error('maxSchemaSize deve estar entre 1 e 1MB');
  }

  if (config.maxDepth < 1 || config.maxDepth > 20) {
    throw new Error('maxDepth deve estar entre 1 e 20');
  }

  if (config.parseTimeout < 100 || config.parseTimeout > 30000) {
    throw new Error('parseTimeout deve estar entre 100ms e 30s');
  }

  if (config.cacheTtl < 1 || config.cacheTtl > 1440) {
    throw new Error('cacheTtl deve estar entre 1 e 1440 minutos');
  }
}

/**
 * Configuração imutável para output format
 * Carregada de variáveis de ambiente com fallbacks seguros
 */
export const outputFormatConfig: Readonly<OutputFormatConfig> = Object.freeze({
  maxSchemaSize: parseInt(process.env.OUTPUT_SCHEMA_MAX_SIZE || '10240', 10),
  maxDepth: parseInt(process.env.OUTPUT_SCHEMA_MAX_DEPTH || '5', 10),
  defaultMode: (process.env.OUTPUT_SCHEMA_DEFAULT_MODE as 'string' | 'object') || 'string',
  parseTimeout: parseInt(process.env.OUTPUT_SCHEMA_PARSE_TIMEOUT || '500', 10),
  enableCache: process.env.OUTPUT_SCHEMA_ENABLE_CACHE !== 'false',
  cacheTtl: parseInt(process.env.OUTPUT_SCHEMA_CACHE_TTL || '10', 10),
  enableDebugLogs: isDevelopment || process.env.OUTPUT_SCHEMA_DEBUG === 'true',
});

// Valida configuração na inicialização
validateOutputFormatConfig(outputFormatConfig);
