/**
 * Controller para streaming de eventos de input via SSE
 * Transmite cliques do mouse e teclas digitadas em tempo real
 */

import { type FastifyRequest, type FastifyReply } from 'fastify';
import { injectable, inject } from 'tsyringe';
import { type IEventListener, type InputEvent } from '../../types/input-event.types.js';
import { EventDispatcher } from '../../application/services/event-dispatcher.service.js';
import { EventBuffer } from '../../application/services/event-buffer.service.js';
import { inputEventsConfig } from '../../config/input-events.config.js';
import { logger } from '../../config/logger.js';

/**
 * Controller para streaming de eventos de input
 */
@injectable()
export class InputEventsController {
  constructor(
    @inject(EventDispatcher) private readonly eventDispatcher: EventDispatcher,
    @inject(EventBuffer) private readonly eventBuffer: EventBuffer,
  ) {}

  /**
   * Endpoint SSE para streaming de eventos de input
   * GET /api/v1/stream/input-events
   *
   * @param request Requisição Fastify
   * @param reply Resposta Fastify
   */
  async streamInputEvents(
    request: FastifyRequest<{
      Headers: {
        'last-event-id'?: string;
      };
    }>,
    reply: FastifyReply,
  ): Promise<void> {
    // Configura headers SSE
    reply.raw.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no', // Desabilita buffering em proxies
    });

    const clientId = request.id;
    const lastEventId = request.headers['last-event-id'];

    logger.info(`Cliente SSE conectado: ${clientId}, Last-Event-ID: ${lastEventId || 'none'}`);

    // Se houver Last-Event-ID, envia eventos perdidos
    if (lastEventId) {
      const missedEvents = this.eventBuffer.getEventsAfter(lastEventId);
      for (const event of missedEvents) {
        this.sendSSEEvent(reply, event);
      }
    }

    // Cria listener para este cliente
    const listener: IEventListener = {
      onEvent: (event: InputEvent) => {
        this.sendSSEEvent(reply, event);

        // Adiciona ao buffer para replay futuro
        this.eventBuffer.add(event);
      },
    };

    // Registra o listener
    this.eventDispatcher.addListener(listener);

    // Configura heartbeat para manter conexão viva
    const heartbeatInterval = setInterval(() => {
      try {
        reply.raw.write(':heartbeat\n\n');
      } catch (error) {
        logger.error(`Erro ao enviar heartbeat: ${error}`);
        clearInterval(heartbeatInterval);
      }
    }, inputEventsConfig.heartbeatMs);

    // Cleanup ao fechar conexão
    request.raw.on('close', () => {
      logger.info(`Cliente SSE desconectado: ${clientId}`);
      clearInterval(heartbeatInterval);
      this.eventDispatcher.removeListener(listener);
    });

    // Envia evento inicial de conexão
    reply.raw.write(`:connected ${clientId}\n\n`);
  }

  /**
   * Envia um evento via SSE
   * @param reply Resposta Fastify
   * @param event Evento a ser enviado
   */
  private sendSSEEvent(reply: FastifyReply, event: InputEvent): void {
    try {
      const sseData = [
        `id: ${event.id}`,
        `event: input-event`,
        `data: ${JSON.stringify(event)}`,
        '', // Linha em branco para finalizar o evento
        '', // Segunda linha em branco como separador
      ].join('\n');

      reply.raw.write(sseData);

      if (inputEventsConfig.debug) {
        logger.debug(`Evento SSE enviado: ${event.id} (${event.source})`);
      }
    } catch (error) {
      logger.error(`Erro ao enviar evento SSE: ${error}`);
    }
  }

  /**
   * Endpoint para obter estatísticas do sistema de eventos
   * GET /api/v1/stream/input-events/stats
   *
   * @param request Requisição Fastify
   * @param reply Resposta Fastify
   */
  async getStats(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const dispatcherStats = this.eventDispatcher.getStats();
    const bufferSize = this.eventBuffer.getSize();
    const lastEventId = this.eventBuffer.getLastEventId();

    const stats = {
      dispatcher: dispatcherStats,
      buffer: {
        size: bufferSize,
        maxSize: inputEventsConfig.bufferSize,
        lastEventId,
      },
      config: {
        heartbeatMs: inputEventsConfig.heartbeatMs,
        maxRate: inputEventsConfig.maxRate,
        maxEventAge: inputEventsConfig.maxEventAge,
      },
    };

    reply.send({ success: true, data: stats });
  }

  /**
   * Endpoint para limpar o buffer de eventos
   * POST /api/v1/stream/input-events/clear
   *
   * @param request Requisição Fastify
   * @param reply Resposta Fastify
   */
  async clearBuffer(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    this.eventBuffer.clear();
    logger.info('Buffer de eventos limpo via API');

    reply.send({ success: true, message: 'Buffer limpo com sucesso' });
  }

  /**
   * Endpoint para remover eventos antigos do buffer
   * POST /api/v1/stream/input-events/prune
   *
   * @param request Requisição Fastify
   * @param reply Resposta Fastify
   */
  async pruneBuffer(
    request: FastifyRequest<{
      Body: {
        maxAgeMs?: number;
      };
    }>,
    reply: FastifyReply,
  ): Promise<void> {
    const maxAgeMs = request.body.maxAgeMs || inputEventsConfig.maxEventAge;
    const removed = this.eventBuffer.pruneOldEvents(maxAgeMs);

    logger.info(`Removidos ${removed} eventos antigos do buffer`);

    reply.send({
      success: true,
      data: {
        removed,
        maxAgeMs,
      },
    });
  }
}
