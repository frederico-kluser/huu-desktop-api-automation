/**
 * Controller para streaming de eventos gravados
 * Gerencia conexões SSE e transmite eventos de mouse e teclado
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { injectable, inject } from 'tsyringe';
import { RecorderListenerService } from '../../application/services/recorder-listener.service.js';
import { EventBuffer } from '../../application/services/event-buffer.service.js';
import { logger } from '../../config/logger.js';
import type { RecordedEvent } from '../../types/recorder-event.types.js';
import { recorderConfig } from '../../config/recorder.config.js';

@injectable()
export class RecorderController {
  private activeConnections = new Map<
    string,
    { reply: FastifyReply; listener: (event: RecordedEvent) => void }
  >();

  constructor(
    @inject(RecorderListenerService) private recorderListener: RecorderListenerService,
    @inject(EventBuffer) private eventBuffer: EventBuffer,
  ) {}

  /**
   * Inicia streaming de eventos gravados
   */
  async streamEvents(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const connectionId = this.generateConnectionId();

    // Configurar headers SSE
    reply.raw.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no', // Desabilitar buffering nginx
    });

    logger.info(`Nova conexão recorder SSE: ${connectionId}`);

    // Enviar evento inicial
    reply.raw.write(`id: ${connectionId}\n`);
    reply.raw.write('event: connected\n');
    reply.raw.write(
      `data: ${JSON.stringify({
        connectionId,
        config: {
          includeScreenshot: recorderConfig.includeScreenshot,
          moveIntervalMs: recorderConfig.moveIntervalMs,
        },
      })}\n\n`,
    );

    // Recuperar last-event-id para replay
    const lastEventId = request.headers['last-event-id'] as string;
    if (lastEventId) {
      await this.replayEvents(reply, lastEventId);
    }

    // Criar listener para novos eventos
    const listener = (event: RecordedEvent) => {
      try {
        // Formatar evento SSE
        reply.raw.write(`id: ${event.id}\n`);
        reply.raw.write('event: recorded\n');
        reply.raw.write(`data: ${JSON.stringify(event)}\n\n`);
      } catch (error) {
        logger.error('Erro ao enviar evento SSE:', error);
      }
    };

    // Registrar listener
    this.recorderListener.addListener(listener);
    this.activeConnections.set(connectionId, { reply, listener });

    // Configurar heartbeat
    const heartbeatInterval = setInterval(() => {
      try {
        reply.raw.write(':heartbeat\n\n');
      } catch (error) {
        logger.debug('Erro ao enviar heartbeat, conexão provavelmente fechada');
        clearInterval(heartbeatInterval);
      }
    }, 30000); // 30 segundos

    // Limpar ao desconectar
    request.raw.on('close', () => {
      logger.info(`Conexão recorder SSE fechada: ${connectionId}`);
      clearInterval(heartbeatInterval);

      const connection = this.activeConnections.get(connectionId);
      if (connection) {
        this.recorderListener.removeListener(connection.listener);
        this.activeConnections.delete(connectionId);
      }
    });
  }

  /**
   * Retorna estatísticas do recorder
   */
  async getStats(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const stats = {
      activeConnections: this.activeConnections.size,
      config: recorderConfig,
      timestamp: Date.now(),
    };

    reply.send({ success: true, data: stats });
  }

  /**
   * Gera ID único para conexão
   */
  private generateConnectionId(): string {
    return `rec_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Faz replay de eventos perdidos
   */
  private async replayEvents(reply: FastifyReply, lastEventId: string): Promise<void> {
    try {
      // Por enquanto não temos buffer específico para recorder
      // Esta funcionalidade pode ser implementada futuramente
      logger.debug(`Replay solicitado a partir de: ${lastEventId}`);
    } catch (error) {
      logger.error('Erro durante replay:', error);
    }
  }
}
