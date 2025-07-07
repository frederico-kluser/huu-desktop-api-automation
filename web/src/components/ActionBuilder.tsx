/**
 * Componente para construção de sequências de automação
 * Permite adicionar ações de mouse e teclado de forma dinâmica
 */
import React, { useReducer, useCallback, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import ActionForm from './ActionForm';
import ActionTable from './ActionTable';
import {
  AutomationAction,
  ActionReducerAction,
  ActionBuilderProps,
} from '../types/automation-builder.types';

/**
 * Reducer para gerenciar estado das ações
 */
function actionsReducer(
  state: AutomationAction[],
  action: ActionReducerAction,
): AutomationAction[] {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];

    case 'REMOVE':
      return state.filter((item) => item.id !== action.id);

    case 'UPDATE':
      return state.map((item) => (item.id === action.id ? action.payload : item));

    case 'CLEAR':
      return [];

    case 'SET':
      return action.payload;

    default:
      return state;
  }
}

/**
 * Componente principal para construção de ações de automação
 */
const ActionBuilder: React.FC<ActionBuilderProps> = ({
  onChange,
  initialActions = [],
  maxActions = 100,
  className = '',
}) => {
  const [actions, dispatch] = useReducer(actionsReducer, initialActions);

  // Notifica mudanças para o componente pai
  useEffect(() => {
    onChange?.(actions);
  }, [actions, onChange]);

  /**
   * Adiciona nova ação à lista
   */
  const handleAddAction = useCallback((actionData: Omit<AutomationAction, 'id' | 'timestamp'>) => {
    const newAction: AutomationAction = {
      ...actionData,
      id: nanoid(),
      timestamp: Date.now(),
    } as AutomationAction;

    dispatch({ type: 'ADD', payload: newAction });
  }, []);

  /**
   * Remove ação da lista
   */
  const handleRemoveAction = useCallback((id: string) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  /**
   * Limpa todas as ações
   */
  const handleClearAll = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const isMaxActionsReached = actions.length >= maxActions;

  return (
    <Container className={className} fluid>
      <Card>
        <Card.Header>
          <h5 className="mb-0">Construtor de Ações de Automação</h5>
        </Card.Header>
        <Card.Body>
          {/* Tabela de ações */}
          {actions.length > 0 && (
            <ActionTable
              actions={actions}
              onRemove={handleRemoveAction}
              onClear={handleClearAll}
              className="mb-4"
            />
          )}

          {/* Formulário para adicionar nova ação */}
          {!isMaxActionsReached ? (
            <ActionForm onAdd={handleAddAction} disabled={isMaxActionsReached} />
          ) : (
            <div className="alert alert-warning mb-0">
              Limite máximo de {maxActions} ações atingido.
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ActionBuilder;
