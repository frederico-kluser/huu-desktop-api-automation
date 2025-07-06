import { z } from 'zod';
import { outputFormatSchema } from './output-format.dto.js';
import { LlmModel } from '../../domain/enums/llm-model.enum.js';

export const llmRequestSchema = z.object({
  prompt: z.string().min(1),
  model: z.nativeEnum(LlmModel),
  temperature: z.number().min(0).max(2).default(0.7),
  maxTokens: z.number().int().min(1).max(4096).default(1000),
  systemPrompt: z.string().optional(),
  outputFormat: outputFormatSchema.optional(),
});

export type LLMRequest = z.infer<typeof llmRequestSchema>;
