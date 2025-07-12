/**
 * Painel compacto que integra PrintScreenButton com ActionBuilder
 * Pode ser usado como drop-in replacement do PrintScreenButton
 */
import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import PrintScreenButton from './PrintScreenButton';
import ActionBuilder from './ActionBuilder';
import ActionExecutor from './ActionExecutor';
import { AutomationAction } from '../types/automation-builder.types';

interface AutomationPanelProps {
  className?: string;
  onActionsChange?: (_actions: AutomationAction[]) => void;
}

/**
 * Painel que combina captura de tela e construtor de ações
 */
const AutomationPanel: React.FC<AutomationPanelProps> = ({ className = '', onActionsChange }) => {
  const [showActionBuilder, setShowActionBuilder] = useState(false);
  const [actions, setActions] = useState<AutomationAction[]>([]);

  const handleActionsChange = (newActions: AutomationAction[]) => {
    setActions(newActions);
    onActionsChange?.(newActions);
  };

  return (
    <div className={className}>
      <Row>
        {/* Captura de tela */}
        <Col md={showActionBuilder ? 3 : 12}>
          <PrintScreenButton />

          {/* Botão para mostrar/ocultar o construtor de ações */}
          <button
            className="btn btn-outline-primary mt-3"
            onClick={() => setShowActionBuilder(!showActionBuilder)}
          >
            <i className={`fas fa-${showActionBuilder ? 'minus' : 'plus'}-circle me-2`}></i>
            {showActionBuilder ? 'Ocultar' : 'Adicionar'} Ações
          </button>
        </Col>

        {/* Construtor de ações */}
        {showActionBuilder && (
          <>
            <Col md={6}>
              <ActionBuilder onChange={handleActionsChange} maxActions={20} />
            </Col>

            {/* Executor de ações */}
            <Col md={3}>
              <ActionExecutor actions={actions} />
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default AutomationPanel;
