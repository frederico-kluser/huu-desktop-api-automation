/**
 * Tabela para exibir e gerenciar ações de automação
 * Renderiza lista de ações com opções para remover e reordenar via drag-and-drop
 */
import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { Trash, GripVertical } from 'react-bootstrap-icons';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  defaultDropAnimationSideEffects,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';
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
  onReorder?: (actions: AutomationAction[]) => void;
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
 * Componente de linha da tabela com suporte a drag
 */
interface SortableRowProps {
  action: AutomationAction;
  index: number;
  onRemove: (id: string) => void;
  isDragging?: boolean;
}

const SortableRow: React.FC<SortableRowProps> = ({ action, index, onRemove, isDragging = false }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isCurrentlyDragging,
  } = useSortable({ 
    id: action.id,
    transition: {
      duration: 150,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: 'relative' as const,
    zIndex: isCurrentlyDragging ? 1000 : undefined,
  };

  const details = formatActionDetails(action);

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`align-middle sortable-row ${isCurrentlyDragging ? 'sortable-row--dragging' : ''}`}
    >
      <td className="text-center align-middle">
        <div
          {...attributes}
          {...listeners}
          className="drag-handle"
          aria-label="Arrastar para reordenar"
          aria-pressed={isCurrentlyDragging}
          role="button"
          tabIndex={0}
        >
          <GripVertical size={16} />
        </div>
      </td>
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
};

/**
 * Componente de overlay para o item sendo arrastado
 */
const DragOverlayItem: React.FC<{ action: AutomationAction; index: number }> = ({ action, index }) => {
  const details = formatActionDetails(action);
  return (
    <div className="drag-overlay">
      <Table 
        striped 
        bordered 
        hover 
        responsive 
        size="sm" 
        style={{ 
          width: 'auto', 
          margin: 0,
        }}
      >
      <tbody>
        <tr className="align-middle">
          <td className="text-center align-middle" style={{ width: '40px' }}>
            <div className="drag-handle" style={{ cursor: 'grabbing' }}>
              <GripVertical size={16} />
            </div>
          </td>
          <td className="text-center align-middle" style={{ width: '50px' }}>
            <span className="fw-bold">{index + 1}</span>
          </td>
          <td className="align-middle" style={{ width: '180px' }}>
            <Badge
              bg={getDeviceBadgeColor(action.device)}
              className="d-inline-block"
              style={{ minWidth: '140px' }}
            >
              {ACTION_DEVICE_LABELS[action.device]}
            </Badge>
          </td>
          <td className="align-middle">{formatActionDescription(action)}</td>
          <td className="align-middle" style={{ width: '200px' }}>
            {details.length > 0 ? (
              <small className="text-muted d-block">{details.join(' • ')}</small>
            ) : (
              <span className="text-muted">—</span>
            )}
          </td>
          <td className="text-center align-middle" style={{ width: '80px' }}>
            <Button
              variant="outline-danger"
              size="sm"
              disabled
              className="d-flex align-items-center justify-content-center"
              style={{ minWidth: '32px', minHeight: '32px' }}
            >
              <Trash size={16} />
            </Button>
          </td>
        </tr>
      </tbody>
    </Table>
    </div>
  );
};

/**
 * Componente de tabela de ações com suporte a drag-and-drop
 */
const ActionTable: React.FC<ActionTableProps> = ({
  actions,
  onRemove,
  onClear,
  onReorder,
  className = '',
}) => {
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  if (actions.length === 0) {
    return null;
  }

  const handleDragStart = React.useCallback((event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
    document.body.classList.add('dragging');
  }, []);

  const handleDragEnd = React.useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over?.id && over && onReorder) {
      const oldIndex = actions.findIndex((item) => item.id === active.id);
      const newIndex = actions.findIndex((item) => item.id === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newItems = arrayMove(actions, oldIndex, newIndex);
        onReorder(newItems);
      }
    }
    
    setActiveId(null);
    document.body.classList.remove('dragging');
  }, [actions, onReorder]);

  const handleDragCancel = React.useCallback(() => {
    setActiveId(null);
    document.body.classList.remove('dragging');
  }, []);

  const activeAction = React.useMemo(
    () => (activeId ? actions.find(a => a.id === activeId) : null),
    [activeId, actions]
  );
  const activeIndex = activeAction ? actions.indexOf(activeAction) : -1;

  return (
    <div className={className}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0">Ações Configuradas ({actions.length})</h6>
        <div className="d-flex gap-2">
          {actions.length > 1 && (
            <small className="text-muted align-self-center">
              <GripVertical size={14} className="me-1" />
              Arraste para reordenar
            </small>
          )}
          <Button variant="outline-danger" size="sm" onClick={onClear}>
            Limpar Todas
          </Button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
      >
        <Table 
        striped 
        bordered 
        hover 
        responsive 
        size="sm" 
        className={`action-table ${activeId ? 'action-table--dragging' : ''}`}
      >
          <thead>
            <tr>
              <th style={{ width: '40px' }} className="text-center">
                {/* Coluna para drag handle */}
              </th>
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
            <SortableContext
              items={actions.map(a => a.id)}
              strategy={verticalListSortingStrategy}
            >
              {actions.map((action, index) => (
                <SortableRow
                  key={action.id}
                  action={action}
                  index={index}
                  onRemove={onRemove}
                  isDragging={action.id === activeId}
                />
              ))}
            </SortableContext>
          </tbody>
        </Table>
        <DragOverlay
          dropAnimation={{
            duration: 200,
            easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
          }}
        >
          {activeAction ? (
            <DragOverlayItem action={activeAction} index={activeIndex + 1} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default ActionTable;
