import type { FastifyRequest, FastifyReply } from 'fastify';
import { environment } from '../../config/environment.js';

export async function authenticationMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const apiKey = request.headers['x-api-key'] as string;

  if (!apiKey || apiKey !== environment.apiKey) {
    await reply.status(401).send({
      success: false,
      error: 'Unauthorized',
    });
  }
}
