import type { FastifyPluginAsync } from 'fastify';
import { AutomationController } from '../interface/controllers/automation.controller.js';
import { KeyboardController } from '../interface/controllers/keyboard.controller.js';
import { LLMController } from '../interface/controllers/llm.controller.js';
import { OcrController } from '../interface/controllers/ocr.controller.js';
import { inputEventsRoutes } from './input-events.routes.js';
import { statusRoutes } from './status.routes.js';
import { container } from '../config/dependency-injection.js';

export const automationRoutes: FastifyPluginAsync = async (server) => {
  const controller = new AutomationController();
  controller.registerRoutes(server);

  // Registra rotas de keyboard e clipboard
  await server.register((fastify, opts, done) => {
    KeyboardController.buildRoutes(fastify, opts, done);
  });

  // Registra rotas de LLM
  const llmController = new LLMController();
  llmController.registerRoutes(server);

  // Registra rotas de OCR
  const ocrController = container.resolve(OcrController);
  ocrController.registerRoutes(server);

  // Registra rotas de status
  await server.register(statusRoutes);

  // Registra rotas de streaming de eventos de input
  await server.register(inputEventsRoutes, { prefix: '/stream' });
};
