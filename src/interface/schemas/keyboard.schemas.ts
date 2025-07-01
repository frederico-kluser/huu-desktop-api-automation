/**
 * JSON Schemas para validação de requisições de teclado no Fastify
 * Compatível com JSON Schema Draft 7
 */

import type { JSONSchema7 } from 'json-schema';

/**
 * Schema para endpoint de digitação de texto
 */
export const keyboardTypeJsonSchema: JSONSchema7 = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    text: {
      type: 'string',
      minLength: 1,
      maxLength: 10000,
      description: 'Text to be typed'
    },
    mode: {
      type: 'string',
      enum: ['instant', 'perChar', 'total'],
      default: 'instant',
      description: 'Typing mode: instant (immediate), perChar (delay per character), total (total duration)'
    },
    value: {
      type: 'integer',
      minimum: 0,
      maximum: 300000,
      description: 'Time value in milliseconds. For perChar mode: delay between each character. For total mode: total duration for typing'
    }
  },
  required: ['text'],
  additionalProperties: false
};

/**
 * Schema para endpoint de pressionar tecla
 */
export const keyboardPressKeyJsonSchema: JSONSchema7 = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    key: {
      type: 'string',
      minLength: 1,
      description: 'Key to press (e.g., enter, tab, escape, f1-f12)'
    }
  },
  required: ['key'],
  additionalProperties: false
};

/**
 * Schema para endpoint de combinação de teclas
 */
export const keyboardCombinationJsonSchema: JSONSchema7 = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    keys: {
      type: 'array',
      items: {
        type: 'string',
        minLength: 1
      },
      minItems: 1,
      maxItems: 5,
      description: 'Array of keys for combination (e.g., ["ctrl", "c"] for Ctrl+C)'
    }
  },
  required: ['keys'],
  additionalProperties: false
};