/**
 * DTOs para requisições relacionadas a operações de clipboard
 * Define schemas de validação usando Zod para garantir integridade dos dados
 */

import { z } from 'zod';

/**
 * Schema para copiar conteúdo para clipboard
 */
export const clipboardCopySchema = z.object({
  content: z
    .string()
    .min(1, 'Content cannot be empty')
    .refine((content) => {
      const sizeBytes = Buffer.byteLength(content, 'utf8');
      return sizeBytes <= 1048576; // 1 MB
    }, 'Content size exceeds maximum of 1 MB'),
});

/**
 * Schema vazio para operação de paste (GET request)
 */
export const clipboardPasteSchema = z.object({});

/**
 * Schema vazio para operação de clear
 */
export const clipboardClearSchema = z.object({});

/**
 * Tipos inferidos dos schemas
 */
export type ClipboardCopyRequest = z.infer<typeof clipboardCopySchema>;
export type ClipboardPasteRequest = z.infer<typeof clipboardPasteSchema>;
export type ClipboardClearRequest = z.infer<typeof clipboardClearSchema>;
