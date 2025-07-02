/**
 * Controller para operações de teclado e clipboard
 * Expõe endpoints REST para automação de entrada de texto e área de transferência
 */

import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { inject, injectable, container } from 'tsyringe';
import { KeyboardService } from '../../application/services/keyboard.service.js';
import { ClipboardService } from '../../application/services/clipboard.service.js';
import {
  keyboardTypeSchema,
  keyboardPressKeySchema,
  keyboardCombinationSchema,
} from '../../application/dto/keyboard-request.dto.js';
import type {
  KeyboardTypeRequest,
  KeyboardPressKeyRequest,
  KeyboardCombinationRequest,
} from '../../application/dto/keyboard-request.dto.js';
import { clipboardCopySchema } from '../../application/dto/clipboard-request.dto.js';
import type { ClipboardCopyRequest } from '../../application/dto/clipboard-request.dto.js';
import {
  keyboardTypeJsonSchema,
  keyboardPressKeyJsonSchema,
  keyboardCombinationJsonSchema,
} from '../schemas/keyboard.schemas.js';
import {
  clipboardCopyJsonSchema,
  clipboardPasteJsonSchema,
  clipboardClearJsonSchema,
} from '../schemas/clipboard.schemas.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import { environment } from '../../config/environment.js';

/**
 * Controller responsável pelas operações de teclado e clipboard
 */
@injectable()
export class KeyboardController {
  private logger: any;

  constructor(
    @inject('KeyboardService') private keyboardService: KeyboardService,
    @inject('ClipboardService') private clipboardService: ClipboardService,
  ) {}

  /**
   * Constrói e registra as rotas do controller
   */
  static buildRoutes(fastify: FastifyInstance, _opts: any, done: () => void): void {
    const controller = new KeyboardController(
      container.resolve<KeyboardService>('KeyboardService'),
      container.resolve<ClipboardService>('ClipboardService'),
    );
    controller.logger = fastify.log;
    controller.registerRoutes(fastify);
    done();
  }

