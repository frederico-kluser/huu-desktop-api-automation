/**
 * Tipos e interfaces para eventos de gravação
 * Suporta eventos de mouse e teclado com timestamps precisos
 */

/**
 * Evento base de gravação
 */
export interface BaseRecordedEvent {
  id: string;
  timestamp: number;
  type: 'mouse' | 'keyboard';
}

/**
 * Ações do mouse
 */
export type MouseAction = 'down' | 'up' | 'move';

/**
 * Botões do mouse
 */
export type MouseButton = 'left' | 'right' | 'middle';

/**
 * Evento de mouse gravado
 */
export interface MouseRecordedEvent extends BaseRecordedEvent {
  type: 'mouse';
  action: MouseAction;
  x: number;
  y: number;
  button?: MouseButton;
  screenshot?: string; // Base64 PNG, apenas em 'down'
}

/**
 * Ações do teclado
 */
export type KeyboardAction = 'down' | 'up';

/**
 * Evento de teclado gravado
 */
export interface KeyboardRecordedEvent extends BaseRecordedEvent {
  type: 'keyboard';
  action: KeyboardAction;
  key: string;
}

/**
 * União de todos os eventos gravados
 */
export type RecordedEvent = MouseRecordedEvent | KeyboardRecordedEvent;

/**
 * Interface para listener de eventos gravados
 */
export interface IRecorderEventListener {
  (event: RecordedEvent): void;
}

/**
 * Interface para publicador de eventos gravados
 */
export interface IRecorderEventPublisher {
  emit(event: RecordedEvent): void;
  on(listener: IRecorderEventListener): void;
  off(listener: IRecorderEventListener): void;
}

/**
 * Configuração do recorder
 */
export interface RecorderConfig {
  includeScreenshot: boolean;
  moveIntervalMs: number;
  maxScreenshotSize: number;
}