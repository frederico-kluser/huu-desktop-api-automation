import 'reflect-metadata';
import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { automationRoutes } from './routes/automation.routes.js';
import { errorHandler } from './interface/middleware/error-handler.middleware.js';
import { configureDependencies, container } from './config/dependency-injection.js';
import { ApplicationStartupService } from './application/services/application-startup.service.js';
import { environment } from './config/environment.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

configureDependencies();

const createServer = async () => {
  const server = Fastify({
    logger: {
      level: environment.logLevel,
      transport:
        environment.nodeEnv === 'development'
          ? {
              target: 'pino-pretty',
              options: {
                colorize: true,
                ignore: 'pid,hostname',
                translateTime: 'HH:MM:ss Z',
              },
            }
          : undefined,
    },
  });

  // Registrar rotas da API primeiro
  await server.register(automationRoutes, { prefix: '/api/v1' });

  // Health check
  server.get('/health', async (_request: FastifyRequest, reply: FastifyReply) => {
    await reply.send({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: environment.nodeEnv,
    });
  });

  // Registrar servir arquivos estáticos da web com configuração para não conflitar com API
  await server.register(fastifyStatic, {
    root: path.join(__dirname, '..', 'dist', 'web'),
    prefix: '/',
    wildcard: false, // Desabilita wildcard para evitar conflitos com rotas da API
  });

  server.setErrorHandler(errorHandler);

  // Catch-all para SPA - serve index.html para rotas não encontradas (exceto /api)
  server.setNotFoundHandler(async (request: FastifyRequest, reply: FastifyReply) => {
    // Se for uma rota da API, retorna 404 normal
    if (request.url.startsWith('/api/')) {
      return reply.code(404).send({
        success: false,
        error: 'Route not found',
      });
    }
    // Senão, retorna o index.html para o SPA
    return reply.sendFile('index.html');
  });

  return server;
};

const start = async () => {
  try {
    const server = await createServer();

    // Inicializar serviços da aplicação
    const startupService = container.resolve(ApplicationStartupService);
    await startupService.initialize();

    await server.listen({ port: environment.port, host: environment.host });
    server.log.info(`Server listening on http://${environment.host}:${environment.port}`);

    // Graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      server.log.info(`${signal} received, closing server gracefully`);
      await server.close();
      process.exit(0);
    };

    process.on('SIGTERM', () => void gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => void gracefulShutdown('SIGINT'));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

void start();