  /**
   * Registra todas as rotas do controller
   */
  private registerRoutes(fastify: FastifyInstance): void {
    // Rotas de teclado
    fastify.post(
      '/keyboard/type',
      {
        schema: {
          body: keyboardTypeJsonSchema,
          response: {
            200: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
                data: {
                  type: 'object',
                  properties: {
                    textLength: { type: 'integer' },
                    mode: { type: 'string' },
                    timing: { type: 'integer' },
                  },
                },
                error: { type: 'string' },
              },
            },
          },
        },
        preHandler: validateRequest(keyboardTypeSchema),
      },
      this.type.bind(this),
    );

    fastify.post(
      '/keyboard/press',
      {
        schema: {
          body: keyboardPressKeyJsonSchema,
          response: {
            200: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
                data: {
                  type: 'object',
                  properties: {
                    key: { type: 'string' },
                  },
                },
                error: { type: 'string' },
              },
            },
          },
        },
        preHandler: validateRequest(keyboardPressKeySchema),
      },
      this.pressKey.bind(this),
    );

    fastify.post(
      '/keyboard/combination',
      {
        schema: {
          body: keyboardCombinationJsonSchema,
          response: {
            200: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
                data: {
                  type: 'object',
                  properties: {
                    combination: { type: 'string' },
                  },
                },
                error: { type: 'string' },
              },
            },
          },
        },
        preHandler: validateRequest(keyboardCombinationSchema),
      },
      this.combination.bind(this),
    );

    // Rotas de clipboard
    fastify.post(
      '/clipboard/copy',
      {
        schema: {
          body: clipboardCopyJsonSchema,
          response: {
            200: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
                data: {
                  type: 'object',
                  properties: {
                    contentLength: { type: 'integer' },
                    sizeBytes: { type: 'integer' },
                  },
                },
                error: { type: 'string' },
              },
            },
          },
        },
        preHandler: validateRequest(clipboardCopySchema),
      },
      this.clipboardCopy.bind(this),
    );

    fastify.get(
      '/clipboard/paste',
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
                    content: { type: 'string' },
                    isEmpty: { type: 'boolean' },
                    contentLength: { type: 'integer' },
                  },
                },
                error: { type: 'string' },
              },
            },
          },
        },
      },
      this.clipboardPaste.bind(this),
    );

    fastify.post(
      '/clipboard/clear',
      {
        schema: {
          body: clipboardClearJsonSchema,
          response: {
            200: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
                data: {
                  type: 'object',
                  properties: {
                    cleared: { type: 'boolean' },
                  },
                },
                error: { type: 'string' },
              },
            },
          },
        },
      },
      this.clipboardClear.bind(this),
    );
  }

  /**
   * Digita texto com opções de timing
   */
  private async type(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const body = request.body as KeyboardTypeRequest;
      this.logger.info(
        {
          mode: body.mode,
          textLength: body.text.length,
          value: body.value,
        },
        'Keyboard type request',
      );

      const result = await this.keyboardService.type(body);

      if (!result.success) {
        this.logger.error({ error: result.error }, 'Keyboard type failed');
      }

      reply.code(200).send(result);
    } catch (error) {
      this.logger.error({ error }, 'Unexpected error in keyboard type');
      reply.code(500).send({
        success: false,
        error: 'Internal server error during keyboard type operation',
      });
    }
  }

  /**
   * Pressiona uma tecla específica
   */
  private async pressKey(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const body = request.body as KeyboardPressKeyRequest;
      this.logger.info({ key: body.key }, 'Keyboard press key request');

      const result = await this.keyboardService.pressKey(body.key);

      if (!result.success) {
        this.logger.error({ error: result.error }, 'Keyboard press key failed');
      }

      reply.code(200).send(result);
    } catch (error) {
      this.logger.error({ error }, 'Unexpected error in keyboard press key');
      reply.code(500).send({
        success: false,
        error: 'Internal server error during keyboard press key operation',
      });
    }
  }

  /**
   * Executa combinação de teclas
   */
  private async combination(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const body = request.body as KeyboardCombinationRequest;
      this.logger.info({ keys: body.keys }, 'Keyboard combination request');

      const result = await this.keyboardService.combination(body.keys);

      if (!result.success) {
        this.logger.error({ error: result.error }, 'Keyboard combination failed');
      }

      reply.code(200).send(result);
    } catch (error) {
      this.logger.error({ error }, 'Unexpected error in keyboard combination');
      reply.code(500).send({
        success: false,
        error: 'Internal server error during keyboard combination operation',
      });
    }
  }

  /**
   * Copia conteúdo para clipboard
   */
  private async clipboardCopy(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const body = request.body as ClipboardCopyRequest;
      this.logger.info({ contentLength: body.content.length }, 'Clipboard copy request');

      const result = await this.clipboardService.copy(body.content);

      if (!result.success) {
        this.logger.error({ error: result.error }, 'Clipboard copy failed');
      }

      reply.code(200).send(result);
    } catch (error) {
      this.logger.error({ error }, 'Unexpected error in clipboard copy');
      reply.code(500).send({
        success: false,
        error: 'Internal server error during clipboard copy operation',
      });
    }
  }

  /**
   * Cola conteúdo do clipboard
   */
  private async clipboardPaste(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      this.logger.info('Clipboard paste request');

      const result = await this.clipboardService.paste();

      if (!result.success) {
        this.logger.error({ error: result.error }, 'Clipboard paste failed');
      }

      reply.code(200).send(result);
    } catch (error) {
      this.logger.error({ error }, 'Unexpected error in clipboard paste');
      reply.code(500).send({
        success: false,
        error: 'Internal server error during clipboard paste operation',
      });
    }
  }

  /**
   * Limpa o clipboard
   */
  private async clipboardClear(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      this.logger.info('Clipboard clear request');

      const result = await this.clipboardService.clear();

      if (!result.success) {
        this.logger.error({ error: result.error }, 'Clipboard clear failed');
      }

      reply.code(200).send(result);
    } catch (error) {
      this.logger.error({ error }, 'Unexpected error in clipboard clear');
      reply.code(500).send({
        success: false,
        error: 'Internal server error during clipboard clear operation',
      });
    }
  }
}
