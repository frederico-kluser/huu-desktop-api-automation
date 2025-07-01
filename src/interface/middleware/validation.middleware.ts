import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ZodSchema } from 'zod';

export function validateRequest(schema: ZodSchema) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const validated = schema.parse(request.body);
      request.body = validated;
    } catch (error) {
      if (error instanceof Error) {
        await reply.status(400).send({
          success: false,
          error: 'Validation failed',
          message: error.message,
        });
      }
    }
  };
}