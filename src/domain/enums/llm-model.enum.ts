/**
 * Enum contendo os modelos de LLM suportados pela aplicação.
 * Inclui modelos OpenAI e DeepSeek.
 */
export enum LlmModel {
  O3 = 'o3',
  GPT_4_1 = 'gpt-4.1',
  GPT_4_1_MINI = 'gpt-4.1-mini',
  DEEPSEEK_V3_0324 = 'DeepSeek-V3-0324',
}

/**
 * Mapeamento de modelos para seus provedores
 */
export const LLM_PROVIDER_MAP: Record<LlmModel, 'openai' | 'deepseek'> = {
  [LlmModel.O3]: 'openai',
  [LlmModel.GPT_4_1]: 'openai',
  [LlmModel.GPT_4_1_MINI]: 'openai',
  [LlmModel.DEEPSEEK_V3_0324]: 'deepseek',
};

/**
 * Determina o provedor baseado no modelo
 * @param model - Modelo LLM
 * @returns Provedor do modelo
 */
export function getProviderForModel(model: LlmModel): 'openai' | 'deepseek' {
  return LLM_PROVIDER_MAP[model];
}
