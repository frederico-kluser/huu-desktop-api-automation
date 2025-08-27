import type { FastifyRequest, FastifyReply } from 'fastify';

// Middleware desabilitado - autenticação removida
export async function authenticationMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  // Autenticação removida - todas as requisições são permitidas
  return;
}
