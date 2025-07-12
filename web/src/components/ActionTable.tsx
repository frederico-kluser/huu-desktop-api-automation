/**
 * Tabela para exibir e gerenciar ações de automação
 * Renderiza lista de ações com opções para remover
 */
import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import {
  AutomationAction,
  ActionDevice,
  MouseActionType,
  KeyboardActionType,
  ClipboardActionType,
  ScreenActionType,
  LlmActionType,
  OcrActionType,
  MouseButton,
  ScrollDirection,
  TypingMode,
  ACTION_DEVICE_LABELS,
} from '../types/automation-builder.types.js';

interface ActionTableProps {
  actions: AutomationAction[];
  onRemove: (_id: string) => void;
  onClear: () => void;
  className?: string;
}

/**
 * Retorna a cor do badge baseado no dispositivo
 */
const getDeviceBadgeColor = (device: ActionDevice): string => {
  switch (device) {
    case ActionDevice.WAIT:
      return 'secondary';
    case ActionDevice.CLIPBOARD:
      return 'info';
    case ActionDevice.SCREEN:
      return 'warning';
    case ActionDevice.LLM:
      return 'danger';
    case ActionDevice.OCR:
      return 'dark';
    case ActionDevice.MOUSE:
      return 'primary';
    case ActionDevice.KEYBOARD:
      return 'success';
    default:
      return 'secondary';
  }
};

/**
 * Formata descrição da ação de wait
 */
const formatWaitAction = (action: AutomationAction): string => {
  if (action.device !== ActionDevice.WAIT) return '';
  const ms = action.payload.data.ms;
  return `Aguardar ${ms}ms (${(ms / 1000).toFixed(1)}s)`;
};

/**
 * Formata descrição da ação de clipboard
 */
const formatClipboardAction = (action: AutomationAction): string => {
  if (action.device !== ActionDevice.CLIPBOARD) return '';

  switch (action.payload.type) {
    case ClipboardActionType.COPY:
      return 'Copiar conteúdo selecionado';
    case ClipboardActionType.PASTE:
      return 'Colar conteúdo da área de transferência';
    case ClipboardActionType.CLEAR:
      return 'Limpar área de transferência';
    default:
      return 'Ação desconhecida';
  }
};

/**
 * Formata descrição da ação de screen
 */
const formatScreenAction = (action: AutomationAction): string => {
  if (action.device !== ActionDevice.SCREEN) return '';

  const { type, data } = action.payload;

  switch (type) {
    case ScreenActionType.CAPTURE: {
      if (data.region) {
        return `Capturar região (${data.region.x}, ${data.region.y}) - ${data.region.width}x${data.region.height}`;
      }
      return 'Capturar tela inteira';
    }
    case ScreenActionType.FIND: {
      const conf = data.confidence ? ` (confiança: ${(data.confidence * 100).toFixed(0)}%)` : '';
      return `Procurar imagem${conf}`;
    }
    case ScreenActionType.WAIT_FOR: {
      const timeout = data.timeout ? ` por até ${(data.timeout / 1000).toFixed(1)}s` : '';
      return `Aguardar imagem aparecer${timeout}`;
    }
    default:
      return 'Ação desconhecida';
  }
};

/**
 * Formata descrição da ação de LLM
 */
const formatLlmAction = (action: AutomationAction): string => {
  if (action.device !== ActionDevice.LLM) return '';

  const { data } = action.payload;
  const prompt = data.prompt.length > 50 ? data.prompt.substring(0, 50) + '...' : data.prompt;
  const model = data.model ? ` (${data.model})` : '';
  return `Gerar resposta: "${prompt}"${model}`;
};

/**
 * Formata descrição da ação de OCR
 */
const formatOcrAction = (action: AutomationAction): string => {
  if (action.device !== ActionDevice.OCR) return '';

  const { data } = action.payload;
  const langs = data.languages ? ` [${data.languages.join(', ')}]` : '';
  const mode = data.mode ? ` (${data.mode})` : '';
  return `Extrair texto da imagem${langs}${mode}`;
};

/**
 * Formata descrição legível da ação do mouse
 */
const formatMouseAction = (action: AutomationAction): string => {
  if (action.device !== ActionDevice.MOUSE) return '';

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
  if (action.device !== ActionDevice.KEYBOARD) return '';

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
 * Formata descrição da ação baseado no dispositivo
 */
const formatActionDescription = (action: AutomationAction): string => {
  switch (action.device) {
    case ActionDevice.WAIT:
      return formatWaitAction(action);
    case ActionDevice.CLIPBOARD:
      return formatClipboardAction(action);
    case ActionDevice.SCREEN:
      return formatScreenAction(action);
    case ActionDevice.LLM:
      return formatLlmAction(action);
    case ActionDevice.OCR:
      return formatOcrAction(action);
    case ActionDevice.MOUSE:
      return formatMouseAction(action);
    case ActionDevice.KEYBOARD:
      return formatKeyboardAction(action);
    default:
      return 'Ação desconhecida';
  }
};

/**
 * Formata detalhes adicionais da ação
 */
const formatActionDetails = (action: AutomationAction): string[] => {
  const details: string[] = [];

  // Detalhes do mouse
  if (action.device === ActionDevice.MOUSE) {
    const { data } = action.payload;
    if ('duration' in data && data.duration && data.duration !== 1000) {
      details.push(`Duração: ${data.duration}ms`);
    }
  }

  // Detalhes do LLM
  if (action.device === ActionDevice.LLM) {
    const { data } = action.payload;
    if (data.temperature !== undefined && data.temperature !== 0.7) {
      details.push(`Temp: ${data.temperature}`);
    }
    if (data.maxTokens !== undefined && data.maxTokens !== 1000) {
      details.push(`Tokens: ${data.maxTokens}`);
    }
  }

  // Detalhes do OCR
  if (action.device === ActionDevice.OCR) {
    const { data } = action.payload;
    if (data.confidence && data.confidence > 0) {
      details.push(`Min. conf: ${data.confidence}%`);
    }
  }

  // Detalhes do Screen
  if (action.device === ActionDevice.SCREEN) {
    const { data } = action.payload;
    if ('region' in data && data.region) {
      details.push(`Região definida`);
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

      <Table striped bordered hover responsive size="sm">
        <thead>
          <tr>
            <th style={{ width: '50px' }} className="text-center">
              #
            </th>
            <th style={{ width: '180px' }}>Dispositivo</th>
            <th>Ação</th>
            <th style={{ width: '200px' }}>Detalhes</th>
            <th style={{ width: '80px' }} className="text-center">
              Remover
            </th>
          </tr>
        </thead>
        <tbody>
          {actions.map((action, index) => {
            const details = formatActionDetails(action);

            return (
              <tr key={action.id} className="align-middle">
                <td className="text-center align-middle">
                  <span className="fw-bold">{index + 1}</span>
                </td>
                <td className="align-middle">
                  <Badge
                    bg={getDeviceBadgeColor(action.device)}
                    className="d-inline-block"
                    style={{ minWidth: '140px' }}
                  >
                    {ACTION_DEVICE_LABELS[action.device]}
                  </Badge>
                </td>
                <td className="align-middle">{formatActionDescription(action)}</td>
                <td className="align-middle">
                  {details.length > 0 ? (
                    <small className="text-muted d-block">{details.join(' • ')}</small>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
                <td className="text-center align-middle">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onRemove(action.id)}
                    title="Remover ação"
                    className="d-flex align-items-center justify-content-center"
                    style={{ minWidth: '32px', minHeight: '32px' }}
                  >
                    <Trash size={16} />
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
