import { z } from 'zod';

// Mock Fastify types
type MockRequest = {
  body: any;
};

type MockReply = {
  status: jest.Mock;
  send: jest.Mock;
};

// Usando require devido ao verbatimModuleSyntax (baseado no know-how.txt)
const { validateRequest } = require('../../../../src/interface/middleware/validation.middleware');

describe('validation.middleware', () => {
  let mockRequest: MockRequest;
  let mockReply: MockReply;

  beforeEach(() => {
    mockRequest = {
      body: {},
    };

    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockResolvedValue(undefined),
    };
  });

  describe('validateRequest', () => {
    test('successfully validates correct data', async () => {
      const schema = z.object({
        name: z.string(),
        age: z.number(),
      });

      mockRequest.body = { name: 'John', age: 25 };

      const middleware = validateRequest(schema);
      await middleware(mockRequest as any, mockReply as any);

      expect(mockRequest.body).toEqual({ name: 'John', age: 25 });
      expect(mockReply.status).not.toHaveBeenCalled();
      expect(mockReply.send).not.toHaveBeenCalled();
    });

    test('fails validation with missing required fields', async () => {
      const schema = z.object({
        name: z.string(),
        age: z.number(),
      });

      mockRequest.body = { name: 'John' }; // missing age

      const middleware = validateRequest(schema);
      await middleware(mockRequest as any, mockReply as any);

      expect(mockReply.status).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        error: 'Validation failed',
        message: expect.any(String),
      });
    });

    test('fails validation with wrong type', async () => {
      const schema = z.object({
        age: z.number(),
      });

      mockRequest.body = { age: 'not a number' };

      const middleware = validateRequest(schema);
      await middleware(mockRequest as any, mockReply as any);

      expect(mockReply.status).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        error: 'Validation failed',
        message: expect.any(String),
      });
    });

    test('transforms data according to schema', async () => {
      const schema = z.object({
        name: z.string().transform((str) => str.toUpperCase()),
        age: z.number(),
      });

      mockRequest.body = { name: 'john', age: 25 };

      const middleware = validateRequest(schema);
      await middleware(mockRequest as any, mockReply as any);

      expect(mockRequest.body).toEqual({ name: 'JOHN', age: 25 });
    });

    test('handles empty body', async () => {
      const schema = z.object({
        name: z.string(),
      });

      mockRequest.body = undefined;

      const middleware = validateRequest(schema);
      await middleware(mockRequest as any, mockReply as any);

      expect(mockReply.status).toHaveBeenCalledWith(400);
    });

    test('handles non-Error exceptions gracefully', async () => {
      const schema = z.object({
        name: z.string(),
      });

      // Force a non-Error exception by mocking parse to throw a string
      schema.parse = jest.fn().mockImplementation(() => {
        throw 'Not an error object';
      });

      mockRequest.body = { name: 'test' };

      const middleware = validateRequest(schema);
      await middleware(mockRequest as any, mockReply as any);

      // The code only handles Error instances, so nothing should happen for non-Error throws
      expect(mockReply.status).not.toHaveBeenCalled();
      expect(mockReply.send).not.toHaveBeenCalled();
    });

    test('handles complex nested schemas', async () => {
      const schema = z.object({
        user: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        settings: z.object({
          theme: z.enum(['light', 'dark']),
          notifications: z.boolean(),
        }),
      });

      mockRequest.body = {
        user: { name: 'John', email: 'john@example.com' },
        settings: { theme: 'dark', notifications: true },
      };

      const middleware = validateRequest(schema);
      await middleware(mockRequest as any, mockReply as any);

      expect(mockRequest.body).toEqual({
        user: { name: 'John', email: 'john@example.com' },
        settings: { theme: 'dark', notifications: true },
      });
    });

    test('handles array schemas', async () => {
      const schema = z.object({
        items: z.array(z.string()),
      });

      mockRequest.body = { items: ['a', 'b', 'c'] };

      const middleware = validateRequest(schema);
      await middleware(mockRequest as any, mockReply as any);

      expect(mockRequest.body).toEqual({ items: ['a', 'b', 'c'] });
    });

    test('handles optional fields', async () => {
      const schema = z.object({
        name: z.string(),
        nickname: z.string().optional(),
      });

      mockRequest.body = { name: 'John' };

      const middleware = validateRequest(schema);
      await middleware(mockRequest as any, mockReply as any);

      expect(mockRequest.body).toEqual({ name: 'John' });
      expect(mockReply.status).not.toHaveBeenCalled();
    });

    test('handles default values', async () => {
      const schema = z.object({
        name: z.string(),
        role: z.string().default('user'),
      });

      mockRequest.body = { name: 'John' };

      const middleware = validateRequest(schema);
      await middleware(mockRequest as any, mockReply as any);

      expect(mockRequest.body).toEqual({ name: 'John', role: 'user' });
    });

    test('preserves original error message from zod', async () => {
      const schema = z.object({
        email: z.string().email('Invalid email format'),
      });

      mockRequest.body = { email: 'not-an-email' };

      const middleware = validateRequest(schema);
      await middleware(mockRequest as any, mockReply as any);

      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        error: 'Validation failed',
        message: expect.stringContaining('email'),
      });
    });

    test('handles coercion', async () => {
      const schema = z.object({
        age: z.coerce.number(),
      });

      mockRequest.body = { age: '25' };

      const middleware = validateRequest(schema);
      await middleware(mockRequest as any, mockReply as any);

      expect(mockRequest.body).toEqual({ age: 25 });
    });

    test('validates union types', async () => {
      const schema = z.object({
        value: z.union([z.string(), z.number()]),
      });

      // Test with string
      mockRequest.body = { value: 'test' };
      let middleware = validateRequest(schema);
      await middleware(mockRequest as any, mockReply as any);
      expect(mockRequest.body).toEqual({ value: 'test' });

      // Test with number
      mockRequest.body = { value: 123 };
      middleware = validateRequest(schema);
      await middleware(mockRequest as any, mockReply as any);
      expect(mockRequest.body).toEqual({ value: 123 });
    });

    test('validates with refinements', async () => {
      const schema = z
        .object({
          password: z.string().min(8),
          confirmPassword: z.string(),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: "Passwords don't match",
        });

      mockRequest.body = { password: 'password123', confirmPassword: 'different' };

      const middleware = validateRequest(schema);
      await middleware(mockRequest as any, mockReply as any);

      expect(mockReply.status).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        error: 'Validation failed',
        message: expect.any(String),
      });
    });
  });
});
