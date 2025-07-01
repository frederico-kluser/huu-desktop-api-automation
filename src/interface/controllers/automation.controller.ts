import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { MouseService } from '../../application/services/mouse.service.js';
import { ScreenService } from '../../application/services/screen.service.js';
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

export class AutomationController {
  private mouseService: MouseService;
  private screenService: ScreenService;

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
}