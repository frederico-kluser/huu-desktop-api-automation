/**
 * Tipos para eventos de input (mouse e teclado) transmitidos via SSE
 */

/**
 * Tipo de origem do evento
 */
export type EventSource = 'mouse' | 'keyboard';

/**
 * Tipo de botão do mouse
 */
export type MouseButton = 'left' | 'right' | 'middle';

/**
 * Interface base para todos os eventos de input
 */
export interface BaseInputEvent {
  /** Identificador único do evento */
  id: string;

  /** Origem do evento */
  source: EventSource;

  /** Timestamp do evento em millisegundos */
  ts: number;
}

/**
 * Evento de clique do mouse
 */
export interface MouseClickEvent extends BaseInputEvent {
  source: 'mouse';

  /** Botão do mouse que foi clicado */
  button: MouseButton;

  /** Coordenada X do cursor */
  x: number;

  /** Coordenada Y do cursor */
  y: number;
}

/**
 * Evento de tecla digitada
 */
export interface KeyboardEvent extends BaseInputEvent {
  source: 'keyboard';

  /** Tecla digitada */
  key: string;

  /** Coordenada X do cursor (para contexto) */
  x: number;

  /** Coordenada Y do cursor (para contexto) */
  y: number;
}

/**
 * União de todos os tipos de eventos de input
 */
export type InputEvent = MouseClickEvent | KeyboardEvent;

/**
 * Interface para publicadores de eventos
 */
export interface IEventPublisher {
  /**
   * Despacha um evento de clique do mouse
   * @param button Botão clicado
   * @param x Coordenada X
   * @param y Coordenada Y
   * @param ts Timestamp (opcional, usa Date.now() se não fornecido)
   */
  dispatchMouseClick(button: MouseButton, x: number, y: number, ts?: number): void;

  /**
   * Despacha um evento de tecla digitada
   * @param key Tecla digitada
   * @param x Coordenada X do cursor
   * @param y Coordenada Y do cursor
   * @param ts Timestamp (opcional, usa Date.now() se não fornecido)
   */
  dispatchKeyPress(key: string, x: number, y: number, ts?: number): void;
}

/**
 * Interface para ouvintes de eventos
 */
export interface IEventListener {
  /**
   * Recebe um evento de input
   * @param event Evento recebido
   */
  onEvent(event: InputEvent): void;
}

/**
 * Payload de evento SSE
 */
export interface SSEEventPayload {
  /** ID do último evento */
  id: string;

  /** Dados do evento */
  data: InputEvent;
}
