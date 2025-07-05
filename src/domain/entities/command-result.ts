/**
 * Resultado padrão para execução de comandos
 * Utilizado por todos os serviços de automação
 */

export interface CommandResult {
  /**
   * Indica se a operação foi bem-sucedida
   */
  success: boolean;

  /**
   * Dados retornados pela operação (quando bem-sucedida)
   */
  data?: any;

  /**
   * Mensagem de erro (quando falha)
   */
  error?: string;
}
