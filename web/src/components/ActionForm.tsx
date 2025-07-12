/**
 * Formulário para adicionar novas ações de automação
 * Renderiza campos dinâmicos baseados no tipo de dispositivo e ação selecionada
 */
import React, { useState, useCallback, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import {
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
  ActionFormState,
  AutomationAction,
  MousePayload,
  KeyboardPayload,
  ClipboardPayload,
  ScreenPayload,
  LlmPayload,
  OcrPayload,
  WaitPayloadWrapper,
  KEYBOARD_CONSTRAINTS,
  MOUSE_CONSTRAINTS,
  WAIT_CONSTRAINTS,
  SCREEN_CONSTRAINTS,
  LLM_CONSTRAINTS,
  OCR_CONSTRAINTS,
  ACTION_DEVICE_LABELS,
  getAllModifierKeys,
  getAllLetterKeys,
} from '../types/automation-builder.types.js';

interface ActionFormProps {
  onAdd: (_action: Omit<AutomationAction, 'id' | 'timestamp'>) => void;
  disabled?: boolean;
}

const initialFormState: ActionFormState = {
  device: ActionDevice.WAIT,
  mouseAction: MouseActionType.MOVE,
  keyboardAction: KeyboardActionType.TYPE,
  clipboardAction: ClipboardActionType.COPY,
  screenAction: ScreenActionType.CAPTURE,
  llmAction: LlmActionType.COMPLETION,
  ocrAction: OcrActionType.EXTRACT_TEXT,
  smooth: true,
  button: MouseButton.LEFT,
  doubleClick: false,
  direction: ScrollDirection.DOWN,
  amount: String(MOUSE_CONSTRAINTS.DEFAULT_SCROLL_AMOUNT),
  duration: String(MOUSE_CONSTRAINTS.DEFAULT_DURATION),
  mode: TypingMode.INSTANT,
  delay: '0',
  keys: [],
  waitMs: String(WAIT_CONSTRAINTS.DEFAULT_MS),
  confidence: String(SCREEN_CONSTRAINTS.DEFAULT_CONFIDENCE),
  timeout: String(SCREEN_CONSTRAINTS.DEFAULT_TIMEOUT),
  temperature: String(LLM_CONSTRAINTS.DEFAULT_TEMPERATURE),
  maxTokens: String(LLM_CONSTRAINTS.DEFAULT_MAX_TOKENS),
  ocrConfidence: String(OCR_CONSTRAINTS.DEFAULT_CONFIDENCE),
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
      mouseAction: prev.device === ActionDevice.MOUSE ? MouseActionType.MOVE : undefined,
      keyboardAction: prev.device === ActionDevice.KEYBOARD ? KeyboardActionType.TYPE : undefined,
      clipboardAction:
        prev.device === ActionDevice.CLIPBOARD ? ClipboardActionType.COPY : undefined,
      screenAction: prev.device === ActionDevice.SCREEN ? ScreenActionType.CAPTURE : undefined,
      llmAction: prev.device === ActionDevice.LLM ? LlmActionType.COMPLETION : undefined,
      ocrAction: prev.device === ActionDevice.OCR ? OcrActionType.EXTRACT_TEXT : undefined,
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
   * Valida e constrói payload de wait
   */
  const buildWaitPayload = (): WaitPayloadWrapper | null => {
    const { waitMs } = formState;

    if (!waitMs) {
      setError('Tempo de espera é obrigatório');
      return null;
    }

    const ms = parseInt(waitMs);
    if (isNaN(ms) || ms < WAIT_CONSTRAINTS.MIN_MS || ms > WAIT_CONSTRAINTS.MAX_MS) {
      setError(
        `Tempo deve estar entre ${WAIT_CONSTRAINTS.MIN_MS}ms e ${WAIT_CONSTRAINTS.MAX_MS}ms`,
      );
      return null;
    }

    return { data: { ms } };
  };

  /**
   * Valida e constrói payload do clipboard
   */
  const buildClipboardPayload = (): ClipboardPayload | null => {
    const { clipboardAction } = formState;

    switch (clipboardAction) {
      case ClipboardActionType.COPY:
        return { type: ClipboardActionType.COPY, data: {} };
      case ClipboardActionType.PASTE:
        return { type: ClipboardActionType.PASTE, data: {} };
      case ClipboardActionType.CLEAR:
        return { type: ClipboardActionType.CLEAR, data: {} };
      default:
        setError('Ação de clipboard inválida');
        return null;
    }
  };

  /**
   * Valida e constrói payload de screen
   */
  const buildScreenPayload = (): ScreenPayload | null => {
    const {
      screenAction,
      template,
      confidence,
      timeout,
      regionX,
      regionY,
      regionWidth,
      regionHeight,
    } = formState;

    const region =
      regionX && regionY && regionWidth && regionHeight
        ? {
            x: parseInt(regionX),
            y: parseInt(regionY),
            width: parseInt(regionWidth),
            height: parseInt(regionHeight),
          }
        : undefined;

    switch (screenAction) {
      case ScreenActionType.CAPTURE:
        return { type: ScreenActionType.CAPTURE, data: { region } };

      case ScreenActionType.FIND:
        if (!template) {
          setError('Template é obrigatório');
          return null;
        }
        return {
          type: ScreenActionType.FIND,
          data: {
            template,
            confidence: confidence ? parseFloat(confidence) : SCREEN_CONSTRAINTS.DEFAULT_CONFIDENCE,
            region,
          },
        };

      case ScreenActionType.WAIT_FOR:
        if (!template) {
          setError('Template é obrigatório');
          return null;
        }
        return {
          type: ScreenActionType.WAIT_FOR,
          data: {
            template,
            timeout: timeout ? parseInt(timeout) : SCREEN_CONSTRAINTS.DEFAULT_TIMEOUT,
            confidence: confidence ? parseFloat(confidence) : SCREEN_CONSTRAINTS.DEFAULT_CONFIDENCE,
            region,
          },
        };

      default:
        setError('Ação de tela inválida');
        return null;
    }
  };

  /**
   * Valida e constrói payload de LLM
   */
  const buildLlmPayload = (): LlmPayload | null => {
    const { prompt, model, temperature, maxTokens, systemPrompt, outputFormat } = formState;

    if (!prompt || prompt.trim().length === 0) {
      setError('Prompt é obrigatório');
      return null;
    }

    if (prompt.length > LLM_CONSTRAINTS.MAX_PROMPT_LENGTH) {
      setError(`Prompt muito longo (máximo ${LLM_CONSTRAINTS.MAX_PROMPT_LENGTH} caracteres)`);
      return null;
    }

    return {
      type: LlmActionType.COMPLETION,
      data: {
        prompt,
        model: model || undefined,
        temperature: temperature ? parseFloat(temperature) : LLM_CONSTRAINTS.DEFAULT_TEMPERATURE,
        maxTokens: maxTokens ? parseInt(maxTokens) : LLM_CONSTRAINTS.DEFAULT_MAX_TOKENS,
        systemPrompt: systemPrompt || undefined,
        outputFormat: outputFormat || undefined,
      },
    };
  };

  /**
   * Valida e constrói payload de OCR
   */
  const buildOcrPayload = (): OcrPayload | null => {
    const { ocrImage, ocrLanguages, ocrMode, ocrConfidence } = formState;

    if (!ocrImage) {
      setError('Imagem é obrigatória');
      return null;
    }

    return {
      type: OcrActionType.EXTRACT_TEXT,
      data: {
        image: ocrImage,
        languages: ocrLanguages && ocrLanguages.length > 0 ? ocrLanguages : undefined,
        mode: ocrMode || undefined,
        confidence: ocrConfidence ? parseFloat(ocrConfidence) : OCR_CONSTRAINTS.DEFAULT_CONFIDENCE,
      },
    };
  };

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
      let payload:
        | MousePayload
        | KeyboardPayload
        | ClipboardPayload
        | ScreenPayload
        | LlmPayload
        | OcrPayload
        | WaitPayloadWrapper
        | null = null;

      switch (formState.device) {
        case ActionDevice.WAIT:
          payload = buildWaitPayload();
          break;
        case ActionDevice.CLIPBOARD:
          payload = buildClipboardPayload();
          break;
        case ActionDevice.SCREEN:
          payload = buildScreenPayload();
          break;
        case ActionDevice.LLM:
          payload = buildLlmPayload();
          break;
        case ActionDevice.OCR:
          payload = buildOcrPayload();
          break;
        case ActionDevice.MOUSE:
          payload = buildMousePayload();
          break;
        case ActionDevice.KEYBOARD:
          payload = buildKeyboardPayload();
          break;
        default:
          setError('Dispositivo inválido');
          return;
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
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao adicionar ação');
    } finally {
      setIsAdding(false);
    }
  };

  /**
   * Renderiza campos de wait
   */
  const renderWaitFields = () => (
    <Col md={3}>
      <Form.Group>
        <Form.Label>Tempo de Espera (ms)</Form.Label>
        <Form.Control
          type="number"
          min={WAIT_CONSTRAINTS.MIN_MS}
          max={WAIT_CONSTRAINTS.MAX_MS}
          value={formState.waitMs || ''}
          onChange={(e) => updateField('waitMs', e.target.value)}
          placeholder={String(WAIT_CONSTRAINTS.DEFAULT_MS)}
          disabled={isAdding}
          required
        />
        <Form.Text className="text-muted">Máximo: {WAIT_CONSTRAINTS.MAX_MS / 1000}s</Form.Text>
      </Form.Group>
    </Col>
  );

  /**
   * Renderiza campos de clipboard
   */
  const renderClipboardFields = () => (
    <Col md={3}>
      <Form.Group>
        <Form.Label>Ação</Form.Label>
        <Form.Select
          value={formState.clipboardAction}
          onChange={(e) => updateField('clipboardAction', e.target.value as ClipboardActionType)}
          disabled={isAdding}
        >
          <option value={ClipboardActionType.COPY}>Copiar</option>
          <option value={ClipboardActionType.PASTE}>Colar</option>
          <option value={ClipboardActionType.CLEAR}>Limpar</option>
        </Form.Select>
      </Form.Group>
    </Col>
  );

  /**
   * Renderiza campos de screen
   */
  const renderScreenFields = () => {
    const { screenAction } = formState;

    return (
      <>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Ação</Form.Label>
            <Form.Select
              value={screenAction}
              onChange={(e) => updateField('screenAction', e.target.value as ScreenActionType)}
              disabled={isAdding}
            >
              <option value={ScreenActionType.CAPTURE}>Capturar Tela</option>
              <option value={ScreenActionType.FIND}>Procurar Imagem</option>
              <option value={ScreenActionType.WAIT_FOR}>Aguardar Imagem</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {(screenAction === ScreenActionType.FIND || screenAction === ScreenActionType.WAIT_FOR) && (
          <>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Template (base64)</Form.Label>
                <Form.Control
                  type="text"
                  value={formState.template || ''}
                  onChange={(e) => updateField('template', e.target.value)}
                  placeholder="data:image/png;base64,..."
                  disabled={isAdding}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Confiança</Form.Label>
                <Form.Control
                  type="number"
                  min={SCREEN_CONSTRAINTS.MIN_CONFIDENCE}
                  max={SCREEN_CONSTRAINTS.MAX_CONFIDENCE}
                  step="0.1"
                  value={formState.confidence || ''}
                  onChange={(e) => updateField('confidence', e.target.value)}
                  placeholder={String(SCREEN_CONSTRAINTS.DEFAULT_CONFIDENCE)}
                  disabled={isAdding}
                />
              </Form.Group>
            </Col>
          </>
        )}

        {screenAction === ScreenActionType.WAIT_FOR && (
          <Col md={2}>
            <Form.Group>
              <Form.Label>Timeout (ms)</Form.Label>
              <Form.Control
                type="number"
                min={SCREEN_CONSTRAINTS.MIN_TIMEOUT}
                max={SCREEN_CONSTRAINTS.MAX_TIMEOUT}
                value={formState.timeout || ''}
                onChange={(e) => updateField('timeout', e.target.value)}
                placeholder={String(SCREEN_CONSTRAINTS.DEFAULT_TIMEOUT)}
                disabled={isAdding}
              />
            </Form.Group>
          </Col>
        )}
      </>
    );
  };

  /**
   * Renderiza campos de LLM
   */
  const renderLlmFields = () => (
    <>
      <Col md={4}>
        <Form.Group>
          <Form.Label>Prompt</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={formState.prompt || ''}
            onChange={(e) => updateField('prompt', e.target.value)}
            placeholder="Digite o prompt..."
            maxLength={LLM_CONSTRAINTS.MAX_PROMPT_LENGTH}
            disabled={isAdding}
            required
          />
          <Form.Text className="text-muted">
            {formState.prompt?.length || 0}/{LLM_CONSTRAINTS.MAX_PROMPT_LENGTH}
          </Form.Text>
        </Form.Group>
      </Col>
      <Col md={2}>
        <Form.Group>
          <Form.Label>Modelo</Form.Label>
          <Form.Control
            type="text"
            value={formState.model || ''}
            onChange={(e) => updateField('model', e.target.value)}
            placeholder="gpt-4"
            disabled={isAdding}
          />
        </Form.Group>
      </Col>
      <Col md={2}>
        <Form.Group>
          <Form.Label>Temperatura</Form.Label>
          <Form.Control
            type="number"
            min={LLM_CONSTRAINTS.MIN_TEMPERATURE}
            max={LLM_CONSTRAINTS.MAX_TEMPERATURE}
            step="0.1"
            value={formState.temperature || ''}
            onChange={(e) => updateField('temperature', e.target.value)}
            placeholder={String(LLM_CONSTRAINTS.DEFAULT_TEMPERATURE)}
            disabled={isAdding}
          />
        </Form.Group>
      </Col>
    </>
  );

  /**
   * Renderiza campos de OCR
   */
  const renderOcrFields = () => (
    <>
      <Col md={4}>
        <Form.Group>
          <Form.Label>Imagem (base64)</Form.Label>
          <Form.Control
            type="text"
            value={formState.ocrImage || ''}
            onChange={(e) => updateField('ocrImage', e.target.value)}
            placeholder="data:image/png;base64,..."
            disabled={isAdding}
            required
          />
        </Form.Group>
      </Col>
      <Col md={2}>
        <Form.Group>
          <Form.Label>Idiomas</Form.Label>
          <Form.Control
            type="text"
            value={formState.ocrLanguages?.join(',') || ''}
            onChange={(e) =>
              updateField(
                'ocrLanguages',
                e.target.value.split(',').filter((l) => l.trim()),
              )
            }
            placeholder="por,eng"
            disabled={isAdding}
          />
        </Form.Group>
      </Col>
      <Col md={2}>
        <Form.Group>
          <Form.Label>Modo</Form.Label>
          <Form.Control
            type="text"
            value={formState.ocrMode || ''}
            onChange={(e) => updateField('ocrMode', e.target.value)}
            placeholder="fast"
            disabled={isAdding}
          />
        </Form.Group>
      </Col>
    </>
  );

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
              <Form.Group className="d-flex align-items-center mt-4">
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
          <Form.Group className="d-flex align-items-center mt-4">
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

  /**
   * Renderiza campos dinâmicos baseados no dispositivo
   */
  const renderDeviceFields = () => {
    switch (formState.device) {
      case ActionDevice.WAIT:
        return renderWaitFields();
      case ActionDevice.CLIPBOARD:
        return renderClipboardFields();
      case ActionDevice.SCREEN:
        return renderScreenFields();
      case ActionDevice.LLM:
        return renderLlmFields();
      case ActionDevice.OCR:
        return renderOcrFields();
      case ActionDevice.MOUSE:
        return renderMouseFields();
      case ActionDevice.KEYBOARD:
        return renderKeyboardFields();
      default:
        return null;
    }
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
                  onChange={(e) => updateField('device', e.target.value as ActionDevice)}
                  disabled={isAdding}
                  data-testid="action-device"
                >
                  {Object.values(ActionDevice).map((device) => (
                    <option key={device} value={device}>
                      {ACTION_DEVICE_LABELS[device]}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Campos dinâmicos baseados no dispositivo */}
            {renderDeviceFields()}

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
