/**
 * Tipo para representar formas de saída dinâmicas
 * Permite que o campo data seja configurável através de outputFormat
 */
export type OutputShape<T = string> = {
  data: T;
};

/**
 * Tipo para resposta LLM com formato flexível
 * Suporta tanto string simples quanto objetos estruturados
 */
export interface DynamicLLMResponse<T = string> {
  success: boolean;
  data: T;
  metadata?: {
    model: string;
    finishReason?: string;
    tokensUsed?: number;
    processingTime?: number;
  };
}

/**
 * Tipo para resposta LLM tradicional (retrocompatibilidade)
 * Mantém estrutura original quando outputFormat não é especificado
 */
export interface LegacyLLMResponse {
  success: boolean;
  data: {
    content: string;
    model: string;
    finishReason?: string;
    tokensUsed?: number;
  };
}

/**
 * União de tipos para resposta LLM
 * Permite tanto o formato novo quanto o legado
 */
export type LLMResponse<T = string> = T extends string
  ? DynamicLLMResponse<string> | LegacyLLMResponse
  : DynamicLLMResponse<T>;

/**
 * Função utilitária para criar resposta de sucesso
 * Facilita a construção de respostas formatadas
 */
export function createSuccessResponse<T>(
  data: T,
  metadata?: DynamicLLMResponse<T>['metadata'],
): DynamicLLMResponse<T> {
  return {
    success: true,
    data,
    metadata,
  };
}

/**
 * Função utilitária para criar resposta de erro
 * Padroniza respostas de erro na API
 */
export function createErrorResponse(
  message: string,
  code?: string,
): { success: false; error: string; code?: string } {
  return {
    success: false,
    error: message,
    ...(code && { code }),
  };
}

/**
 * Type guard para verificar se resposta é do formato legado
 * Útil para manter retrocompatibilidade
 */
export function isLegacyResponse(response: unknown): response is LegacyLLMResponse {
  if (typeof response !== 'object' || response === null) {
    return false;
  }

  const resp = response as Record<string, unknown>;

  return (
    'success' in resp &&
    'data' in resp &&
    typeof resp.data === 'object' &&
    resp.data !== null &&
    'content' in resp.data &&
    'model' in resp.data
  );
}

/**
 * Type guard para verificar se resposta é do formato dinâmico
 * Útil para type narrowing em processamento
 */
export function isDynamicResponse<T>(response: unknown): response is DynamicLLMResponse<T> {
  return (
    typeof response === 'object' &&
    response !== null &&
    'success' in response &&
    'data' in response &&
    !isLegacyResponse(response)
  );
}
