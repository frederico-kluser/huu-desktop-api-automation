import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';

/**
 * Classe de erro customizada para erros de domínio
 */
export class DomainError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 400
  ) {
    super(message);
    this.name = 'DomainError';
  }
}

/**
 * Classe de erro para recursos não encontrados
 */
export class NotFoundError extends DomainError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND', 404);
  }
}

/**
 * Classe de erro para operações não autorizadas
 */
export class UnauthorizedError extends DomainError {
  constructor(message: string = 'Unauthorized') {
    super(message, 'UNAUTHORIZED', 401);
  }
}

/**
 * Classe de erro para limites excedidos
 */
export class LimitExceededError extends DomainError {
  constructor(message: string) {
    super(message, 'LIMIT_EXCEEDED', 413);
  }
}

export async function errorHandler(
  error: FastifyError | Error,
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  // Log estruturado do erro
  request.log.error({
    error: {
      message: error.message,
      name: error.name,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    },
    request: {
      method: request.method,
      url: request.url,
      id: request.id,
    },
  });

  // Erros de validação Zod
  if (error instanceof ZodError) {
    await reply.status(400).send({
      success: false,
      error: 'Validation error',
      code: 'VALIDATION_ERROR',
      details: error.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
        type: e.code,
      })),
    });
    return;
  }

  // Erros de domínio customizados
  if (error instanceof DomainError) {
    await reply.status(error.statusCode).send({
      success: false,
      error: error.message,
      code: error.code,
    });
    return;
  }

  // Erros de validação do Fastify
  if ('validation' in error && error.validation) {
    await reply.status(400).send({
      success: false,
      error: 'Validation error',
      code: 'VALIDATION_ERROR',
      details: error.validation,
    });
    return;
  }

  // Erros com status code específico
  if ('statusCode' in error && error.statusCode) {
    const statusCode = error.statusCode as number;
    
    // Mapeamento de códigos HTTP para códigos de erro
    const errorCodes: Record<number, string> = {
      400: 'BAD_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      405: 'METHOD_NOT_ALLOWED',
      408: 'REQUEST_TIMEOUT',
      413: 'PAYLOAD_TOO_LARGE',
      429: 'TOO_MANY_REQUESTS',
      500: 'INTERNAL_SERVER_ERROR',
      502: 'BAD_GATEWAY',
      503: 'SERVICE_UNAVAILABLE',
      504: 'GATEWAY_TIMEOUT',
    };

    await reply.status(statusCode).send({
      success: false,
      error: error.message,
      code: errorCodes[statusCode] || 'UNKNOWN_ERROR',
    });
    return;
  }

  // Erro de timeout
  if (error.message && error.message.toLowerCase().includes('timeout')) {
    await reply.status(408).send({
      success: false,
      error: 'Request timeout',
      code: 'REQUEST_TIMEOUT',
    });
    return;
  }

  // Erro genérico - Internal Server Error
  await reply.status(500).send({
    success: false,
    error: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR',
    message: process.env.NODE_ENV === 'development' ? error.message : undefined,
  });
}