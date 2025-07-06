import type { FastifyInstance, FastifyRequest, FastifyReply, FastifyPluginOptions } from 'fastify';

/**
 * Rotas para verificação de status da API
 * Usado pelo frontend para monitorar saúde da aplicação
 */
export const statusRoutes = (
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
  done: () => void,
): void => {
  /**
   * GET /status
   * Retorna o status atual da API
   */
  fastify.get('/status', async (_request: FastifyRequest, reply: FastifyReply) => {
    const startTime = Date.now();

    try {
      // Calcula latência como tempo de processamento
      const latency = Date.now() - startTime;

      return reply.send({
        ok: true,
        latency,
        message: 'API is operational',
        checkedAt: new Date().toISOString(),
      });
    } catch (error) {
      const latency = Date.now() - startTime;

      return reply.code(503).send({
        ok: false,
        latency,
        message: 'API is experiencing issues',
        checkedAt: new Date().toISOString(),
      });
    }
  });

  done();
};
