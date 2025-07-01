import 'reflect-metadata';
import Fastify from 'fastify';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { automationRoutes } from './routes/automation.routes.js';
import { errorHandler } from './interface/middleware/error-handler.middleware.js';
import { configureDependencies } from './config/dependency-injection.js';
import { environment } from './config/environment.js';

configureDependencies();

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

server.register(automationRoutes, { prefix: '/api/v1' });

server.setErrorHandler(errorHandler);

server.get('/health', async (_request: FastifyRequest, reply: FastifyReply) => {
  await reply.send({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: environment.nodeEnv
  });
});

const start = async () => {
  try {
    await server.listen({ port: environment.port, host: environment.host });
    server.log.info(`Server listening on http://${environment.host}:${environment.port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

// Graceful shutdown
const gracefulShutdown = async (signal: string) => {
  server.log.info(`${signal} received, closing server gracefully`);
  await server.close();
  process.exit(0);
};

process.on('SIGTERM', () => void gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => void gracefulShutdown('SIGINT'));

void start();