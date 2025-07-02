/**
 * Configuração do logger usando pino
 */

import pino from 'pino';
import { environment } from './environment.js';

/**
 * Cria uma instância do logger configurada
 */
export const logger = pino({
  level: environment.logLevel || 'info',
  transport:
    environment.nodeEnv === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'yyyy-mm-dd HH:MM:ss',
            ignore: 'pid,hostname',
          },
        }
      : undefined,
});
