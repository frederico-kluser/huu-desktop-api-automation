/**
 * Componente para executar sequências de ações de automação
 * Integra com o backend para executar as ações configuradas
 */
import React, { useState, useCallback } from 'react';
import { Button, Card, ProgressBar, Alert, Form } from 'react-bootstrap';
import { PlayFill, StopFill, ArrowRepeat } from 'react-bootstrap-icons';
import { AutomationAction } from '../types/automation-builder.types';
import axios from 'axios';

interface ActionExecutorProps {
  actions: AutomationAction[];
  apiKey?: string;
  className?: string;
}

interface ExecutionResult {
  success: boolean;
  actionId: string;
  device: string;
  error?: string;
  data?: any;
}

interface ExecutionState {
  isExecuting: boolean;
  progress: number;
  currentActionIndex: number;
  results: ExecutionResult[];
  error: string | null;
}

/**
 * Componente para executar ações de automação
 */
const ActionExecutor: React.FC<ActionExecutorProps> = ({ actions, apiKey, className = '' }) => {
  const [state, setState] = useState<ExecutionState>({
    isExecuting: false,
    progress: 0,
    currentActionIndex: -1,
    results: [],
    error: null,
  });

  const [options, setOptions] = useState({
    stopOnError: true,
    delayBetweenActions: 100,
  });

  /**
   * Executa as ações configuradas
   */
  const executeActions = useCallback(async () => {
    if (actions.length === 0) {
      setState((prev) => ({ ...prev, error: 'Nenhuma ação configurada' }));
      return;
    }

    setState({
      isExecuting: true,
      progress: 0,
      currentActionIndex: 0,
      results: [],
      error: null,
    });

    try {
      const response = await axios.post(
        '/api/automation/execute',
        {
          actions,
          options,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            ...(apiKey && { 'x-api-key': apiKey }),
          },
        },
      );

      const { results } = response.data;

      // Atualizar progresso baseado nos resultados
      const successCount = results.filter((r: ExecutionResult) => r.success).length;
      const progress = (successCount / actions.length) * 100;

      setState({
        isExecuting: false,
        progress,
        currentActionIndex: -1,
        results,
        error: null,
      });
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? (error.response?.data as any)?.error || error.message
        : 'Erro desconhecido';

      setState((prev) => ({
        ...prev,
        isExecuting: false,
        error: errorMessage,
      }));
    }
  }, [actions, options, apiKey]);

  /**
   * Para a execução (futuro - precisa de implementação no backend)
   */
  const stopExecution = useCallback(() => {
    // TODO: Implementar cancelamento no backend
    setState((prev) => ({
      ...prev,
      isExecuting: false,
      error: 'Execução interrompida pelo usuário',
    }));
  }, []);

  /**
   * Reseta o estado de execução
   */
  const resetExecution = useCallback(() => {
    setState({
      isExecuting: false,
      progress: 0,
      currentActionIndex: -1,
      results: [],
      error: null,
    });
  }, []);

  const hasResults = state.results.length > 0;
  const hasErrors = state.results.some((r) => !r.success);
  const isComplete = hasResults && !state.isExecuting;

  return (
    <Card className={className}>
      <Card.Header>
        <h6 className="mb-0">Execução de Ações</h6>
      </Card.Header>
      <Card.Body>
        {/* Opções de execução */}
        <Form className="mb-3">
          <Form.Group className="mb-2">
            <Form.Check
              type="checkbox"
              id="stopOnError"
              label="Parar ao encontrar erro"
              checked={options.stopOnError}
              onChange={(e) => setOptions({ ...options, stopOnError: e.target.checked })}
              disabled={state.isExecuting}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Delay entre ações (ms)</Form.Label>
            <Form.Control
              type="number"
              min="0"
              max="5000"
              step="100"
              value={options.delayBetweenActions}
              onChange={(e) =>
                setOptions({ ...options, delayBetweenActions: parseInt(e.target.value) || 0 })
              }
              disabled={state.isExecuting}
            />
          </Form.Group>
        </Form>

        {/* Barra de progresso */}
        {(state.isExecuting || hasResults) && (
          <ProgressBar
            now={state.progress}
            label={`${Math.round(state.progress)}%`}
            variant={hasErrors ? 'warning' : 'success'}
            animated={state.isExecuting}
            className="mb-3"
          />
        )}

        {/* Mensagens de erro */}
        {state.error && (
          <Alert variant="danger" dismissible onClose={() => setState({ ...state, error: null })}>
            {state.error}
          </Alert>
        )}

        {/* Resultados da execução */}
        {isComplete && (
          <Alert variant={hasErrors ? 'warning' : 'success'}>
            <strong>Execução concluída!</strong>
            <br />
            {state.results.filter((r) => r.success).length} de {state.results.length} ações
            executadas com sucesso.
            {hasErrors && (
              <>
                <br />
                <small className="text-muted">
                  Erros:{' '}
                  {state.results
                    .filter((r) => !r.success)
                    .map((r) => `${r.device} (${r.error})`)
                    .join(', ')}
                </small>
              </>
            )}
          </Alert>
        )}

        {/* Botões de controle */}
        <div className="d-flex gap-2">
          {!state.isExecuting ? (
            <>
              <Button
                variant="primary"
                onClick={executeActions}
                disabled={actions.length === 0}
                className="d-flex align-items-center"
              >
                <PlayFill size={18} className="me-1" />
                Executar Ações
              </Button>
              {hasResults && (
                <Button
                  variant="outline-secondary"
                  onClick={resetExecution}
                  className="d-flex align-items-center"
                >
                  <ArrowRepeat size={18} className="me-1" />
                  Resetar
                </Button>
              )}
            </>
          ) : (
            <Button variant="danger" onClick={stopExecution} className="d-flex align-items-center">
              <StopFill size={18} className="me-1" />
              Parar Execução
            </Button>
          )}
        </div>

        {/* Status da ação atual */}
        {state.isExecuting && state.currentActionIndex >= 0 && (
          <div className="mt-2 text-muted small">
            Executando ação {state.currentActionIndex + 1} de {actions.length}...
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ActionExecutor;
