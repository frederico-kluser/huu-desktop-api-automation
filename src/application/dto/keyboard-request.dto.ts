/**
 * DTOs para requisições relacionadas a operações de teclado
 * Define schemas de validação usando Zod para garantir integridade dos dados
 */

import { z } from 'zod';

/**
 * Schema para digitação de texto com opções de timing
 */
export const keyboardTypeSchema = z.object({
  text: z
    .string()
    .min(1, 'Text cannot be empty')
    .max(10000, 'Text exceeds maximum length of 10000 characters')
    .refine((text) => {
      // Remove caracteres de controle perigosos para validação
      const sanitized = text.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F]/g, '');
      return sanitized.length > 0;
    }, 'Text cannot contain only control characters'),
  mode: z.enum(['instant', 'perChar', 'total']).optional().default('instant'),
  value: z
    .number()
    .int('Value must be an integer')
    .nonnegative('Value must be non-negative')
    .max(300000, 'Value exceeds maximum of 300000ms (5 minutes)')
    .optional(),
});

/**
 * Schema para pressionar uma tecla específica
 */
export const keyboardPressKeySchema = z.object({
  key: z
    .string()
    .min(1, 'Key cannot be empty')
    .transform((val) => val.toLowerCase())
    .refine((key) => {
      const supportedKeys = [
        'enter',
        'tab',
        'escape',
        'space',
        'backspace',
        'delete',
        'up',
        'down',
        'left',
        'right',
        'home',
        'end',
        'pageup',
        'pagedown',
        'f1',
        'f2',
        'f3',
        'f4',
        'f5',
        'f6',
        'f7',
        'f8',
        'f9',
        'f10',
        'f11',
        'f12',
      ];
      return supportedKeys.includes(key);
    }, 'Unsupported key. Valid keys: enter, tab, escape, space, backspace, delete, arrow keys, home, end, pageup, pagedown, f1-f12'),
});

/**
 * Schema para combinação de teclas
 */
export const keyboardCombinationSchema = z.object({
  keys: z
    .array(z.string())
    .min(1, 'Key combination requires at least one key')
    .max(5, 'Key combination supports maximum 5 keys')
    .refine((keys) => {
      const supportedKeys = [
        'ctrl',
        'control',
        'alt',
        'shift',
        'cmd',
        'command',
        'meta',
        'win',
        'a',
        'c',
        'v',
        'x',
        'z',
        'y',
      ];
      return keys.every((key) => supportedKeys.includes(key.toLowerCase()));
    }, 'Unsupported key in combination. Valid modifier keys: ctrl, alt, shift, cmd/win. Valid letter keys: a, c, v, x, z, y'),
});

/**
 * Tipos inferidos dos schemas
 */
export type KeyboardTypeRequest = z.infer<typeof keyboardTypeSchema>;
export type KeyboardPressKeyRequest = z.infer<typeof keyboardPressKeySchema>;
export type KeyboardCombinationRequest = z.infer<typeof keyboardCombinationSchema>;
