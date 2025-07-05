import { z } from 'zod';

/**
 * Schema para validação de estrutura de saída personalizada
 * Permite definir formato JSON dinâmico usando JSON Schema
 */
export const outputFormatSchema = z
  .object({
    type: z.enum(['object', 'array', 'string', 'number', 'boolean']),
    properties: z.record(z.any()).optional(),
    items: z.any().optional(),
    required: z.array(z.string()).optional(),
    additionalProperties: z.boolean().optional(),
    description: z.string().optional(),
  })
  .strict();

/**
 * Schema para requisição com formato de saída personalizado
 * Integra com LLM request para controle de estrutura de resposta
 */
export const llmRequestWithOutputSchema = z.object({
  prompt: z.string().min(1, 'Prompt é obrigatório'),
  model: z.enum(['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo', 'gpt-4o', 'gpt-4o-mini']),
  temperature: z.number().min(0).max(2).default(0.7),
  maxTokens: z.number().min(1).max(4096).default(1000),
  systemPrompt: z.string().optional(),
  outputFormat: outputFormatSchema.optional(),
});

/**
 * Tipo inferido para estrutura de saída personalizada
 */
export type OutputFormat = z.infer<typeof outputFormatSchema>;

/**
 * Tipo inferido para requisição LLM com formato de saída
 */
export type LLMRequestWithOutput = z.infer<typeof llmRequestWithOutputSchema>;

/**
 * Função utilitária para validar profundidade de esquema
 * Previne recursão infinita em esquemas complexos
 */
export function validateSchemaDepth(schema: unknown, maxDepth: number, currentDepth = 0): boolean {
  if (currentDepth >= maxDepth) {
    return false;
  }

  if (typeof schema === 'object' && schema !== null) {
    const obj = schema as Record<string, unknown>;

    // Verifica propriedades aninhadas
    if (obj.properties && typeof obj.properties === 'object') {
      for (const prop of Object.values(obj.properties)) {
        if (!validateSchemaDepth(prop, maxDepth, currentDepth + 1)) {
          return false;
        }
      }
    }

    // Verifica items para arrays
    if (obj.items) {
      if (!validateSchemaDepth(obj.items, maxDepth, currentDepth + 1)) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Função utilitária para sanitizar esquema JSON
 * Remove propriedades perigosas que podem causar prototype pollution
 */
export function sanitizeSchema(schema: unknown): unknown {
  if (typeof schema !== 'object' || schema === null) {
    return schema;
  }

  const sanitized: Record<string, unknown> = {};
  const obj = schema as Record<string, unknown>;

  for (const [key, value] of Object.entries(obj)) {
    // Bloqueia propriedades perigosas
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue;
    }

    // Recursivamente sanitiza valores aninhados
    if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeSchema(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Função utilitária para mascarar esquemas em logs
 * Evita vazamento de informações sensíveis
 */
export function maskSchemaForLogs(schema: unknown): unknown {
  if (typeof schema !== 'object' || schema === null) {
    return schema;
  }

  const masked = { ...(schema as Record<string, unknown>) };

  // Mascarar campos que podem conter informações sensíveis
  if (masked.description && typeof masked.description === 'string') {
    masked.description =
      masked.description.length > 50
        ? `${masked.description.substring(0, 50)}...`
        : masked.description;
  }

  return masked;
}
