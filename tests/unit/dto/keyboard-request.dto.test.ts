/**
 * Testes para keyboard-request.dto.ts
 * Aplicando conhecimento do know-how.txt sobre DTOs com Zod schemas
 */

import { 
  keyboardTypeSchema,
  keyboardPressKeySchema,
  keyboardCombinationSchema,
  type KeyboardTypeRequest,
  type KeyboardPressKeyRequest,
  type KeyboardCombinationRequest
} from '../../../src/application/dto/keyboard-request.dto';

describe('keyboard-request.dto', () => {
  describe('keyboardTypeSchema', () => {
    test('validates valid type requests', () => {
      // Caso básico válido
      expect(() => keyboardTypeSchema.parse({ text: 'Hello' })).not.toThrow();
      
      // Com mode instant (default)
      const result1 = keyboardTypeSchema.parse({ text: 'Test' });
      expect(result1.mode).toBe('instant');
      
      // Com diferentes modes
      expect(() => keyboardTypeSchema.parse({ text: 'Test', mode: 'perChar' })).not.toThrow();
      expect(() => keyboardTypeSchema.parse({ text: 'Test', mode: 'total' })).not.toThrow();
      
      // Com value
      expect(() => keyboardTypeSchema.parse({ text: 'Test', value: 1000 })).not.toThrow();
      expect(() => keyboardTypeSchema.parse({ text: 'Test', mode: 'perChar', value: 50 })).not.toThrow();
    });

    test('rejects invalid text', () => {
      // String vazia
      expect(() => keyboardTypeSchema.parse({ text: '' })).toThrow('Text cannot be empty');
      
      // String muito longa
      const longText = 'a'.repeat(10001);
      expect(() => keyboardTypeSchema.parse({ text: longText })).toThrow('Text exceeds maximum length');
      
      // Apenas caracteres de controle
      expect(() => keyboardTypeSchema.parse({ text: '\x00\x01\x02' })).toThrow('Text cannot contain only control characters');
    });

    test('validates mode enum', () => {
      // Mode inválido
      expect(() => keyboardTypeSchema.parse({ text: 'Test', mode: 'invalid' as any })).toThrow();
    });

    test('validates value constraints', () => {
      // Valor negativo
      expect(() => keyboardTypeSchema.parse({ text: 'Test', value: -1 })).toThrow('Value must be non-negative');
      
      // Valor não inteiro
      expect(() => keyboardTypeSchema.parse({ text: 'Test', value: 1.5 })).toThrow('Value must be an integer');
      
      // Valor muito alto
      expect(() => keyboardTypeSchema.parse({ text: 'Test', value: 300001 })).toThrow('Value exceeds maximum');
    });

    test('sanitizes control characters while keeping text', () => {
      const result = keyboardTypeSchema.parse({ text: 'Hello\x00World' });
      expect(result.text).toBe('Hello\x00World'); // Schema não modifica, apenas valida
    });
  });

  describe('keyboardPressKeySchema', () => {
    test('validates supported keys', () => {
      // Teclas básicas
      ['enter', 'tab', 'escape', 'space', 'backspace', 'delete'].forEach(key => {
        expect(() => keyboardPressKeySchema.parse({ key })).not.toThrow();
      });
      
      // Teclas de navegação
      ['up', 'down', 'left', 'right', 'home', 'end', 'pageup', 'pagedown'].forEach(key => {
        expect(() => keyboardPressKeySchema.parse({ key })).not.toThrow();
      });
      
      // Teclas de função
      for (let i = 1; i <= 12; i++) {
        expect(() => keyboardPressKeySchema.parse({ key: `f${i}` })).not.toThrow();
      }
    });

    test('transforms key to lowercase', () => {
      const result = keyboardPressKeySchema.parse({ key: 'ENTER' });
      expect(result.key).toBe('enter');
    });

    test('rejects invalid keys', () => {
      // Key vazia
      expect(() => keyboardPressKeySchema.parse({ key: '' })).toThrow('Key cannot be empty');
      
      // Key não suportada
      expect(() => keyboardPressKeySchema.parse({ key: 'invalid' })).toThrow('Unsupported key');
      expect(() => keyboardPressKeySchema.parse({ key: 'ctrl' })).toThrow('Unsupported key');
    });
  });

  describe('keyboardCombinationSchema', () => {
    test('validates valid key combinations', () => {
      // Combinações básicas
      expect(() => keyboardCombinationSchema.parse({ keys: ['ctrl', 'c'] })).not.toThrow();
      expect(() => keyboardCombinationSchema.parse({ keys: ['ctrl', 'shift', 'v'] })).not.toThrow();
      expect(() => keyboardCombinationSchema.parse({ keys: ['cmd', 'z'] })).not.toThrow();
      
      // Variações de nomes
      expect(() => keyboardCombinationSchema.parse({ keys: ['control', 'a'] })).not.toThrow();
      expect(() => keyboardCombinationSchema.parse({ keys: ['command', 'x'] })).not.toThrow();
      expect(() => keyboardCombinationSchema.parse({ keys: ['meta', 'v'] })).not.toThrow();
      expect(() => keyboardCombinationSchema.parse({ keys: ['win', 'y'] })).not.toThrow();
    });

    test('validates array constraints', () => {
      // Array vazio
      expect(() => keyboardCombinationSchema.parse({ keys: [] })).toThrow('requires at least one key');
      
      // Muitas teclas
      expect(() => keyboardCombinationSchema.parse({ keys: ['ctrl', 'alt', 'shift', 'cmd', 'a', 'b'] })).toThrow('maximum 5 keys');
    });

    test('rejects unsupported keys in combination', () => {
      expect(() => keyboardCombinationSchema.parse({ keys: ['ctrl', 'enter'] })).toThrow('Unsupported key in combination');
      expect(() => keyboardCombinationSchema.parse({ keys: ['invalid'] })).toThrow('Unsupported key in combination');
    });

    test('handles case insensitive keys', () => {
      // Maiúsculas devem funcionar
      expect(() => keyboardCombinationSchema.parse({ keys: ['CTRL', 'C'] })).not.toThrow();
      expect(() => keyboardCombinationSchema.parse({ keys: ['Alt', 'X'] })).not.toThrow();
    });
  });

  describe('Type exports', () => {
    test('types are correctly exported', () => {
      // Verificar que os tipos podem ser usados
      const typeRequest: KeyboardTypeRequest = {
        text: 'test',
        mode: 'instant',
        value: 100
      };
      
      const pressRequest: KeyboardPressKeyRequest = {
        key: 'enter'
      };
      
      const comboRequest: KeyboardCombinationRequest = {
        keys: ['ctrl', 'c']
      };
      
      expect(typeRequest).toBeDefined();
      expect(pressRequest).toBeDefined();
      expect(comboRequest).toBeDefined();
    });
  });
});