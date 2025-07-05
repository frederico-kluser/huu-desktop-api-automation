import { z } from 'zod';

export const llmRequestSchema = z.object({
  prompt: z.string().min(1),
  model: z.enum(['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo']),
  temperature: z.number().min(0).max(2).default(0.7),
  maxTokens: z.number().int().min(1).max(4096).default(1000),
  systemPrompt: z.string().optional(),
});

export type LLMRequest = z.infer<typeof llmRequestSchema>;
