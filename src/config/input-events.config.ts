/**
 * Configurações para o sistema de eventos de input
 */

import dotenv from 'dotenv';

dotenv.config();

/**
 * Interface de configuração para eventos de input
 */
export interface InputEventsConfig {
  /** Tamanho máximo do buffer de eventos */
  bufferSize: number;
  
  /** Intervalo do heartbeat em millisegundos */
  heartbeatMs: number;
  
  /** Taxa máxima de eventos por segundo */
  maxRate: number;
  
  /** Tempo máximo de idade de eventos no buffer (ms) */
  maxEventAge: number;
  
  /** Habilitar debug de eventos */
  debug: boolean;
}

/**
 * Configuração padrão para eventos de input
 */
export const inputEventsConfig: Readonly<InputEventsConfig> = Object.freeze({
  bufferSize: parseInt(process.env.INPUT_EVENT_BUFFER || '1000', 10),
  heartbeatMs: parseInt(process.env.INPUT_EVENT_HEARTBEAT || '30000', 10),
  maxRate: parseInt(process.env.INPUT_EVENT_RATE || '5000', 10),
  maxEventAge: parseInt(process.env.INPUT_EVENT_MAX_AGE || '300000', 10), // 5 minutos
  debug: process.env.INPUT_EVENT_DEBUG === 'true'
});

/**
 * Valida a configuração de eventos de input
 * @throws Error se a configuração for inválida
 */
export function validateInputEventsConfig(): void {
  const { bufferSize, heartbeatMs, maxRate, maxEventAge } = inputEventsConfig;
  
  if (bufferSize < 1 || bufferSize > 100000) {
    throw new Error('INPUT_EVENT_BUFFER deve estar entre 1 e 100000');
  }
  
  if (heartbeatMs < 1000 || heartbeatMs > 300000) {
    throw new Error('INPUT_EVENT_HEARTBEAT deve estar entre 1000 e 300000 ms');
  }
  
  if (maxRate < 1 || maxRate > 50000) {
    throw new Error('INPUT_EVENT_RATE deve estar entre 1 e 50000 eventos/s');
  }
  
  if (maxEventAge < 1000 || maxEventAge > 3600000) {
    throw new Error('INPUT_EVENT_MAX_AGE deve estar entre 1000 e 3600000 ms');
  }
}

// Valida a configuração ao carregar o módulo
try {
  validateInputEventsConfig();
} catch (error) {
  console.error('Erro na configuração de eventos de input:', error);
  process.exit(1);
}