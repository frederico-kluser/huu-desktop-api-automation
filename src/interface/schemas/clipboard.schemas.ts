/**
 * JSON Schemas para validação de requisições de clipboard no Fastify
 * Compatível com JSON Schema Draft 7
 */

import type { JSONSchema7 } from 'json-schema';

/**
 * Schema para endpoint de copiar para clipboard
 */
export const clipboardCopyJsonSchema: JSONSchema7 = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    content: {
      type: 'string',
      minLength: 1,
      description: 'Content to copy to clipboard (max 1 MB)',
    },
  },
  required: ['content'],
  additionalProperties: false,
};

/**
 * Schema vazio para endpoint de colar (GET request)
 */
export const clipboardPasteJsonSchema: JSONSchema7 = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {},
  additionalProperties: false,
};

/**
 * Schema vazio para endpoint de limpar clipboard
 */
export const clipboardClearJsonSchema: JSONSchema7 = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {},
  additionalProperties: false,
};
