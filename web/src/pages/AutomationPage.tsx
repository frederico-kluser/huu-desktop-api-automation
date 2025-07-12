/**
 * Página principal de automação
 * Integra captura de tela e construtor de ações
 */
import React, { useState, useCallback } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Play, Save, FileEarmarkCode } from 'react-bootstrap-icons';
import { PrintScreenButton, ActionBuilder } from '../components';
import { AutomationAction } from '../types/automation-builder.types';
import { AutomationSaveLoad } from '../components/AutomationSaveLoad';

/**
 * Página de automação com captura de tela e builder de ações
 */
const AutomationPage: React.FC = () => {
  const [actions, setActions] = useState<AutomationAction[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

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

    try {
      // TODO: Implementar execução das ações via API
      console.log('Executando ações:', actions); // eslint-disable-line no-console

      // Simulação temporária
      for (const action of actions) {
        console.log(`Executando ação ${action.id}:`, action); // eslint-disable-line no-console
        // Aqui você faria as chamadas para a API correspondente
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      alert('Ações executadas com sucesso!');
    } catch (error) {
      console.error('Erro ao executar ações:', error); // eslint-disable-line no-console
      alert('Erro ao executar ações. Verifique o console.');
    } finally {
      setIsExecuting(false);
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
          <h1 className="mb-4">
            <i className="fas fa-robot me-2"></i>
            Automação de Interface
          </h1>
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
            <ActionBuilder onChange={handleActionsChange} maxActions={50} />
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

                  <Button variant="primary" onClick={handleExecuteActions} disabled={isExecuting}>
                    {isExecuting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Executando...
                      </>
                    ) : (
                      <>
                        <Play className="me-2" />
                        Executar Sequência
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
    </Container>
  );
};

export default AutomationPage;
