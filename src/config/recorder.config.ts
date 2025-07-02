/**
 * Configuração do sistema de gravação
 * Gerencia parâmetros configuráveis via variáveis de ambiente
 */

import { config } from 'dotenv';
import type { RecorderConfig } from '../types/recorder-event.types.js';

config();

/**
 * Valida e retorna a configuração do recorder
 */
function validateConfig(): RecorderConfig {
  const includeScreenshot = process.env.RECORDER_INCLUDE_SCREENSHOT !== 'false';
  
  const moveIntervalMs = parseInt(process.env.RECORDER_MOVE_INTERVAL_MS || '50', 10);
  if (moveIntervalMs < 20 || moveIntervalMs > 200) {
    throw new Error(`RECORDER_MOVE_INTERVAL_MS deve estar entre 20 e 200ms (valor: ${moveIntervalMs})`);
  }
  
  const maxScreenshotSize = parseInt(process.env.RECORDER_MAX_SCREENSHOT_SIZE || '2097152', 10); // 2MB default
  if (maxScreenshotSize < 10240 || maxScreenshotSize > 10485760) { // 10KB - 10MB
    throw new Error(`RECORDER_MAX_SCREENSHOT_SIZE deve estar entre 10KB e 10MB (valor: ${maxScreenshotSize})`);
  }
  
  return {
    includeScreenshot,
    moveIntervalMs,
    maxScreenshotSize
  };
}

// Exportar configuração validada
export const recorderConfig: RecorderConfig = validateConfig();

// Log de configuração no ambiente de desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  console.log('Recorder config:', recorderConfig);
}