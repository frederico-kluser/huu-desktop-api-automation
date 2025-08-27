/**
 * Botão flutuante para executar sequências de automação
 * Fica fixo na tela para acesso rápido durante a construção
 */
import React, { useState, useEffect } from 'react';
import { Button, Badge, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import {
  PlayFill,
  StopFill,
  CheckCircleFill,
  XCircleFill,
  ExclamationTriangleFill,
} from 'react-bootstrap-icons';
import { AutomationAction } from '../types/automation-builder.types';
import { apiService } from '../services/apiService';

interface FloatingPlayButtonProps {
  actions: AutomationAction[];
  apiConnected: boolean | null;
  className?: string;
}

type ExecutionState = 'idle' | 'running' | 'success' | 'error' | 'warning';

const FloatingPlayButton: React.FC<FloatingPlayButtonProps> = ({
  actions,
  apiConnected,
  className = '',
}) => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionState, setExecutionState] = useState<ExecutionState>('idle');
  const [executionMessage, setExecutionMessage] = useState<string>('');
  const [currentActionIndex, setCurrentActionIndex] = useState<number>(-1);

  // Reset state quando as ações mudam
  useEffect(() => {
    if (executionState !== 'idle' && executionState !== 'running') {
      const timer = setTimeout(() => {
        setExecutionState('idle');
        setExecutionMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [executionState]);

  /**
   * Executa a sequência de ações
   */
  const handleExecute = async () => {
    if (actions.length === 0 || isExecuting || apiConnected === false) return;

    setIsExecuting(true);
    setExecutionState('running');
    setExecutionMessage('Executando sequência...');
    setCurrentActionIndex(0);

    console.log('🎮 Iniciando execução rápida...', { actionsCount: actions.length });

    try {
      // Simula progresso visual das ações
      const progressInterval = setInterval(() => {
        setCurrentActionIndex((prev) => {
          if (prev < actions.length - 1) return prev + 1;
          return prev;
        });
      }, 500);

      // Executa as ações via API
      const result = await apiService.executeActions(actions, {
        stopOnError: false, // Continua mesmo com erros para teste
        delayBetweenActions: 300, // Delay menor para testes rápidos
      });

      clearInterval(progressInterval);
      setCurrentActionIndex(-1);

      if (result.success) {
        const successCount = result.results.filter((r) => r.success).length;
        setExecutionState('success');
        setExecutionMessage(`✅ ${successCount}/${actions.length} ações executadas`);
        console.log('✅ Execução concluída com sucesso');
      } else {
        const failedCount = result.results.filter((r) => !r.success).length;
        if (failedCount === actions.length) {
          setExecutionState('error');
          setExecutionMessage(`❌ Todas as ações falharam`);
        } else {
          setExecutionState('warning');
          setExecutionMessage(`⚠️ ${failedCount} ações falharam`);
        }
        console.warn('⚠️ Algumas ações falharam:', result.results);
      }
    } catch (error) {
      setCurrentActionIndex(-1);
      setExecutionState('error');

      if (error instanceof Error) {
        setExecutionMessage(`Erro: ${error.message}`);
        console.error('❌ Erro na execução:', error);
      } else {
        setExecutionMessage('Erro desconhecido');
        console.error('❌ Erro desconhecido:', error);
      }
    } finally {
      setIsExecuting(false);
      setCurrentActionIndex(-1);
    }
  };

  /**
   * Para a execução (futuro: implementar cancelamento real)
   */
  const handleStop = () => {
    console.log('⏹️ Parando execução...');
    setIsExecuting(false);
    setExecutionState('idle');
    setExecutionMessage('Execução interrompida');
    setCurrentActionIndex(-1);
  };

  // Determina a cor do botão baseado no estado
  const getButtonVariant = (): string => {
    switch (executionState) {
      case 'success':
        return 'success';
      case 'error':
        return 'danger';
      case 'warning':
        return 'warning';
      case 'running':
        return 'primary';
      default:
        return apiConnected === false ? 'secondary' : 'primary';
    }
  };

  // Determina o ícone baseado no estado
  const getIcon = () => {
    if (isExecuting) {
      return (
        <>
          <Spinner animation="border" size="sm" className="me-2" />
          <StopFill size={20} />
        </>
      );
    }

    switch (executionState) {
      case 'success':
        return <CheckCircleFill size={24} />;
      case 'error':
        return <XCircleFill size={24} />;
      case 'warning':
        return <ExclamationTriangleFill size={24} />;
      default:
        return <PlayFill size={24} />;
    }
  };

  // Tooltip com informações
  const getTooltipContent = () => {
    if (apiConnected === false) {
      return 'API desconectada';
    }
    if (actions.length === 0) {
      return 'Adicione ações para executar';
    }
    if (isExecuting) {
      return `Executando ação ${currentActionIndex + 1} de ${actions.length}`;
    }
    if (executionMessage) {
      return executionMessage;
    }
    return `Executar ${actions.length} ações`;
  };

  const isDisabled = apiConnected === false || actions.length === 0;

  return (
    <div
      className={`position-fixed ${className}`}
      style={{
        bottom: '30px',
        right: '30px',
        zIndex: 1050,
      }}
    >
      <div className="d-flex flex-column align-items-end gap-2">
        {/* Contador de ações */}
        {actions.length > 0 && !isExecuting && (
          <Badge bg="dark" className="px-3 py-2" style={{ fontSize: '0.9rem' }}>
            {actions.length} {actions.length === 1 ? 'ação' : 'ações'}
          </Badge>
        )}

        {/* Progresso de execução */}
        {isExecuting && currentActionIndex >= 0 && (
          <Badge bg="info" className="px-3 py-2 animate-pulse" style={{ fontSize: '0.9rem' }}>
            {currentActionIndex + 1} / {actions.length}
          </Badge>
        )}

        {/* Botão principal */}
        <OverlayTrigger placement="left" overlay={<Tooltip>{getTooltipContent()}</Tooltip>}>
          <Button
            variant={getButtonVariant()}
            size="lg"
            onClick={isExecuting ? handleStop : handleExecute}
            disabled={isDisabled && !isExecuting}
            className="rounded-circle shadow-lg d-flex align-items-center justify-content-center"
            style={{
              width: '60px',
              height: '60px',
              transition: 'all 0.3s ease',
              transform: isExecuting ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            {getIcon()}
          </Button>
        </OverlayTrigger>

        {/* Mensagem de feedback */}
        {executionMessage && !isExecuting && (
          <div
            className="bg-white text-dark border rounded shadow-sm px-3 py-2 animate-slide-left"
            style={{
              maxWidth: '250px',
              fontSize: '0.875rem',
              color: '#212529',
            }}
          >
            {executionMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingPlayButton;
