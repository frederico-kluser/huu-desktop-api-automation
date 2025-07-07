/**
 * Formulário para adicionar novas ações de automação
 * Renderiza campos dinâmicos baseados no tipo de dispositivo e ação selecionada
 */
import React, { useState, useCallback, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import {
  DeviceType,
  MouseActionType,
  KeyboardActionType,
  MouseButton,
  ScrollDirection,
  TypingMode,
  ActionFormState,
  AutomationAction,
  MousePayload,
  KeyboardPayload,
  KEYBOARD_CONSTRAINTS,
  MOUSE_CONSTRAINTS,
  // getAllSupportedKeys,
  getAllModifierKeys,
  getAllLetterKeys,
} from '../types/automation-builder.types';

interface ActionFormProps {
  onAdd: (_action: Omit<AutomationAction, 'id' | 'timestamp'>) => void;
  disabled?: boolean;
}

const initialFormState: ActionFormState = {
  device: 'mouse',
  mouseAction: MouseActionType.MOVE,
  keyboardAction: KeyboardActionType.TYPE,
  smooth: true,
  button: MouseButton.LEFT,
  doubleClick: false,
  direction: ScrollDirection.DOWN,
  amount: String(MOUSE_CONSTRAINTS.DEFAULT_SCROLL_AMOUNT),
  duration: String(MOUSE_CONSTRAINTS.DEFAULT_DURATION),
  mode: TypingMode.INSTANT,
  delay: '0',
  keys: [],
};

/**
 * Componente de formulário para adicionar ações
 */
const ActionForm: React.FC<ActionFormProps> = ({ onAdd, disabled = false }) => {
  const [formState, setFormState] = useState<ActionFormState>(initialFormState);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Limpa o estado do formulário quando o tipo de dispositivo muda
  useEffect(() => {
    setFormState((prev) => ({
      ...initialFormState,
      device: prev.device,
      mouseAction: prev.device === 'mouse' ? MouseActionType.MOVE : undefined,
      keyboardAction: prev.device === 'keyboard' ? KeyboardActionType.TYPE : undefined,
    }));
    setError(null);
  }, [formState.device]);

  /**
   * Atualiza campo do formulário
   */
  const updateField = useCallback((field: keyof ActionFormState, value: any) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setError(null);
  }, []);

  /**
   * Valida e constrói payload do mouse
   */
  const buildMousePayload = (): MousePayload | null => {
    const {
      mouseAction,
      x,
      y,
      fromX,
      fromY,
      toX,
      toY,
      button,
      doubleClick,
      direction,
      amount,
      smooth,
      duration,
    } = formState;

    try {
      switch (mouseAction) {
        case MouseActionType.MOVE:
          if (!x || !y) {
            setError('Coordenadas X e Y são obrigatórias');
            return null;
          }
          return {
            type: MouseActionType.MOVE,
            data: {
              x: parseInt(x),
              y: parseInt(y),
              smooth,
              duration: duration ? parseInt(duration) : undefined,
            },
          };

        case MouseActionType.CLICK:
          return {
            type: MouseActionType.CLICK,
            data: {
              x: x ? parseInt(x) : undefined,
              y: y ? parseInt(y) : undefined,
              button,
              doubleClick,
              smooth,
              duration: duration ? parseInt(duration) : undefined,
            },
          };

        case MouseActionType.DRAG:
          if (!fromX || !fromY || !toX || !toY) {
            setError('Coordenadas de origem e destino são obrigatórias');
            return null;
          }
          return {
            type: MouseActionType.DRAG,
            data: {
              from: { x: parseInt(fromX), y: parseInt(fromY) },
              to: { x: parseInt(toX), y: parseInt(toY) },
              smooth,
              duration: duration ? parseInt(duration) : undefined,
            },
          };

        case MouseActionType.SCROLL:
          return {
            type: MouseActionType.SCROLL,
            data: {
              direction: direction!,
              amount: amount ? parseInt(amount) : undefined,
              smooth,
              duration: duration ? parseInt(duration) : undefined,
            },
          };

        default:
          setError('Ação de mouse inválida');
          return null;
      }
    } catch (err) {
      setError('Erro ao processar valores numéricos');
      return null;
    }
  };

  /**
   * Valida e constrói payload do teclado
   */
  const buildKeyboardPayload = (): KeyboardPayload | null => {
    const { keyboardAction, text, mode, delay, key, keys } = formState;

    try {
      switch (keyboardAction) {
        case KeyboardActionType.TYPE: {
          if (!text || text.trim().length === 0) {
            setError('Texto é obrigatório');
            return null;
          }
          if (text.length > KEYBOARD_CONSTRAINTS.MAX_TEXT_LENGTH) {
            setError(
              `Texto muito longo (máximo ${KEYBOARD_CONSTRAINTS.MAX_TEXT_LENGTH} caracteres)`,
            );
            return null;
          }

          const value = delay ? parseInt(delay) : undefined;
          if (value !== undefined && value > KEYBOARD_CONSTRAINTS.MAX_DELAY) {
            setError(`Delay muito alto (máximo ${KEYBOARD_CONSTRAINTS.MAX_DELAY}ms)`);
            return null;
          }

          const typePayload: KeyboardPayload = {
            type: KeyboardActionType.TYPE,
            data: {
              text: text.replace(/[\x00-\x1F]/g, ''), // eslint-disable-line no-control-regex
              mode,
              value,
            },
          };
          return typePayload;
        }

        case KeyboardActionType.PRESS: {
          if (!key) {
            setError('Tecla é obrigatória');
            return null;
          }
          const pressPayload: KeyboardPayload = {
            type: KeyboardActionType.PRESS,
            data: { key },
          };
          return pressPayload;
        }

        case KeyboardActionType.COMBINATION: {
          if (!keys || keys.length === 0) {
            setError('Selecione pelo menos uma tecla');
            return null;
          }
          if (keys.length > KEYBOARD_CONSTRAINTS.MAX_COMBINATION_KEYS) {
            setError(
              `Máximo de ${KEYBOARD_CONSTRAINTS.MAX_COMBINATION_KEYS} teclas por combinação`,
            );
            return null;
          }
          const combinationPayload: KeyboardPayload = {
            type: KeyboardActionType.COMBINATION,
            data: { keys },
          };
          return combinationPayload;
        }

        default:
          setError('Ação de teclado inválida');
          return null;
      }
    } catch (err) {
      setError('Erro ao processar valores');
      return null;
    }
  };

  /**
   * Manipula submissão do formulário
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isAdding || disabled) return;

    setIsAdding(true);
    setError(null);

    try {
      let payload: MousePayload | KeyboardPayload | null = null;

      if (formState.device === 'mouse') {
        payload = buildMousePayload();
      } else {
        payload = buildKeyboardPayload();
      }

      if (!payload) {
        setIsAdding(false);
        return;
      }

      // Adiciona a ação
      onAdd({
        device: formState.device,
        payload,
      } as Omit<AutomationAction, 'id' | 'timestamp'>);

      // Reseta o formulário mantendo o tipo de dispositivo
      setFormState({
        ...initialFormState,
        device: formState.device,
        mouseAction: formState.device === 'mouse' ? formState.mouseAction : undefined,
        keyboardAction: formState.device === 'keyboard' ? formState.keyboardAction : undefined,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao adicionar ação');
    } finally {
      setIsAdding(false);
    }
  };

  /**
   * Renderiza campos do mouse
   */
  const renderMouseFields = () => {
    const { mouseAction } = formState;

    return (
      <>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Ação do Mouse</Form.Label>
            <Form.Select
              value={mouseAction}
              onChange={(e) => updateField('mouseAction', e.target.value as MouseActionType)}
              disabled={isAdding}
            >
              <option value={MouseActionType.MOVE}>Mover</option>
              <option value={MouseActionType.CLICK}>Clicar</option>
              <option value={MouseActionType.DRAG}>Arrastar</option>
              <option value={MouseActionType.SCROLL}>Rolar</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Campos específicos por ação */}
        {mouseAction === MouseActionType.MOVE && (
          <>
            <Col md={2}>
              <Form.Group>
                <Form.Label>X</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={formState.x || ''}
                  onChange={(e) => updateField('x', e.target.value)}
                  placeholder="0"
                  disabled={isAdding}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Y</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={formState.y || ''}
                  onChange={(e) => updateField('y', e.target.value)}
                  placeholder="0"
                  disabled={isAdding}
                  required
                />
              </Form.Group>
            </Col>
          </>
        )}

        {mouseAction === MouseActionType.CLICK && (
          <>
            <Col md={1}>
              <Form.Group>
                <Form.Label>X</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={formState.x || ''}
                  onChange={(e) => updateField('x', e.target.value)}
                  placeholder="Auto"
                  disabled={isAdding}
                />
              </Form.Group>
            </Col>
            <Col md={1}>
              <Form.Group>
                <Form.Label>Y</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={formState.y || ''}
                  onChange={(e) => updateField('y', e.target.value)}
                  placeholder="Auto"
                  disabled={isAdding}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Botão</Form.Label>
                <Form.Select
                  value={formState.button}
                  onChange={(e) => updateField('button', e.target.value as MouseButton)}
                  disabled={isAdding}
                >
                  <option value={MouseButton.LEFT}>Esquerdo</option>
                  <option value={MouseButton.RIGHT}>Direito</option>
                  <option value={MouseButton.MIDDLE}>Meio</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mt-4">
                <Form.Check
                  type="checkbox"
                  label="Duplo clique"
                  checked={formState.doubleClick}
                  onChange={(e) => updateField('doubleClick', e.target.checked)}
                  disabled={isAdding}
                />
              </Form.Group>
            </Col>
          </>
        )}

        {mouseAction === MouseActionType.DRAG && (
          <>
            <Col md={1}>
              <Form.Group>
                <Form.Label>De X</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={formState.fromX || ''}
                  onChange={(e) => updateField('fromX', e.target.value)}
                  placeholder="0"
                  disabled={isAdding}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={1}>
              <Form.Group>
                <Form.Label>De Y</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={formState.fromY || ''}
                  onChange={(e) => updateField('fromY', e.target.value)}
                  placeholder="0"
                  disabled={isAdding}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={1}>
              <Form.Group>
                <Form.Label>Para X</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={formState.toX || ''}
                  onChange={(e) => updateField('toX', e.target.value)}
                  placeholder="0"
                  disabled={isAdding}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={1}>
              <Form.Group>
                <Form.Label>Para Y</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={formState.toY || ''}
                  onChange={(e) => updateField('toY', e.target.value)}
                  placeholder="0"
                  disabled={isAdding}
                  required
                />
              </Form.Group>
            </Col>
          </>
        )}

        {mouseAction === MouseActionType.SCROLL && (
          <>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Direção</Form.Label>
                <Form.Select
                  value={formState.direction}
                  onChange={(e) => updateField('direction', e.target.value as ScrollDirection)}
                  disabled={isAdding}
                >
                  <option value={ScrollDirection.DOWN}>Baixo</option>
                  <option value={ScrollDirection.UP}>Cima</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Quantidade</Form.Label>
                <Form.Control
                  type="number"
                  min={MOUSE_CONSTRAINTS.MIN_SCROLL_AMOUNT}
                  max={MOUSE_CONSTRAINTS.MAX_SCROLL_AMOUNT}
                  value={formState.amount || ''}
                  onChange={(e) => updateField('amount', e.target.value)}
                  placeholder={String(MOUSE_CONSTRAINTS.DEFAULT_SCROLL_AMOUNT)}
                  disabled={isAdding}
                />
              </Form.Group>
            </Col>
          </>
        )}

        {/* Campos comuns do mouse */}
        <Col md={2}>
          <Form.Group className="mt-4">
            <Form.Check
              type="checkbox"
              label="Movimento suave"
              checked={formState.smooth}
              onChange={(e) => updateField('smooth', e.target.checked)}
              disabled={isAdding}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group>
            <Form.Label>Duração (ms)</Form.Label>
            <Form.Control
              type="number"
              min={MOUSE_CONSTRAINTS.MIN_DURATION}
              max={MOUSE_CONSTRAINTS.MAX_DURATION}
              value={formState.duration || ''}
              onChange={(e) => updateField('duration', e.target.value)}
              placeholder={String(MOUSE_CONSTRAINTS.DEFAULT_DURATION)}
              disabled={isAdding}
            />
          </Form.Group>
        </Col>
      </>
    );
  };

  /**
   * Renderiza campos do teclado
   */
  const renderKeyboardFields = () => {
    const { keyboardAction } = formState;
    // const supportedKeys = getAllSupportedKeys();
    const modifierKeys = getAllModifierKeys();
    const letterKeys = getAllLetterKeys();

    return (
      <>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Ação do Teclado</Form.Label>
            <Form.Select
              value={keyboardAction}
              onChange={(e) => updateField('keyboardAction', e.target.value as KeyboardActionType)}
              disabled={isAdding}
            >
              <option value={KeyboardActionType.TYPE}>Digitar Texto</option>
              <option value={KeyboardActionType.PRESS}>Pressionar Tecla</option>
              <option value={KeyboardActionType.COMBINATION}>Combinação de Teclas</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Campos específicos por ação */}
        {keyboardAction === KeyboardActionType.TYPE && (
          <>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Texto</Form.Label>
                <Form.Control
                  type="text"
                  value={formState.text || ''}
                  onChange={(e) => updateField('text', e.target.value)}
                  placeholder="Digite o texto..."
                  maxLength={KEYBOARD_CONSTRAINTS.MAX_TEXT_LENGTH}
                  disabled={isAdding}
                  required
                />
                <Form.Text className="text-muted">
                  {formState.text?.length || 0}/{KEYBOARD_CONSTRAINTS.MAX_TEXT_LENGTH} caracteres
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Modo</Form.Label>
                <Form.Select
                  value={formState.mode}
                  onChange={(e) => updateField('mode', e.target.value as TypingMode)}
                  disabled={isAdding}
                >
                  <option value={TypingMode.INSTANT}>Instantâneo</option>
                  <option value={TypingMode.PER_CHAR}>Por Caractere</option>
                  <option value={TypingMode.TOTAL}>Tempo Total</option>
                </Form.Select>
              </Form.Group>
            </Col>
            {formState.mode !== TypingMode.INSTANT && (
              <Col md={2}>
                <Form.Group>
                  <Form.Label>
                    {formState.mode === TypingMode.PER_CHAR
                      ? 'Delay/Char (ms)'
                      : 'Tempo Total (ms)'}
                  </Form.Label>
                  <Form.Control
                    type="number"
                    min={KEYBOARD_CONSTRAINTS.MIN_DELAY}
                    max={KEYBOARD_CONSTRAINTS.MAX_DELAY}
                    value={formState.delay || ''}
                    onChange={(e) => updateField('delay', e.target.value)}
                    placeholder="0"
                    disabled={isAdding}
                  />
                </Form.Group>
              </Col>
            )}
          </>
        )}

        {keyboardAction === KeyboardActionType.PRESS && (
          <Col md={3}>
            <Form.Group>
              <Form.Label>Tecla</Form.Label>
              <Form.Select
                value={formState.key || ''}
                onChange={(e) => updateField('key', e.target.value)}
                disabled={isAdding}
                required
              >
                <option value="">Selecione uma tecla</option>
                <optgroup label="Navegação">
                  <option value="enter">Enter</option>
                  <option value="tab">Tab</option>
                  <option value="escape">Escape</option>
                  <option value="space">Space</option>
                  <option value="backspace">Backspace</option>
                  <option value="delete">Delete</option>
                </optgroup>
                <optgroup label="Setas">
                  <option value="up">↑ Cima</option>
                  <option value="down">↓ Baixo</option>
                  <option value="left">← Esquerda</option>
                  <option value="right">→ Direita</option>
                </optgroup>
                <optgroup label="Páginas">
                  <option value="home">Home</option>
                  <option value="end">End</option>
                  <option value="pageup">Page Up</option>
                  <option value="pagedown">Page Down</option>
                </optgroup>
                <optgroup label="Funções">
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={`f${i + 1}`} value={`f${i + 1}`}>
                      F{i + 1}
                    </option>
                  ))}
                </optgroup>
              </Form.Select>
            </Form.Group>
          </Col>
        )}

        {keyboardAction === KeyboardActionType.COMBINATION && (
          <Col md={6}>
            <Form.Group>
              <Form.Label>Teclas da Combinação</Form.Label>
              <div className="d-flex flex-wrap gap-2">
                {/* Modificadores */}
                <div className="w-100">
                  <small className="text-muted">Modificadores:</small>
                </div>
                {modifierKeys.map((mod) => (
                  <Form.Check
                    key={mod}
                    type="checkbox"
                    label={mod.toUpperCase()}
                    checked={formState.keys?.includes(mod) || false}
                    onChange={(e) => {
                      const newKeys = e.target.checked
                        ? [...(formState.keys || []), mod]
                        : (formState.keys || []).filter((k) => k !== mod);
                      updateField('keys', newKeys);
                    }}
                    disabled={isAdding}
                  />
                ))}
                {/* Letras */}
                <div className="w-100 mt-2">
                  <small className="text-muted">Letras:</small>
                </div>
                {letterKeys.map((letter) => (
                  <Form.Check
                    key={letter}
                    type="checkbox"
                    label={letter.toUpperCase()}
                    checked={formState.keys?.includes(letter) || false}
                    onChange={(e) => {
                      const newKeys = e.target.checked
                        ? [...(formState.keys || []), letter]
                        : (formState.keys || []).filter((k) => k !== letter);
                      updateField('keys', newKeys);
                    }}
                    disabled={isAdding}
                  />
                ))}
              </div>
              <Form.Text className="text-muted">
                Selecionadas: {formState.keys?.length || 0}/
                {KEYBOARD_CONSTRAINTS.MAX_COMBINATION_KEYS}
              </Form.Text>
            </Form.Group>
          </Col>
        )}
      </>
    );
  };

  return (
    <Card>
      <Card.Header>
        <h6 className="mb-0">Adicionar Nova Ação</h6>
      </Card.Header>
      <Card.Body>
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row className="align-items-end">
            {/* Seletor de dispositivo */}
            <Col md={2}>
              <Form.Group>
                <Form.Label>Dispositivo</Form.Label>
                <Form.Select
                  value={formState.device}
                  onChange={(e) => updateField('device', e.target.value as DeviceType)}
                  disabled={isAdding}
                >
                  <option value="mouse">Mouse</option>
                  <option value="keyboard">Teclado</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Campos dinâmicos baseados no dispositivo */}
            {formState.device === 'mouse' ? renderMouseFields() : renderKeyboardFields()}

            {/* Botão de adicionar */}
            <Col md="auto">
              <Button
                type="submit"
                variant="primary"
                disabled={isAdding || disabled}
                className="mb-3"
              >
                {isAdding ? 'Adicionando...' : 'Adicionar Ação'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ActionForm;
