describe('clipboard-request.dto', () => {
  let clipboardCopySchema: any;
  let clipboardPasteSchema: any;
  let clipboardClearSchema: any;

  beforeAll(() => {
    const module = require('../../../src/application/dto/clipboard-request.dto');
    clipboardCopySchema = module.clipboardCopySchema;
    clipboardPasteSchema = module.clipboardPasteSchema;
    clipboardClearSchema = module.clipboardClearSchema;
  });

  describe('clipboardCopySchema', () => {
    test('validates valid content', () => {
      const result = clipboardCopySchema.parse({ content: 'test content' });
      expect(result).toEqual({ content: 'test content' });
    });

    test('rejects empty content', () => {
      expect(() => clipboardCopySchema.parse({ content: '' })).toThrow();
    });

    test('rejects missing content', () => {
      expect(() => clipboardCopySchema.parse({})).toThrow();
    });

    test('accepts content at 1MB limit', () => {
      const content = 'a'.repeat(1048576);
      const result = clipboardCopySchema.parse({ content });
      expect(result.content.length).toBe(1048576);
    });

    test('rejects content over 1MB', () => {
      const content = 'a'.repeat(1048577);
      expect(() => clipboardCopySchema.parse({ content })).toThrow();
    });

    test('handles unicode content correctly', () => {
      const content = '🚀'.repeat(100);
      const result = clipboardCopySchema.parse({ content });
      expect(result.content).toBe(content);
    });
  });

  describe('clipboardPasteSchema', () => {
    test('validates empty object', () => {
      const result = clipboardPasteSchema.parse({});
      expect(result).toEqual({});
    });

    test('allows extra properties', () => {
      const result = clipboardPasteSchema.parse({ extra: 'property' });
      expect(result).toBeDefined();
    });
  });

  describe('clipboardClearSchema', () => {
    test('validates empty object', () => {
      const result = clipboardClearSchema.parse({});
      expect(result).toEqual({});
    });

    test('allows extra properties', () => {
      const result = clipboardClearSchema.parse({ extra: 'property' });
      expect(result).toBeDefined();
    });
  });

  describe('type exports', () => {
    test('exports are defined', () => {
      const module = require('../../../src/application/dto/clipboard-request.dto');
      expect(module.clipboardCopySchema).toBeDefined();
      expect(module.clipboardPasteSchema).toBeDefined();
      expect(module.clipboardClearSchema).toBeDefined();
    });
  });
});