/**
 * Tipos para o componente ActionBuilder
 * Define estruturas de dados para construção de sequências de automação
 */

// Tipos base
export type DeviceType = 'mouse' | 'keyboard';

// Enums de ações disponíveis
export enum MouseActionType {
  MOVE = 'move',
  CLICK = 'click',
  DRAG = 'drag',
  SCROLL = 'scroll',
}

export enum KeyboardActionType {
  TYPE = 'type',
  PRESS = 'press',
  COMBINATION = 'combination',
}

// Enums auxiliares
export enum MouseButton {
  LEFT = 'left',
  RIGHT = 'right',
  MIDDLE = 'middle',
}

export enum ScrollDirection {
  UP = 'up',
  DOWN = 'down',
}

export enum TypingMode {
  INSTANT = 'instant',
  PER_CHAR = 'perChar',
  TOTAL = 'total',
}

// Payloads específicos para cada ação
export interface MouseMovePayload {
  x: number;
  y: number;
  smooth?: boolean;
  duration?: number;
}

export interface MouseClickPayload {
  x?: number;
  y?: number;
  button?: MouseButton;
  doubleClick?: boolean;
  smooth?: boolean;
  duration?: number;
}

export interface MouseDragPayload {
  from: { x: number; y: number };
  to: { x: number; y: number };
  smooth?: boolean;
  duration?: number;
}

export interface MouseScrollPayload {
  direction: ScrollDirection;
  amount?: number;
  smooth?: boolean;
  duration?: number;
}

export interface KeyboardTypePayload {
  text: string;
  mode?: TypingMode;
  value?: number;
}

export interface KeyboardPressPayload {
  key: string;
}

export interface KeyboardCombinationPayload {
  keys: string[];
}

// União de payloads
export type MousePayload =
  | { type: MouseActionType.MOVE; data: MouseMovePayload }
  | { type: MouseActionType.CLICK; data: MouseClickPayload }
  | { type: MouseActionType.DRAG; data: MouseDragPayload }
  | { type: MouseActionType.SCROLL; data: MouseScrollPayload };

export type KeyboardPayload =
  | { type: KeyboardActionType.TYPE; data: KeyboardTypePayload }
  | { type: KeyboardActionType.PRESS; data: KeyboardPressPayload }
  | { type: KeyboardActionType.COMBINATION; data: KeyboardCombinationPayload };

// Interface base para ações
export interface BaseAction {
  id: string;
  device: DeviceType;
  timestamp: number;
}

// Ações tipadas
export interface MouseAction extends BaseAction {
  device: 'mouse';
  payload: MousePayload;
}

export interface KeyboardAction extends BaseAction {
  device: 'keyboard';
  payload: KeyboardPayload;
}

// União de todas as ações
export type AutomationAction = MouseAction | KeyboardAction;

// Constantes de validação
export const KEYBOARD_CONSTRAINTS = {
  MAX_TEXT_LENGTH: 10000,
  MAX_DELAY: 300000, // 5 minutos
  MIN_DELAY: 0,
  MAX_COMBINATION_KEYS: 5,
  MIN_COMBINATION_KEYS: 1,
} as const;

export const MOUSE_CONSTRAINTS = {
  MIN_DURATION: 100,
  MAX_DURATION: 5000,
  DEFAULT_DURATION: 1000,
  MIN_SCROLL_AMOUNT: 1,
  MAX_SCROLL_AMOUNT: 10,
  DEFAULT_SCROLL_AMOUNT: 3,
} as const;

// Teclas suportadas
export const SUPPORTED_KEYS = {
  NAVIGATION: ['enter', 'tab', 'escape', 'space', 'backspace', 'delete'],
  ARROWS: ['up', 'down', 'left', 'right'],
  PAGE: ['home', 'end', 'pageup', 'pagedown'],
  FUNCTION: Array.from({ length: 12 }, (_, i) => `f${i + 1}`),
  MODIFIERS: ['ctrl', 'control', 'alt', 'shift', 'cmd', 'command', 'meta', 'win'],
  LETTERS: ['a', 'c', 'v', 'x', 'z', 'y'],
} as const;

// Helper para obter todas as teclas válidas
export const getAllSupportedKeys = (): string[] => [
  ...SUPPORTED_KEYS.NAVIGATION,
  ...SUPPORTED_KEYS.ARROWS,
  ...SUPPORTED_KEYS.PAGE,
  ...SUPPORTED_KEYS.FUNCTION,
];

export const getAllModifierKeys = (): string[] => [...SUPPORTED_KEYS.MODIFIERS];

export const getAllLetterKeys = (): string[] => [...SUPPORTED_KEYS.LETTERS];

// Props do componente ActionBuilder
export interface ActionBuilderProps {
  onChange?: (_actions: AutomationAction[]) => void;
  initialActions?: AutomationAction[];
  maxActions?: number;
  className?: string;
}

// Estado do formulário
export interface ActionFormState {
  device: DeviceType;
  mouseAction?: MouseActionType;
  keyboardAction?: KeyboardActionType;
  // Estados específicos do mouse
  x?: string;
  y?: string;
  fromX?: string;
  fromY?: string;
  toX?: string;
  toY?: string;
  button?: MouseButton;
  doubleClick?: boolean;
  direction?: ScrollDirection;
  amount?: string;
  smooth?: boolean;
  duration?: string;
  // Estados específicos do teclado
  text?: string;
  mode?: TypingMode;
  delay?: string;
  key?: string;
  keys?: string[];
}

// Reducer actions
export type ActionReducerAction =
  | { type: 'ADD'; payload: AutomationAction }
  | { type: 'REMOVE'; id: string }
  | { type: 'UPDATE'; id: string; payload: AutomationAction }
  | { type: 'CLEAR' }
  | { type: 'SET'; payload: AutomationAction[] };
