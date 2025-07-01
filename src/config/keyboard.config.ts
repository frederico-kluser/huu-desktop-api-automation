/**
 * Configurações para funcionalidades de teclado
 * Valores podem ser sobrescritos via variáveis de ambiente
 */

import { config } from 'dotenv';

// Carrega variáveis de ambiente
config();

/**
 * Configurações imutáveis para keyboard
 */
export const KeyboardConfig = {
  /**
   * Modo padrão de digitação quando não especificado
   */
  defaultMode: process.env.KEYBOARD_DEFAULT_MODE || 'instant',

  /**
   * Tamanho máximo de texto permitido (caracteres)
   */
  maxTextLength: parseInt(process.env.KEYBOARD_MAX_TEXT_LENGTH || '10000', 10),

  /**
   * Delay padrão por caractere em milissegundos
   */
  defaultDelayPerChar: parseInt(process.env.KEYBOARD_DEFAULT_DELAY_PER_CHAR || '0', 10),

  /**
   * Delay máximo permitido em milissegundos (5 minutos)
   */
  maxDelay: parseInt(process.env.KEYBOARD_MAX_DELAY || '300000', 10),

  /**
   * Tamanho do lote para processamento de caracteres
   */
  batchSize: parseInt(process.env.KEYBOARD_BATCH_SIZE || '50', 10),

  /**
   * Habilita logs detalhados para debug
   */
  debugMode: process.env.KEYBOARD_DEBUG === 'true',
} as const;

/**
 * Valida as configurações
 */
export function validateKeyboardConfig(): void {
  if (KeyboardConfig.maxTextLength < 1 || KeyboardConfig.maxTextLength > 100000) {
    throw new Error('KEYBOARD_MAX_TEXT_LENGTH must be between 1 and 100000');
  }

  if (KeyboardConfig.defaultDelayPerChar < 0) {
    throw new Error('KEYBOARD_DEFAULT_DELAY_PER_CHAR must be non-negative');
  }

  if (KeyboardConfig.maxDelay < 0 || KeyboardConfig.maxDelay > 3600000) {
    throw new Error('KEYBOARD_MAX_DELAY must be between 0 and 3600000 (1 hour)');
  }

  if (KeyboardConfig.batchSize < 1 || KeyboardConfig.batchSize > 1000) {
    throw new Error('KEYBOARD_BATCH_SIZE must be between 1 and 1000');
  }

  const validModes = ['instant', 'perChar', 'total'];
  if (!validModes.includes(KeyboardConfig.defaultMode)) {
    throw new Error(`KEYBOARD_DEFAULT_MODE must be one of: ${validModes.join(', ')}`);
  }
}
