/**
 * Tipos estendidos para eventos de input genéricos
 * Suporta eventos mais detalhados para o sistema de gravação
 */

import type { MouseButton } from './input-event.types.js';

/**
 * Evento genérico com dados customizados
 */
export interface GenericInputEvent {
  id: string;
  type: 'mouse' | 'keyboard';
  timestamp: number;
  cursorX: number;
  cursorY: number;
  data: any;
}

/**
 * Dados de evento de mouse estendido
 */
export interface ExtendedMouseData {
  action: 'click' | 'release' | 'move';
  x: number;
  y: number;
  button?: MouseButton;
}

/**
 * Dados de evento de teclado estendido
 */
export interface ExtendedKeyboardData {
  key: string;
  action: 'down' | 'up';
}

/**
 * Evento de mouse estendido
 */
export interface ExtendedMouseEvent extends GenericInputEvent {
  type: 'mouse';
  data: ExtendedMouseData;
}

/**
 * Evento de teclado estendido
 */
export interface ExtendedKeyboardEvent extends GenericInputEvent {
  type: 'keyboard';
  data: ExtendedKeyboardData;
}

/**
 * União de eventos estendidos
 */
export type ExtendedInputEvent = ExtendedMouseEvent | ExtendedKeyboardEvent;