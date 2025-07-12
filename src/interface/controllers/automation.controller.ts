import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { MouseService } from '../../application/services/mouse.service.js';
import { ScreenService } from '../../application/services/screen.service.js';
import { ExecutorService } from '../../application/services/executor.service.js';
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
import type { AutomationAction } from '../../types/automation-builder.types.js';
import { MouseDefaults } from '../../config/mouse.config.js';
import pino from 'pino';

export class AutomationController {
  private mouseService: MouseService;
  private screenService: ScreenService;
  private executorService: ExecutorService;
  private readonly logger = pino({ name: 'AutomationController' });

  constructor() {
    this.mouseService = container.resolve<MouseService>('MouseService');
    this.screenService = container.resolve<ScreenService>('ScreenService');
    this.executorService = container.resolve<ExecutorService>(ExecutorService);
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
        preHandler: [authenticationMiddleware],
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

    server.get(
      '/screen/print',
      {
        preHandler: [authenticationMiddleware],
        schema: {
          headers: {
            type: 'object',
            properties: {
              'x-api-key': { type: 'string' },
            },
          },
          response: {
            200: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
                data: {
                  type: 'object',
                  properties: {
                    image: { type: 'string' },
                    timestamp: { type: 'number' },
                    format: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
      this.screenPrint.bind(this),
    );

    server.post(
      '/automation/execute',
      {
        preHandler: [authenticationMiddleware],
        schema: {
          headers: {
            type: 'object',
            properties: {
              'x-api-key': { type: 'string' },
            },
          },
          body: {
            type: 'object',
            properties: {
              actions: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    device: { type: 'string' },
                    timestamp: { type: 'number' },
                    payload: { type: 'object' },
                  },
                  required: ['id', 'device', 'payload'],
                },
              },
              options: {
                type: 'object',
                properties: {
                  stopOnError: { type: 'boolean' },
                  delayBetweenActions: { type: 'number' },
                },
              },
            },
            required: ['actions'],
          },
          response: {
            200: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
                results: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      actionId: { type: 'string' },
                      device: { type: 'string' },
                      error: { type: 'string' },
                      data: { type: 'object' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      async (request, reply) => this.executeActions(request as any, reply),
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
   * Captura a tela inteira e retorna como base64
   * @param request - Requisição Fastify
   * @param reply - Resposta Fastify
   */
  private async screenPrint(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const startTime = Date.now();

      // Captura tela inteira (sem região específica)
      const base64Image = await this.screenService.capture({ format: 'png' });

      // Remove o prefixo data:image/png;base64, se presente
      const imageData = base64Image.replace(/^data:image\/[a-z]+;base64,/, '');

      // Validação de tamanho (máximo 1MB)
      if (imageData.length > 1_000_000) {
        this.logger.warn({ size: imageData.length }, 'Captured image exceeds 1MB limit');
        throw new Error('IMAGE_TOO_LARGE');
      }

      const duration = Date.now() - startTime;
      this.logger.info({ durationMs: duration }, 'Screen capture completed');

      await reply.send({
        success: true,
        data: {
          image: imageData,
          timestamp: Date.now(),
          format: 'png',
        },
      });
    } catch (error) {
      this.logger.error({ error }, 'Failed to capture screen');
      await reply.code(500).send({
        success: false,
        error: error instanceof Error ? error.message : 'CAPTURE_FAILED',
      });
    }
  }

  /**
   * Endpoint de streaming para posição contínua do mouse usando Server-Sent Events
   * @param request - Requisição Fastify
   * @param reply - Resposta Fastify
   */
  private mousePositionStream(request: FastifyRequest, reply: FastifyReply): void {
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
    const sendMousePosition = () => {
      this.mouseService
        .getPosition()
        .then((position) => {
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
        })
        .catch((error: unknown) => {
          this.logger.error({ error }, 'Error getting mouse position');
          clearInterval(intervalId);
          reply.raw.end();
        });
    };

    // Iniciar streaming com intervalo configurável
    intervalId = setInterval(sendMousePosition, MouseDefaults.streamInterval);

    // Enviar primeira posição imediatamente
    sendMousePosition();

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

  /**
   * Executa uma sequência de ações de automação
   * @param request - Requisição Fastify com array de ações
   * @param reply - Resposta Fastify
   */
  private async executeActions(
    request: FastifyRequest<{
      Body: {
        actions: AutomationAction[];
        options?: {
          stopOnError?: boolean;
          delayBetweenActions?: number;
        };
      };
    }>,
    reply: FastifyReply,
  ): Promise<void> {
    try {
      const { actions, options = {} } = request.body;

      this.logger.info(
        { actionsCount: actions.length, options },
        'Received automation execution request',
      );

      // Validar se há ações
      if (!actions || actions.length === 0) {
        await reply.code(400).send({
          success: false,
          error: 'No actions provided',
        });
        return;
      }

      // Executar ações
      const results = await this.executorService.executeActions(actions, options);

      // Determinar sucesso geral
      const overallSuccess = results.every((r) => r.success);

      await reply.send({
        success: overallSuccess,
        results,
      });
    } catch (error) {
      this.logger.error({ error }, 'Failed to execute automation actions');
      await reply.code(500).send({
        success: false,
        error: error instanceof Error ? error.message : 'EXECUTION_FAILED',
      });
    }
  }
}
