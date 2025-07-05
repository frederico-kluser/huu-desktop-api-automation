/**
 * Testes unitários para automation-request.dto
 * Foco em máxima cobertura com execução rápida
 */
import 'reflect-metadata';

const z = require('zod').z;
const dto = require('../../../src/application/dto/automation-request.dto.js');

describe('automation-request.dto coverage', () => {
  const {
    pointSchema,
    mouseMoveSchema,
    mouseClickSchema,
    mouseDragSchema,
    mouseScrollSchema,
    screenFindSchema,
    screenCaptureSchema,
  } = dto;

  // Testa todos os schemas exportados
  test('validates all schemas with valid data', () => {
    const schemas = [
      { schema: pointSchema, data: { x: 100, y: 200 } },
      { schema: mouseMoveSchema, data: { x: 50, y: 100 } },
      { schema: mouseMoveSchema, data: { x: 50, y: 100, smooth: false, duration: 2000 } },
      { schema: mouseClickSchema, data: {} },
      { schema: mouseClickSchema, data: { x: 10, y: 20, button: 'right', doubleClick: true } },
      { schema: mouseDragSchema, data: { from: { x: 0, y: 0 }, to: { x: 100, y: 100 } } },
      { schema: mouseScrollSchema, data: { direction: 'up' } },
      { schema: mouseScrollSchema, data: { direction: 'down', amount: 5, smooth: false } },
      { schema: screenFindSchema, data: { template: 'test.png' } },
      {
        schema: screenFindSchema,
        data: {
          template: 'test.png',
          confidence: 0.9,
          region: { x: 0, y: 0, width: 100, height: 100 },
        },
      },
      { schema: screenCaptureSchema, data: {} },
      {
        schema: screenCaptureSchema,
        data: { format: 'jpg', region: { x: 10, y: 10, width: 200, height: 200 } },
      },
    ];

    schemas.forEach(({ schema, data }) => {
      expect(() => schema.parse(data)).not.toThrow();
    });
  });

  // Testa validações de erro para cobrir branches negativos
  test('validates all schemas with invalid data', () => {
    const invalidCases = [
      { schema: pointSchema, data: { x: -1, y: 0 } },
      { schema: pointSchema, data: { x: 0, y: -1 } },
      { schema: pointSchema, data: { x: 'string', y: 0 } },
      { schema: mouseMoveSchema, data: { x: -1, y: 0 } },
      { schema: mouseMoveSchema, data: { x: 0, y: 0, duration: 50 } },
      { schema: mouseMoveSchema, data: { x: 0, y: 0, duration: 6000 } },
      { schema: mouseClickSchema, data: { button: 'invalid' } },
      { schema: mouseDragSchema, data: { from: { x: -1, y: 0 }, to: { x: 0, y: 0 } } },
      { schema: mouseDragSchema, data: { from: { x: 0, y: 0 } } },
      { schema: mouseScrollSchema, data: { direction: 'invalid' } },
      { schema: mouseScrollSchema, data: { direction: 'up', amount: 0 } },
      { schema: mouseScrollSchema, data: { direction: 'up', amount: 11 } },
      { schema: screenFindSchema, data: { template: '' } },
      { schema: screenFindSchema, data: { template: 'test', confidence: -0.1 } },
      { schema: screenFindSchema, data: { template: 'test', confidence: 1.1 } },
      {
        schema: screenFindSchema,
        data: { template: 'test', region: { x: 0, y: 0, width: 0, height: 1 } },
      },
      { schema: screenCaptureSchema, data: { format: 'invalid' } },
    ];

    invalidCases.forEach(({ schema, data }) => {
      expect(() => schema.parse(data)).toThrow(z.ZodError);
    });
  });

  // Testa os tipos TypeScript exportados
  test('type inference works correctly', () => {
    // Os tipos inferidos incluem os valores default
    const moveResult = mouseMoveSchema.parse({ x: 0, y: 0 });
    const clickResult = mouseClickSchema.parse({});
    const dragResult = mouseDragSchema.parse({ from: { x: 0, y: 0 }, to: { x: 100, y: 100 } });
    const scrollResult = mouseScrollSchema.parse({ direction: 'up' });
    const findResult = screenFindSchema.parse({ template: 'test.png' });
    const captureResult = screenCaptureSchema.parse({});

    expect(moveResult).toBeDefined();
    expect(clickResult).toBeDefined();
    expect(dragResult).toBeDefined();
    expect(scrollResult).toBeDefined();
    expect(findResult).toBeDefined();
    expect(captureResult).toBeDefined();
  });

  // Testa valores default
  test('default values are applied correctly', () => {
    const moveResult = mouseMoveSchema.parse({ x: 0, y: 0 });
    expect(moveResult.smooth).toBe(true);
    expect(moveResult.duration).toBe(1000);

    const clickResult = mouseClickSchema.parse({});
    expect(clickResult.button).toBe('left');
    expect(clickResult.doubleClick).toBe(false);
    expect(clickResult.smooth).toBe(true);
    expect(clickResult.duration).toBe(1000);

    const dragResult = mouseDragSchema.parse({ from: { x: 0, y: 0 }, to: { x: 100, y: 100 } });
    expect(dragResult.duration).toBe(1000);
    expect(dragResult.smooth).toBe(true);

    const scrollResult = mouseScrollSchema.parse({ direction: 'up' });
    expect(scrollResult.amount).toBe(3);
    expect(scrollResult.smooth).toBe(true);
    expect(scrollResult.duration).toBe(1000);

    const findResult = screenFindSchema.parse({ template: 'test' });
    expect(findResult.confidence).toBe(0.8);

    const captureResult = screenCaptureSchema.parse({});
    expect(captureResult.format).toBe('png');
  });

  // Testa campos opcionais
  test('optional fields work correctly', () => {
    // MouseClick com apenas campos opcionais
    const clickMinimal = mouseClickSchema.parse({});
    expect(clickMinimal.x).toBeUndefined();
    expect(clickMinimal.y).toBeUndefined();

    // ScreenFind sem region
    const findMinimal = screenFindSchema.parse({ template: 'test' });
    expect(findMinimal.region).toBeUndefined();

    // ScreenCapture sem region
    const captureMinimal = screenCaptureSchema.parse({});
    expect(captureMinimal.region).toBeUndefined();
  });

  // Testa todos os valores enum
  test('enum values are validated correctly', () => {
    // MouseClick buttons
    expect(() => mouseClickSchema.parse({ button: 'left' })).not.toThrow();
    expect(() => mouseClickSchema.parse({ button: 'right' })).not.toThrow();
    expect(() => mouseClickSchema.parse({ button: 'middle' })).not.toThrow();

    // MouseScroll directions
    expect(() => mouseScrollSchema.parse({ direction: 'up' })).not.toThrow();
    expect(() => mouseScrollSchema.parse({ direction: 'down' })).not.toThrow();

    // ScreenCapture formats
    expect(() => screenCaptureSchema.parse({ format: 'png' })).not.toThrow();
    expect(() => screenCaptureSchema.parse({ format: 'jpg' })).not.toThrow();
  });

  // Testa limites numéricos
  test('numeric boundaries are validated correctly', () => {
    // Point schema
    expect(() => pointSchema.parse({ x: 0, y: 0 })).not.toThrow();
    expect(() =>
      pointSchema.parse({ x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER }),
    ).not.toThrow();

    // Duration boundaries
    expect(() => mouseMoveSchema.parse({ x: 0, y: 0, duration: 100 })).not.toThrow();
    expect(() => mouseMoveSchema.parse({ x: 0, y: 0, duration: 5000 })).not.toThrow();

    // Scroll amount boundaries
    expect(() => mouseScrollSchema.parse({ direction: 'up', amount: 1 })).not.toThrow();
    expect(() => mouseScrollSchema.parse({ direction: 'up', amount: 10 })).not.toThrow();

    // Confidence boundaries
    expect(() => screenFindSchema.parse({ template: 'test', confidence: 0 })).not.toThrow();
    expect(() => screenFindSchema.parse({ template: 'test', confidence: 1 })).not.toThrow();

    // Region boundaries
    expect(() =>
      screenCaptureSchema.parse({ region: { x: 0, y: 0, width: 1, height: 1 } }),
    ).not.toThrow();
  });

  // Testa dados inválidos adicionais para máxima cobertura
  test('handles edge cases', () => {
    // Null e undefined
    expect(() => pointSchema.parse(null)).toThrow();
    expect(() => pointSchema.parse(undefined)).toThrow();
    expect(() => pointSchema.parse({})).toThrow();

    // Campos extras são ignorados
    const extraFields = pointSchema.parse({ x: 0, y: 0, extra: 'field' } as any);
    expect(extraFields).toEqual({ x: 0, y: 0 });

    // Region com valores faltando
    expect(() => screenFindSchema.parse({ template: 'test', region: { x: 0 } })).toThrow();
    expect(() =>
      screenFindSchema.parse({ template: 'test', region: { x: 0, y: 0, width: 1 } }),
    ).toThrow();
  });
});
