import type { FastifyPluginAsync } from 'fastify';
import { AutomationController } from '../interface/controllers/automation.controller.js';
import { KeyboardController } from '../interface/controllers/keyboard.controller.js';

export const automationRoutes: FastifyPluginAsync = async (server) => {
  const controller = new AutomationController();
  controller.registerRoutes(server);

  // Registra rotas de keyboard e clipboard
  await server.register((fastify, opts, done) => {
    KeyboardController.buildRoutes(fastify, opts, done);
  });
};
