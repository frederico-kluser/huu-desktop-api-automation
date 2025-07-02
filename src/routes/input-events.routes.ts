/**
 * Rotas para streaming de eventos de input via SSE
 */

import { type FastifyInstance } from 'fastify';
import { container } from '../config/dependency-injection.js';
import { InputEventsController } from '../interface/controllers/input-events.controller.js';

/**
 * Schema de validação para o corpo da requisição de prune
 */
const PruneBodySchema = {
  type: 'object',
  properties: {
    maxAgeMs: {
      type: 'number',
      minimum: 1000,
      maximum: 3600000,
      description: 'Idade máxima dos eventos em millisegundos',
    },
  },
  additionalProperties: false,
};

/**
 * Schema de resposta padrão
 */
const StandardResponseSchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    message: { type: 'string' },
    data: { type: 'object' },
    error: { type: 'string' },
  },
  required: ['success'],
};

/**
 * Registra as rotas de eventos de input
 * @param fastify Instância do Fastify
 */
export async function inputEventsRoutes(fastify: FastifyInstance): Promise<void> {
  const controller = container.resolve(InputEventsController);

  /**
   * GET /input-events
   * Endpoint SSE para streaming de eventos de input em tempo real
   */
  fastify.get(
    '/input-events',
    {
      schema: {
        description: 'Stream SSE de eventos de input (cliques do mouse e teclas digitadas)',
        tags: ['Input Events'],
        headers: {
          type: 'object',
          properties: {
            'last-event-id': {
              type: 'string',
              description: 'ID do último evento recebido para recuperar eventos perdidos',
            },
          },
        },
        response: {
          200: {
            description: 'Stream SSE iniciado com sucesso',
            content: {
              'text/event-stream': {
                schema: {
                  type: 'string',
                  description: 'Stream de eventos SSE',
                },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      await controller.streamInputEvents(request as any, reply);
    },
  );

  /**
   * GET /input-events/stats
   * Obtém estatísticas do sistema de eventos
   */
  fastify.get(
    '/input-events/stats',
    {
      schema: {
        description: 'Obtém estatísticas do sistema de eventos de input',
        tags: ['Input Events'],
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  dispatcher: {
                    type: 'object',
                    properties: {
                      listenersCount: { type: 'number' },
                      queueSize: { type: 'number' },
                      eventsPerSecond: { type: 'number' },
                    },
                  },
                  buffer: {
                    type: 'object',
                    properties: {
                      size: { type: 'number' },
                      maxSize: { type: 'number' },
                      lastEventId: { type: ['string', 'null'] },
                    },
                  },
                  config: {
                    type: 'object',
                    properties: {
                      heartbeatMs: { type: 'number' },
                      maxRate: { type: 'number' },
                      maxEventAge: { type: 'number' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      await controller.getStats(request, reply);
    },
  );

  /**
   * POST /input-events/clear
   * Limpa o buffer de eventos
   */
  fastify.post(
    '/input-events/clear',
    {
      schema: {
        description: 'Limpa o buffer de eventos armazenados',
        tags: ['Input Events'],
        response: {
          200: StandardResponseSchema,
        },
      },
    },
    async (request, reply) => {
      await controller.clearBuffer(request, reply);
    },
  );

  /**
   * POST /input-events/prune
   * Remove eventos antigos do buffer
   */
  fastify.post(
    '/input-events/prune',
    {
      schema: {
        description: 'Remove eventos antigos do buffer baseado na idade máxima',
        tags: ['Input Events'],
        body: PruneBodySchema,
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  removed: { type: 'number' },
                  maxAgeMs: { type: 'number' },
                },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      await controller.pruneBuffer(request as any, reply);
    },
  );
}
