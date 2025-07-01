import type { FastifyPluginAsync } from 'fastify';
import { AutomationController } from '../interface/controllers/automation.controller.js';

export const automationRoutes: FastifyPluginAsync = async (server) => {
  const controller = new AutomationController();
  controller.registerRoutes(server);
};