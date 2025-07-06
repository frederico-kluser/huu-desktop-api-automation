/**
 * Interface para resultado da verificação de status da API
 */
export interface StatusResult {
  ok: boolean;
  latency: number;
  message: string;
  checkedAt: string;
}
