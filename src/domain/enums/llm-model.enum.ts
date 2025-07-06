/**
 * Enum contendo os modelos de LLM suportados pela aplicação.
 * Inclui modelos OpenAI e DeepSeek.
 *
 * Para DeepSeek:
 * - 'deepseek-chat' = DeepSeek V3 (mais rápido, suporta tool calling)
 * - 'deepseek-reasoner' = DeepSeek R1 (reasoning, não suporta tool calling)
 * - 'deepseek-coder' = Alias para DeepSeek V3 (merged com deepseek-chat)
 */
export enum LlmModel {
  O3 = 'o3',
  GPT_4_1 = 'gpt-4.1',
  GPT_4_1_MINI = 'gpt-4.1-mini',
  DEEPSEEK_CHAT = 'deepseek-chat',
  DEEPSEEK_REASONER = 'deepseek-reasoner',
  DEEPSEEK_CODER = 'deepseek-coder',
}

/**
 * Mapeamento de modelos para seus provedores
 */
export const LLM_PROVIDER_MAP: Record<LlmModel, 'openai' | 'deepseek'> = {
  [LlmModel.O3]: 'openai',
  [LlmModel.GPT_4_1]: 'openai',
  [LlmModel.GPT_4_1_MINI]: 'openai',
  [LlmModel.DEEPSEEK_CHAT]: 'deepseek',
  [LlmModel.DEEPSEEK_REASONER]: 'deepseek',
  [LlmModel.DEEPSEEK_CODER]: 'deepseek',
};

/**
 * Determina o provedor baseado no modelo
 * @param model - Modelo LLM
 * @returns Provedor do modelo
 */
export function getProviderForModel(model: LlmModel): 'openai' | 'deepseek' {
  return LLM_PROVIDER_MAP[model];
}
