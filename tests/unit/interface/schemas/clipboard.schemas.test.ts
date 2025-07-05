/**
 * Testes para clipboard.schemas.ts
 * Foco em maximização rápida de coverage
 */

// Usando require devido ao verbatimModuleSyntax (know-how.txt)
const { 
  clipboardCopyJsonSchema,
  clipboardPasteJsonSchema, 
  clipboardClearJsonSchema
} = require('../../../../src/interface/schemas/clipboard.schemas');

describe('clipboard.schemas', () => {
  describe('clipboardCopyJsonSchema', () => {
    test('should have correct structure', () => {
      expect(clipboardCopyJsonSchema).toBeDefined();
      expect(clipboardCopyJsonSchema.$schema).toBe('http://json-schema.org/draft-07/schema#');
      expect(clipboardCopyJsonSchema.type).toBe('object');
      expect(clipboardCopyJsonSchema.additionalProperties).toBe(false);
    });

    test('should have content property with correct constraints', () => {
      expect(clipboardCopyJsonSchema.properties).toBeDefined();
      expect(clipboardCopyJsonSchema.properties.content).toEqual({
        type: 'string',
        minLength: 1,
        description: 'Content to copy to clipboard (max 1 MB)'
      });
    });

    test('should require content field', () => {
      expect(clipboardCopyJsonSchema.required).toEqual(['content']);
    });

    test('should be valid JSON Schema 7', () => {
      // Test all properties are defined
      const schema = clipboardCopyJsonSchema;
      expect(schema.$schema).toMatch(/json-schema\.org\/draft-07\/schema/);
      expect(typeof schema.type).toBe('string');
      expect(typeof schema.properties).toBe('object');
      expect(Array.isArray(schema.required)).toBe(true);
      expect(typeof schema.additionalProperties).toBe('boolean');
    });
  });

  describe('clipboardPasteJsonSchema', () => {
    test('should have correct structure', () => {
      expect(clipboardPasteJsonSchema).toBeDefined();
      expect(clipboardPasteJsonSchema.$schema).toBe('http://json-schema.org/draft-07/schema#');
      expect(clipboardPasteJsonSchema.type).toBe('object');
      expect(clipboardPasteJsonSchema.additionalProperties).toBe(false);
    });

    test('should have empty properties', () => {
      expect(clipboardPasteJsonSchema.properties).toEqual({});
    });

    test('should not have required fields', () => {
      expect(clipboardPasteJsonSchema.required).toBeUndefined();
    });
  });

  describe('clipboardClearJsonSchema', () => {
    test('should have correct structure', () => {
      expect(clipboardClearJsonSchema).toBeDefined();
      expect(clipboardClearJsonSchema.$schema).toBe('http://json-schema.org/draft-07/schema#');
      expect(clipboardClearJsonSchema.type).toBe('object');
      expect(clipboardClearJsonSchema.additionalProperties).toBe(false);
    });

    test('should have empty properties', () => {
      expect(clipboardClearJsonSchema.properties).toEqual({});
    });

    test('should not have required fields', () => {
      expect(clipboardClearJsonSchema.required).toBeUndefined();
    });
  });

  describe('all schemas coverage', () => {
    test('should export exactly 3 schemas', () => {
      const exports = require('../../../../src/interface/schemas/clipboard.schemas');
      const exportedSchemas = Object.keys(exports);
      expect(exportedSchemas).toHaveLength(3);
      expect(exportedSchemas).toContain('clipboardCopyJsonSchema');
      expect(exportedSchemas).toContain('clipboardPasteJsonSchema');
      expect(exportedSchemas).toContain('clipboardClearJsonSchema');
    });

    test('all schemas should be valid objects', () => {
      const exports = require('../../../../src/interface/schemas/clipboard.schemas');
      Object.values(exports).forEach((schema) => {
        expect(typeof schema).toBe('object');
        expect(schema).not.toBeNull();
        expect(schema).toHaveProperty('$schema');
        expect(schema).toHaveProperty('type');
      });
    });
  });
});