// Using require due to verbatimModuleSyntax restrictions
const schemas = require('../../../../src/interface/schemas/keyboard.schemas');
const Ajv = require('ajv');

describe('keyboard.schemas', () => {
  let ajv: any;

  beforeEach(() => {
    ajv = new Ajv();
  });

  describe('keyboardTypeJsonSchema', () => {
    const validate = () => ajv.compile(schemas.keyboardTypeJsonSchema);

    test('schema is valid JSON Schema', () => {
      expect(() => validate()).not.toThrow();
    });

    test('validates valid minimal input', () => {
      const validator = validate();
      const result = validator({ text: 'Hello' });
      expect(result).toBe(true);
    });

    test('validates with all optional fields', () => {
      const validator = validate();
      const result = validator({
        text: 'Hello World',
        mode: 'perChar',
        value: 50
      });
      expect(result).toBe(true);
    });

    test('applies default mode when not provided', () => {
      const validator = validate();
      const data = { text: 'Test' };
      validator(data);
      // Schema doesn't modify data, just validates
      expect(validator.errors).toBeNull();
    });

    test('rejects empty text', () => {
      const validator = validate();
      const result = validator({ text: '' });
      expect(result).toBe(false);
    });

    test('rejects text exceeding maxLength', () => {
      const validator = validate();
      const longText = 'a'.repeat(10001);
      const result = validator({ text: longText });
      expect(result).toBe(false);
    });

    test('rejects missing text', () => {
      const validator = validate();
      const result = validator({ mode: 'instant' });
      expect(result).toBe(false);
    });

    test('validates all mode values', () => {
      const validator = validate();
      ['instant', 'perChar', 'total'].forEach(mode => {
        const result = validator({ text: 'Test', mode });
        expect(result).toBe(true);
      });
    });

    test('rejects invalid mode', () => {
      const validator = validate();
      const result = validator({ text: 'Test', mode: 'invalid' });
      expect(result).toBe(false);
    });

    test('validates value at boundaries', () => {
      const validator = validate();
      expect(validator({ text: 'Test', value: 0 })).toBe(true);
      expect(validator({ text: 'Test', value: 300000 })).toBe(true);
    });

    test('rejects negative value', () => {
      const validator = validate();
      const result = validator({ text: 'Test', value: -1 });
      expect(result).toBe(false);
    });

    test('rejects value exceeding maximum', () => {
      const validator = validate();
      const result = validator({ text: 'Test', value: 300001 });
      expect(result).toBe(false);
    });

    test('rejects non-integer value', () => {
      const validator = validate();
      const result = validator({ text: 'Test', value: 50.5 });
      expect(result).toBe(false);
    });

    test('rejects additional properties', () => {
      const validator = validate();
      const result = validator({ text: 'Test', extra: 'field' });
      expect(result).toBe(false);
    });

    test('rejects non-object input', () => {
      const validator = validate();
      expect(validator('string')).toBe(false);
      expect(validator(123)).toBe(false);
      expect(validator([])).toBe(false);
      expect(validator(null)).toBe(false);
    });
  });

  describe('keyboardPressKeyJsonSchema', () => {
    const validate = () => ajv.compile(schemas.keyboardPressKeyJsonSchema);

    test('schema is valid JSON Schema', () => {
      expect(() => validate()).not.toThrow();
    });

    test('validates valid key', () => {
      const validator = validate();
      const result = validator({ key: 'enter' });
      expect(result).toBe(true);
    });

    test('validates function keys', () => {
      const validator = validate();
      ['f1', 'f12', 'tab', 'escape'].forEach(key => {
        const result = validator({ key });
        expect(result).toBe(true);
      });
    });

    test('rejects empty key', () => {
      const validator = validate();
      const result = validator({ key: '' });
      expect(result).toBe(false);
    });

    test('rejects missing key', () => {
      const validator = validate();
      const result = validator({});
      expect(result).toBe(false);
    });

    test('rejects additional properties', () => {
      const validator = validate();
      const result = validator({ key: 'enter', modifier: 'ctrl' });
      expect(result).toBe(false);
    });

    test('rejects non-string key', () => {
      const validator = validate();
      expect(validator({ key: 123 })).toBe(false);
      expect(validator({ key: ['enter'] })).toBe(false);
      expect(validator({ key: null })).toBe(false);
    });

    test('rejects non-object input', () => {
      const validator = validate();
      expect(validator('enter')).toBe(false);
      expect(validator(123)).toBe(false);
      expect(validator([])).toBe(false);
      expect(validator(null)).toBe(false);
    });
  });

  describe('keyboardCombinationJsonSchema', () => {
    const validate = () => ajv.compile(schemas.keyboardCombinationJsonSchema);

    test('schema is valid JSON Schema', () => {
      expect(() => validate()).not.toThrow();
    });

    test('validates single key combination', () => {
      const validator = validate();
      const result = validator({ keys: ['ctrl'] });
      expect(result).toBe(true);
    });

    test('validates multi-key combination', () => {
      const validator = validate();
      const result = validator({ keys: ['ctrl', 'c'] });
      expect(result).toBe(true);
    });

    test('validates maximum keys', () => {
      const validator = validate();
      const result = validator({ keys: ['ctrl', 'alt', 'shift', 'cmd', 'a'] });
      expect(result).toBe(true);
    });

    test('rejects empty array', () => {
      const validator = validate();
      const result = validator({ keys: [] });
      expect(result).toBe(false);
    });

    test('rejects too many keys', () => {
      const validator = validate();
      const result = validator({ keys: ['a', 'b', 'c', 'd', 'e', 'f'] });
      expect(result).toBe(false);
    });

    test('rejects empty string in keys', () => {
      const validator = validate();
      const result = validator({ keys: ['ctrl', ''] });
      expect(result).toBe(false);
    });

    test('rejects non-string values in array', () => {
      const validator = validate();
      expect(validator({ keys: [123] })).toBe(false);
      expect(validator({ keys: [null] })).toBe(false);
      expect(validator({ keys: [['ctrl']] })).toBe(false);
    });

    test('rejects missing keys', () => {
      const validator = validate();
      const result = validator({});
      expect(result).toBe(false);
    });

    test('rejects non-array keys', () => {
      const validator = validate();
      expect(validator({ keys: 'ctrl' })).toBe(false);
      expect(validator({ keys: 123 })).toBe(false);
      expect(validator({ keys: { key: 'ctrl' } })).toBe(false);
    });

    test('rejects additional properties', () => {
      const validator = validate();
      const result = validator({ keys: ['ctrl', 'c'], delay: 100 });
      expect(result).toBe(false);
    });

    test('rejects non-object input', () => {
      const validator = validate();
      expect(validator(['ctrl', 'c'])).toBe(false);
      expect(validator('ctrl+c')).toBe(false);
      expect(validator(123)).toBe(false);
      expect(validator(null)).toBe(false);
    });
  });

  // Test all exports
  test('exports all expected schemas', () => {
    expect(schemas.keyboardTypeJsonSchema).toBeDefined();
    expect(schemas.keyboardPressKeyJsonSchema).toBeDefined();
    expect(schemas.keyboardCombinationJsonSchema).toBeDefined();
    
    // Verify they are objects (schemas)
    expect(typeof schemas.keyboardTypeJsonSchema).toBe('object');
    expect(typeof schemas.keyboardPressKeyJsonSchema).toBe('object');
    expect(typeof schemas.keyboardCombinationJsonSchema).toBe('object');
  });

  // Test schema properties
  test('all schemas have required JSON Schema properties', () => {
    const allSchemas = [
      schemas.keyboardTypeJsonSchema,
      schemas.keyboardPressKeyJsonSchema,
      schemas.keyboardCombinationJsonSchema
    ];

    allSchemas.forEach(schema => {
      expect(schema.$schema).toBe('http://json-schema.org/draft-07/schema#');
      expect(schema.type).toBe('object');
      expect(schema.properties).toBeDefined();
      expect(schema.required).toBeDefined();
      expect(schema.additionalProperties).toBe(false);
    });
  });
});