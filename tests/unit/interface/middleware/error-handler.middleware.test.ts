import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';

// Usar require() em vez de import para contornar verbatimModuleSyntax
const {
  errorHandler,
  DomainError,
  NotFoundError,
  UnauthorizedError,
  LimitExceededError,
} = require('../../../../src/interface/middleware/error-handler.middleware');

describe('error-handler.middleware', () => {
  let mockRequest: Partial<FastifyRequest>;
  let mockReply: Partial<FastifyReply>;

  beforeEach(() => {
    mockRequest = {
      method: 'GET',
      url: '/test',
      id: 'test-id',
      log: {
        error: jest.fn(),
      } as any,
    };

    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockResolvedValue(undefined),
    };
  });

  describe('DomainError class', () => {
    test('creates instance with default status code', () => {
      const error = new DomainError('test message', 'TEST_CODE');
      expect(error.message).toBe('test message');
      expect(error.code).toBe('TEST_CODE');
      expect(error.statusCode).toBe(400);
      expect(error.name).toBe('DomainError');
    });

    test('creates instance with custom status code', () => {
      const error = new DomainError('test message', 'TEST_CODE', 500);
      expect(error.statusCode).toBe(500);
    });
  });

  describe('NotFoundError class', () => {
    test('creates instance with resource name', () => {
      const error = new NotFoundError('User');
      expect(error.message).toBe('User not found');
      expect(error.code).toBe('NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('UnauthorizedError class', () => {
    test('creates instance with default message', () => {
      const error = new UnauthorizedError();
      expect(error.message).toBe('Unauthorized');
      expect(error.code).toBe('UNAUTHORIZED');
      expect(error.statusCode).toBe(401);
    });

    test('creates instance with custom message', () => {
      const error = new UnauthorizedError('Invalid token');
      expect(error.message).toBe('Invalid token');
    });
  });

  describe('LimitExceededError class', () => {
    test('creates instance with message', () => {
      const error = new LimitExceededError('File too large');
      expect(error.message).toBe('File too large');
      expect(error.code).toBe('LIMIT_EXCEEDED');
      expect(error.statusCode).toBe(413);
    });
  });

  describe('errorHandler function', () => {
    test('handles ZodError', async () => {
      const zodError = new ZodError([
        {
          path: ['field', 'nested'],
          message: 'Invalid value',
          code: 'invalid_type',
          expected: 'string',
          received: 'number',
        },
      ]);

      await errorHandler(zodError, mockRequest as FastifyRequest, mockReply as FastifyReply);

      expect(mockReply.status).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        error: 'Validation error',
        code: 'VALIDATION_ERROR',
        details: [
          {
            path: 'field.nested',
            message: 'Invalid value',
            type: 'invalid_type',
          },
        ],
      });
    });

    test('handles DomainError', async () => {
      const domainError = new DomainError('Domain error', 'DOMAIN_CODE', 422);

      await errorHandler(domainError, mockRequest as FastifyRequest, mockReply as FastifyReply);

      expect(mockReply.status).toHaveBeenCalledWith(422);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        error: 'Domain error',
        code: 'DOMAIN_CODE',
      });
    });

    test('handles Fastify validation error', async () => {
      const fastifyError: any = {
        message: 'Validation failed',
        validation: [{ dataPath: '/body/name', message: 'should be string' }],
      };

      await errorHandler(fastifyError, mockRequest as FastifyRequest, mockReply as FastifyReply);

      expect(mockReply.status).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        error: 'Validation error',
        code: 'VALIDATION_ERROR',
        details: fastifyError.validation,
      });
    });

    test('handles error with known status code', async () => {
      const error: any = {
        message: 'Not found',
        statusCode: 404,
      };

      await errorHandler(error, mockRequest as FastifyRequest, mockReply as FastifyReply);

      expect(mockReply.status).toHaveBeenCalledWith(404);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        error: 'Not found',
        code: 'NOT_FOUND',
      });
    });

    test('handles error with unknown status code', async () => {
      const error: any = {
        message: 'Unknown error',
        statusCode: 999,
      };

      await errorHandler(error, mockRequest as FastifyRequest, mockReply as FastifyReply);

      expect(mockReply.status).toHaveBeenCalledWith(999);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        error: 'Unknown error',
        code: 'UNKNOWN_ERROR',
      });
    });

    test('handles timeout error', async () => {
      const error = new Error('Connection timeout');

      await errorHandler(error, mockRequest as FastifyRequest, mockReply as FastifyReply);

      expect(mockReply.status).toHaveBeenCalledWith(408);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        error: 'Request timeout',
        code: 'REQUEST_TIMEOUT',
      });
    });

    test('handles generic error in development', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const error = new Error('Generic error message');
      error.stack = 'Error stack trace';

      await errorHandler(error, mockRequest as FastifyRequest, mockReply as FastifyReply);

      expect(mockRequest.log!.error).toHaveBeenCalledWith({
        error: {
          message: 'Generic error message',
          name: 'Error',
          stack: 'Error stack trace',
        },
        request: {
          method: 'GET',
          url: '/test',
          id: 'test-id',
        },
      });

      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        error: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Generic error message',
      });

      process.env.NODE_ENV = originalEnv;
    });

    test('handles generic error in production', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const error = new Error('Generic error message');
      error.stack = 'Error stack trace';

      await errorHandler(error, mockRequest as FastifyRequest, mockReply as FastifyReply);

      expect(mockRequest.log!.error).toHaveBeenCalledWith({
        error: {
          message: 'Generic error message',
          name: 'Error',
          stack: undefined,
        },
        request: {
          method: 'GET',
          url: '/test',
          id: 'test-id',
        },
      });

      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        error: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
        message: undefined,
      });

      process.env.NODE_ENV = originalEnv;
    });

    test('handles all HTTP status codes in errorCodes map', () => {
      const statusCodes = [400, 401, 403, 404, 405, 408, 413, 429, 500, 502, 503, 504];

      statusCodes.forEach(async (statusCode) => {
        const error: any = {
          message: `Error ${statusCode}`,
          statusCode,
        };

        await errorHandler(error, mockRequest as FastifyRequest, mockReply as FastifyReply);
        expect(mockReply.status).toHaveBeenCalledWith(statusCode);
      });
    });
  });
});
