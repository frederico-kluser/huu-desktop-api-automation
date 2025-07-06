/**
 * Rotas para o sistema de gravação
 * Endpoints para streaming de eventos de mouse e teclado
 */

import type { FastifyInstance, FastifyPluginOptions, FastifyPluginCallback } from 'fastify';
import { container } from '../config/dependency-injection.js';
import { RecorderController } from '../interface/controllers/recorder.controller.js';

/**
 * Schemas de validação
 */
const StatsResponseSchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    data: {
      type: 'object',
      properties: {
        activeConnections: { type: 'number' },
        config: {
          type: 'object',
          properties: {
            includeScreenshot: { type: 'boolean' },
            moveIntervalMs: { type: 'number' },
            maxScreenshotSize: { type: 'number' },
          },
        },
        timestamp: { type: 'number' },
      },
    },
  },
};

/**
 * Registra rotas do recorder
 */
export const recorderRoutes: FastifyPluginCallback = (
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
  done?: (error?: Error) => void,
): void => {
  const controller = container.resolve(RecorderController);

  /**
   * GET /recorder/stream
   * Inicia streaming de eventos gravados via SSE
   */
  fastify.get('/recorder/stream', {
    schema: {
      description: 'Inicia streaming de eventos de mouse e teclado',
      tags: ['recorder'],
      response: {
        200: {
          description: 'Stream SSE iniciado',
          type: 'string',
          contentType: 'text/event-stream',
        },
      },
    },
    handler: controller.streamEvents.bind(controller),
  });

  /**
   * GET /recorder/stats
   * Retorna estatísticas do sistema de gravação
   */
  fastify.get('/recorder/stats', {
    schema: {
      description: 'Retorna estatísticas do recorder',
      tags: ['recorder'],
      response: {
        200: StatsResponseSchema,
      },
    },
    handler: controller.getStats.bind(controller),
  });

  if (done) {
    done();
  }
};
