/**
 * Página principal de automação
 * Integra captura de tela e construtor de ações
 */
import React, { useState, useCallback, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Play, Save, FileEarmarkCode } from 'react-bootstrap-icons';
import { PrintScreenButton, ActionBuilder } from '../components';
import { AutomationAction } from '../types/automation-builder.types';
import { AutomationSaveLoad } from '../components/AutomationSaveLoad';
import FloatingPlayButton from '../components/FloatingPlayButton';
import { apiService } from '../services/apiService';

/**
 * Página de automação com captura de tela e builder de ações
 */
const AutomationPage: React.FC = () => {
  const [actions, setActions] = useState<AutomationAction[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [apiConnected, setApiConnected] = useState<boolean | null>(null);

  /**
   * Testa conexão com a API quando a página carrega
   */
  useEffect(() => {
    const testApiConnection = async () => {
      console.log('🔄 Testando conexão inicial com a API...'); // eslint-disable-line no-console
      try {
        const connected = await apiService.testConnection();
        setApiConnected(connected);
        if (connected) {
          console.log('✅ API conectada e pronta para uso'); // eslint-disable-line no-console
        } else {
          console.warn('⚠️ API não está respondendo'); // eslint-disable-line no-console
        }
      } catch (error) {
        console.error('❌ Erro ao testar conexão:', error); // eslint-disable-line no-console
        setApiConnected(false);
      }
    };

    testApiConnection();
  }, []);

  /**
   * Rastreia a posição do mouse via backend e atualiza o título
   */
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    // Função para buscar posição do mouse do backend
    const updateMousePosition = async () => {
      const position = await apiService.getMousePosition();
      if (position) {
        document.title = `X: ${position.x} | Y: ${position.y}`;
      }
    };
    
    // Atualiza a cada 500ms
    intervalId = setInterval(updateMousePosition, 500);
    
    // Faz a primeira atualização imediatamente
    updateMousePosition();
    
    return () => {
      clearInterval(intervalId);
      document.title = 'Automation';
    };
  }, []);

  /**
   * Callback quando as ações mudam
   */
  const handleActionsChange = useCallback((newActions: AutomationAction[]) => {
    setActions(newActions);
  }, []);

  /**
   * Executa a sequência de ações
   */
  const handleExecuteActions = async () => {
    if (actions.length === 0 || isExecuting) return;

    setIsExecuting(true);
    console.log('🎬 Iniciando execução de sequência...', { actionsCount: actions.length }); // eslint-disable-line no-console

    try {
      // Testa conexão com a API primeiro
      console.log('🔍 Testando conexão com a API...'); // eslint-disable-line no-console
      const isConnected = await apiService.testConnection();

      if (!isConnected) {
        throw new Error(
          'Não foi possível conectar com a API. Verifique se o servidor está rodando em http://localhost:3000',
        );
      }

      console.log('✅ Conexão estabelecida, executando ações...'); // eslint-disable-line no-console

      // Executa as ações via API
      const result = await apiService.executeActions(actions, {
        stopOnError: true,
        delayBetweenActions: 500,
      });

      console.log('📊 Resultado da execução:', result); // eslint-disable-line no-console

      if (result.success) {
        const successCount = result.results.filter((r) => r.success).length;
        const totalCount = result.results.length;

        console.log(
          `✅ Execução concluída: ${successCount}/${totalCount} ações executadas com sucesso`,
        ); // eslint-disable-line no-console
        alert(`Sequência executada com sucesso!\n${successCount}/${totalCount} ações concluídas.`);
      } else {
        const failedActions = result.results.filter((r) => !r.success);
        console.error('❌ Algumas ações falharam:', failedActions); // eslint-disable-line no-console

        const errorMessages = failedActions
          .map((f) => `• ${f.device} (${f.actionId}): ${f.error}`)
          .join('\n');
        alert(`Algumas ações falharam:\n${errorMessages}`);
      }
    } catch (error) {
      console.error('💥 Erro durante a execução:', error); // eslint-disable-line no-console

      if (error instanceof Error) {
        alert(`Erro na execução: ${error.message}`);
      } else {
        alert('Erro desconhecido durante a execução. Verifique o console para mais detalhes.');
      }
    } finally {
      setIsExecuting(false);
      console.log('🏁 Execução finalizada'); // eslint-disable-line no-console
    }
  };

  /**
   * Salva a sequência de ações (localStorage ou API)
   */
  const handleSaveActions = () => {
    if (actions.length === 0) return;

    try {
      // Salva no localStorage como exemplo
      localStorage.setItem('automationDraft', JSON.stringify(actions));
      alert('Sequência salva com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar:', error); // eslint-disable-line no-console
      alert('Erro ao salvar sequência');
    }
  };

  /**
   * Exporta ações como JSON
   */
  const handleExportActions = () => {
    if (actions.length === 0) return;

    const dataStr = JSON.stringify(actions, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `automation-${Date.now()}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <Container fluid className="py-4">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="mb-0">
              <i className="fas fa-robot me-2"></i>
              Automação de Interface
            </h1>
            <div className="d-flex align-items-center">
              {apiConnected === null && (
                <span className="badge bg-secondary">
                  <i className="fas fa-spinner fa-spin me-1"></i>
                  Testando API...
                </span>
              )}
              {apiConnected === true && (
                <span className="badge bg-success">
                  <i className="fas fa-check-circle me-1"></i>
                  API Conectada
                </span>
              )}
              {apiConnected === false && (
                <span className="badge bg-danger">
                  <i className="fas fa-exclamation-triangle me-1"></i>
                  API Desconectada
                </span>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        {/* Coluna da captura de tela */}
        <Col lg={4}>
          <Card className="h-100">
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-desktop me-2"></i>
                Captura / Seleção de Imagem
              </h5>
            </Card.Header>
            <Card.Body>
              <PrintScreenButton />
            </Card.Body>
          </Card>
        </Col>

        {/* Coluna do construtor de ações */}
        <Col lg={8}>
          {/* Componente de Save/Load */}
          <AutomationSaveLoad currentSteps={actions} onLoadSteps={setActions} />

          <div className="mt-3">
            <ActionBuilder
              onChange={handleActionsChange}
              initialActions={actions}
              maxActions={50}
            />
          </div>

          {/* Botões de ação */}
          {actions.length > 0 && (
            <Card className="mt-3">
              <Card.Body>
                <div className="d-flex gap-2 justify-content-end">
                  <Button variant="secondary" onClick={handleSaveActions} disabled={isExecuting}>
                    <Save className="me-2" />
                    Salvar Rascunho
                  </Button>

                  <Button variant="info" onClick={handleExportActions} disabled={isExecuting}>
                    <FileEarmarkCode className="me-2" />
                    Exportar JSON
                  </Button>

                  <Button
                    variant="primary"
                    onClick={handleExecuteActions}
                    disabled={isExecuting || apiConnected === false}
                    title={
                      apiConnected === false
                        ? 'API desconectada - verifique se o servidor está rodando'
                        : ''
                    }
                  >
                    {isExecuting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Executando...
                      </>
                    ) : (
                      <>
                        <Play className="me-2" />
                        {apiConnected === false ? 'API Desconectada' : 'Executar Sequência'}
                      </>
                    )}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      {/* Informações adicionais */}
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h6>Instruções de Uso:</h6>
              <ul className="mb-0">
                <li>
                  Use o botão <strong>Print Screen</strong> para capturar a tela atual
                </li>
                <li>
                  Adicione ações de <strong>Mouse</strong> ou <strong>Teclado</strong> usando o
                  formulário
                </li>
                <li>As ações serão executadas na ordem em que foram adicionadas</li>
                <li>Você pode salvar um rascunho ou exportar as ações como JSON</li>
                <li>
                  Clique em <strong>Executar Sequência</strong> para rodar todas as ações
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Botão flutuante de execução */}
      <FloatingPlayButton actions={actions} apiConnected={apiConnected} />
    </Container>
  );
};

export default AutomationPage;
