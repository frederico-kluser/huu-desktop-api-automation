import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { MouseService } from '../../application/services/mouse.service.js';
import { ScreenService } from '../../application/services/screen.service.js';
import { authenticationMiddleware } from '../middleware/auth.middleware.js';
import {
  mouseMoveJsonSchema,
  mouseClickJsonSchema,
  mouseDragJsonSchema,
  mouseScrollJsonSchema,
  screenFindJsonSchema,
  screenCaptureJsonSchema,
} from '../schemas/automation.schemas.js';
import type {
  MouseMoveRequest,
  MouseClickRequest,
  MouseDragRequest,
  MouseScrollRequest,
  ScreenFindRequest,
  ScreenCaptureRequest,
} from '../../application/dto/automation-request.dto.js';
import { MouseDefaults } from '../../config/mouse.config.js';
import { environment } from '../../config/environment.js';
import pino from 'pino';

export class AutomationController {
  private mouseService: MouseService;
  private screenService: ScreenService;
  private readonly logger = pino({ name: 'AutomationController' });

  constructor() {
    this.mouseService = container.resolve<MouseService>('MouseService');
    this.screenService = container.resolve<ScreenService>('ScreenService');
  }

  registerRoutes(server: FastifyInstance): void {
    server.post(
      '/mouse/move',
      {
        schema: {
          body: mouseMoveJsonSchema,
          response: {
            200: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
              },
            },
          },
        },
      },
      this.mouseMove.bind(this),
    );

    server.post(
      '/mouse/click',
      {
        schema: {
          body: mouseClickJsonSchema,
          response: {
            200: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
              },
            },
          },
        },
      },
      this.mouseClick.bind(this),
    );

    server.post(
      '/mouse/drag',
      {
        schema: {
          body: mouseDragJsonSchema,
          response: {
            200: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
              },
            },
          },
        },
      },
      this.mouseDrag.bind(this),
    );

    server.post(
      '/mouse/scroll',
      {
        schema: {
          body: mouseScrollJsonSchema,
          response: {
            200: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
              },
            },
          },
        },
      },
      this.mouseScroll.bind(this),
    );

    server.get(
      '/mouse/position',
      {
        schema: {
          response: {
            200: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
                data: {
                  type: 'object',
                  properties: {
                    x: { type: 'number' },
                    y: { type: 'number' },
                  },
                },
              },
            },
          },
        },
      },
      this.mousePosition.bind(this),
    );

    server.get(
      '/mouse/position/stream',
      {
        preHandler: authenticationMiddleware,
        schema: {
          headers: {
            type: 'object',
            properties: {
              'x-api-key': { type: 'string' },
            },
          },
        },
      },
      this.mousePositionStream.bind(this),
    );

    server.post(
      '/screen/find',
      {
        schema: {
          body: screenFindJsonSchema,
          response: {
            200: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
                data: {
                  type: 'object',
                  properties: {
                    matches: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          x: { type: 'number' },
                          y: { type: 'number' },
                          width: { type: 'number' },
                          height: { type: 'number' },
                          confidence: { type: 'number' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      this.screenFind.bind(this),
    );

    server.post(
      '/screen/capture',
      {
        schema: {
          body: screenCaptureJsonSchema,
          response: {
            200: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
                data: {
                  type: 'object',
                  properties: {
                    image: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
      this.screenCapture.bind(this),
    );
  }

  private async mouseMove(
    request: FastifyRequest<{ Body: MouseMoveRequest }>,
    reply: FastifyReply,
  ): Promise<void> {
    await this.mouseService.move(request.body);
    await reply.send({ success: true });
  }

  private async mouseClick(
    request: FastifyRequest<{ Body: MouseClickRequest }>,
    reply: FastifyReply,
  ): Promise<void> {
    await this.mouseService.click(request.body);
    await reply.send({ success: true });
  }

  private async mouseDrag(
    request: FastifyRequest<{ Body: MouseDragRequest }>,
    reply: FastifyReply,
  ): Promise<void> {
    await this.mouseService.drag(request.body);
    await reply.send({ success: true });
  }

  private async mouseScroll(
    request: FastifyRequest<{ Body: MouseScrollRequest }>,
    reply: FastifyReply,
  ): Promise<void> {
    await this.mouseService.scroll(request.body);
    await reply.send({ success: true });
  }

  private async mousePosition(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const position = await this.mouseService.getPosition();
    await reply.send({ success: true, data: position });
  }

  private async screenFind(
    request: FastifyRequest<{ Body: ScreenFindRequest }>,
    reply: FastifyReply,
  ): Promise<void> {
    const matches = await this.screenService.findTemplate(request.body);
    await reply.send({ success: true, data: { matches } });
  }

  private async screenCapture(
    request: FastifyRequest<{ Body: ScreenCaptureRequest }>,
    reply: FastifyReply,
  ): Promise<void> {
    const image = await this.screenService.capture(request.body);
    await reply.send({ success: true, data: { image } });
  }

  /**
   * Endpoint de streaming para posição contínua do mouse usando Server-Sent Events
   * @param request - Requisição Fastify
   * @param reply - Resposta Fastify
   */
  private async mousePositionStream(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    // Configurar headers para Server-Sent Events
    reply.raw.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Content-Security-Policy': "default-src 'none'",
      'X-Content-Type-Options': 'nosniff',
    });

    this.logger.info('Starting mouse position stream');

    let intervalId: NodeJS.Timeout;
    let messageCount = 0;

    // Função para enviar posição do mouse
    const sendMousePosition = async () => {
      try {
        const position = await this.mouseService.getPosition();
        const data = {
          x: position.x,
          y: position.y,
          timestamp: Date.now(),
        };

        // Enviar dados no formato SSE
        reply.raw.write(`data: ${JSON.stringify(data)}\n\n`);

        // Log apenas 1 em cada 10 mensagens para evitar spam
        messageCount++;
        if (messageCount % 10 === 0) {
          this.logger.debug({ position, messageCount }, 'Sent mouse position');
        }
      } catch (error) {
        this.logger.error({ error }, 'Error getting mouse position');
        clearInterval(intervalId);
        reply.raw.end();
      }
    };

    // Iniciar streaming com intervalo configurável
    intervalId = setInterval(sendMousePosition, MouseDefaults.streamInterval);

    // Enviar primeira posição imediatamente
    await sendMousePosition();

    // Limpar recursos quando a conexão for fechada
    request.raw.on('close', () => {
      this.logger.info({ messageCount }, 'Mouse position stream closed');
      clearInterval(intervalId);
    });

    // Tratar erros de conexão
    request.raw.on('error', (error) => {
      this.logger.error({ error }, 'Stream connection error');
      clearInterval(intervalId);
    });
  }
}
