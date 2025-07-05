import type { FastifyPluginAsync } from 'fastify';
import { AutomationController } from '../interface/controllers/automation.controller.js';
import { KeyboardController } from '../interface/controllers/keyboard.controller.js';
import { LLMController } from '../interface/controllers/llm.controller.js';
import { inputEventsRoutes } from './input-events.routes.js';
import { recorderRoutes } from './recorder.routes.js';

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

  // Registra rotas de streaming de eventos de input
  await server.register(inputEventsRoutes, { prefix: '/stream' });

  // Registra rotas do recorder
  await server.register(recorderRoutes);
};
