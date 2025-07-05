import { z } from 'zod';
import { outputFormatSchema } from './output-format.dto.js';

export const llmRequestSchema = z.object({
  prompt: z.string().min(1),
  model: z.enum(['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo', 'gpt-4o', 'gpt-4o-mini']),
  temperature: z.number().min(0).max(2).default(0.7),
  maxTokens: z.number().int().min(1).max(4096).default(1000),
  systemPrompt: z.string().optional(),
  outputFormat: outputFormatSchema.optional(),
});

export type LLMRequest = z.infer<typeof llmRequestSchema>;
