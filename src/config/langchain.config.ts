export const LangChainConfig = {
  defaultTemperature: 0.7,
  defaultMaxTokens: 1000,
  timeout: 30000, // 30 seconds
  retries: 3,
  models: {
    'gpt-3.5-turbo': {
      maxTokens: 4096,
      costPerToken: 0.002,
    },
    'gpt-4': {
      maxTokens: 8192,
      costPerToken: 0.03,
    },
    'gpt-4-turbo': {
      maxTokens: 128000,
      costPerToken: 0.01,
    },
  },
} as const;

export type SupportedModel = keyof typeof LangChainConfig.models;
