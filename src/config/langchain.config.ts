import { LlmModel } from '../domain/enums/llm-model.enum.js';

export const LangChainConfig = {
  defaultTemperature: 0.7,
  defaultMaxTokens: 1000,
  timeout: 30000, // 30 seconds
  retries: 3,
  models: {
    [LlmModel.O3]: {
      maxTokens: 8192,
      costPerToken: 0.05,
    },
    [LlmModel.GPT_4_1]: {
      maxTokens: 128000,
      costPerToken: 0.03,
    },
    [LlmModel.GPT_4_1_MINI]: {
      maxTokens: 8192,
      costPerToken: 0.01,
    },
    [LlmModel.DEEPSEEK_CHAT]: {
      maxTokens: 32768,
      costPerToken: 0.00014,
    },
    [LlmModel.DEEPSEEK_REASONER]: {
      maxTokens: 32768,
      costPerToken: 0.00055,
    },
  },
} as const;

export type SupportedModel = keyof typeof LangChainConfig.models;
