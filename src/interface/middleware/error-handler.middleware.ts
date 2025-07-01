import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';

export async function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  request.log.error(error);

  if (error instanceof ZodError) {
    await reply.status(400).send({
      success: false,
      error: 'Validation error',
      details: error.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
    return;
  }

  if (error.validation) {
    await reply.status(400).send({
      success: false,
      error: 'Validation error',
      details: error.validation,
    });
    return;
  }

  if (error.statusCode) {
    await reply.status(error.statusCode).send({
      success: false,
      error: error.message,
    });
    return;
  }

  await reply.status(500).send({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : undefined,
  });
}