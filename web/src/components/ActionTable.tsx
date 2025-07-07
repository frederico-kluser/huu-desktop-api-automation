/**
 * Tabela para exibir e gerenciar ações de automação
 * Renderiza lista de ações com opções para remover
 */
import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import {
  AutomationAction,
  MouseActionType,
  KeyboardActionType,
  MouseButton,
  ScrollDirection,
  TypingMode,
} from '../types/automation-builder.types';

interface ActionTableProps {
  actions: AutomationAction[];
  onRemove: (_id: string) => void;
  onClear: () => void;
  className?: string;
}

/**
 * Formata descrição legível da ação do mouse
 */
const formatMouseAction = (action: AutomationAction): string => {
  if (action.device !== 'mouse') return '';

  const { payload } = action;
  const { type, data } = payload;

  switch (type) {
    case MouseActionType.MOVE:
      return `Mover para (${data.x}, ${data.y})${data.smooth ? ' suavemente' : ''}`;

    case MouseActionType.CLICK: {
      const coords =
        data.x !== undefined && data.y !== undefined ? ` em (${data.x}, ${data.y})` : '';
      const button =
        data.button !== MouseButton.LEFT ? ` com botão ${formatButton(data.button!)}` : '';
      const double = data.doubleClick ? ' (duplo)' : '';
      return `Clicar${coords}${button}${double}`;
    }

    case MouseActionType.DRAG:
      return `Arrastar de (${data.from.x}, ${data.from.y}) para (${data.to.x}, ${data.to.y})`;

    case MouseActionType.SCROLL: {
      const dir = data.direction === ScrollDirection.UP ? 'cima' : 'baixo';
      return `Rolar para ${dir} (${data.amount || 3}x)`;
    }

    default:
      return 'Ação desconhecida';
  }
};

/**
 * Formata descrição legível da ação do teclado
 */
const formatKeyboardAction = (action: AutomationAction): string => {
  if (action.device !== 'keyboard') return '';

  const { payload } = action;
  const { type, data } = payload;

  switch (type) {
    case KeyboardActionType.TYPE: {
      const text = data.text.length > 30 ? data.text.substring(0, 30) + '...' : data.text;
      const mode =
        data.mode !== TypingMode.INSTANT
          ? ` (${formatTypingMode(data.mode!)} ${data.value}ms)`
          : '';
      return `Digitar: "${text}"${mode}`;
    }

    case KeyboardActionType.PRESS:
      return `Pressionar tecla: ${data.key.toUpperCase()}`;

    case KeyboardActionType.COMBINATION:
      return `Combinação: ${data.keys.map((k) => k.toUpperCase()).join(' + ')}`;

    default:
      return 'Ação desconhecida';
  }
};

/**
 * Formata nome do botão do mouse
 */
const formatButton = (button: MouseButton): string => {
  switch (button) {
    case MouseButton.LEFT:
      return 'esquerdo';
    case MouseButton.RIGHT:
      return 'direito';
    case MouseButton.MIDDLE:
      return 'meio';
    default:
      return button;
  }
};

/**
 * Formata modo de digitação
 */
const formatTypingMode = (mode: TypingMode): string => {
  switch (mode) {
    case TypingMode.PER_CHAR:
      return 'por caractere';
    case TypingMode.TOTAL:
      return 'tempo total';
    default:
      return mode;
  }
};

/**
 * Formata detalhes adicionais da ação
 */
const formatActionDetails = (action: AutomationAction): string[] => {
  const details: string[] = [];

  if (action.device === 'mouse') {
    const { data } = action.payload;

    if ('duration' in data && data.duration && data.duration !== 1000) {
      details.push(`Duração: ${data.duration}ms`);
    }
  }

  return details;
};

/**
 * Componente de tabela de ações
 */
const ActionTable: React.FC<ActionTableProps> = ({
  actions,
  onRemove,
  onClear,
  className = '',
}) => {
  if (actions.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0">Ações Configuradas ({actions.length})</h6>
        <Button variant="outline-danger" size="sm" onClick={onClear}>
          Limpar Todas
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th style={{ width: '40px' }}>#</th>
            <th style={{ width: '100px' }}>Dispositivo</th>
            <th>Ação</th>
            <th style={{ width: '150px' }}>Detalhes</th>
            <th style={{ width: '80px' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {actions.map((action, index) => {
            const details = formatActionDetails(action);

            return (
              <tr key={action.id}>
                <td className="text-center">{index + 1}</td>
                <td>
                  <Badge bg={action.device === 'mouse' ? 'primary' : 'success'}>
                    {action.device === 'mouse' ? 'Mouse' : 'Teclado'}
                  </Badge>
                </td>
                <td>
                  {action.device === 'mouse'
                    ? formatMouseAction(action)
                    : formatKeyboardAction(action)}
                </td>
                <td>
                  {details.length > 0 ? (
                    <small className="text-muted">{details.join(', ')}</small>
                  ) : (
                    <span className="text-muted">-</span>
                  )}
                </td>
                <td className="text-center">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onRemove(action.id)}
                    title="Remover ação"
                  >
                    <Trash />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ActionTable;
