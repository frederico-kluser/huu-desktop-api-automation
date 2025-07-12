/**
 * Tipos compartilhados para o sistema de automação
 * Este arquivo é uma cópia dos tipos do frontend para evitar problemas com rootDir do TypeScript
 *
 * NOTA: Este arquivo deve ser mantido em sincronia com web/src/types/automation-builder.types.ts
 */

// Tipos base - incluindo novos dispositivos
export enum ActionDevice {
  WAIT = 'wait',
  CLIPBOARD = 'clipboard',
  SCREEN = 'screen',
  LLM = 'llm',
  OCR = 'ocr',
  MOUSE = 'mouse',
  KEYBOARD = 'keyboard',
}

// Manter compatibilidade
export type DeviceType = ActionDevice;

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

// Novos enums para as ações adicionais
export enum ClipboardActionType {
  COPY = 'copy',
  PASTE = 'paste',
  CLEAR = 'clear',
}

export enum ScreenActionType {
  CAPTURE = 'capture',
  FIND = 'find',
  WAIT_FOR = 'waitFor',
}

export enum LlmActionType {
  COMPLETION = 'completion',
}

export enum OcrActionType {
  EXTRACT_TEXT = 'extractText',
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

// Novos payloads para ações adicionais
export interface WaitPayload {
  ms: number;
}

export interface ClipboardCopyPayload {
  // Copy não precisa de parâmetros, copia o conteúdo selecionado
}

export interface ClipboardPastePayload {
  // Paste não precisa de parâmetros, cola o conteúdo do clipboard
}

export interface ClipboardClearPayload {
  // Clear não precisa de parâmetros
}

export interface ScreenCapturePayload {
  region?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface ScreenFindPayload {
  template: string; // base64 da imagem a procurar
  confidence?: number;
  region?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface ScreenWaitForPayload {
  template: string; // base64 da imagem a aguardar
  timeout?: number;
  confidence?: number;
  region?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface LlmCompletionPayload {
  prompt: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
  outputFormat?: string;
}

export interface OcrExtractTextPayload {
  image: string; // base64 da imagem
  languages?: string[];
  mode?: string;
  confidence?: number;
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

export type ClipboardPayload =
  | { type: ClipboardActionType.COPY; data: ClipboardCopyPayload }
  | { type: ClipboardActionType.PASTE; data: ClipboardPastePayload }
  | { type: ClipboardActionType.CLEAR; data: ClipboardClearPayload };

export type ScreenPayload =
  | { type: ScreenActionType.CAPTURE; data: ScreenCapturePayload }
  | { type: ScreenActionType.FIND; data: ScreenFindPayload }
  | { type: ScreenActionType.WAIT_FOR; data: ScreenWaitForPayload };

export type LlmPayload = { type: LlmActionType.COMPLETION; data: LlmCompletionPayload };

export type OcrPayload = { type: OcrActionType.EXTRACT_TEXT; data: OcrExtractTextPayload };

export type WaitPayloadWrapper = { data: WaitPayload };

// Interface base para ações
export interface BaseAction {
  id: string;
  device: ActionDevice;
  timestamp: number;
}

// Ações tipadas
export interface MouseAction extends BaseAction {
  device: ActionDevice.MOUSE;
  payload: MousePayload;
}

export interface KeyboardAction extends BaseAction {
  device: ActionDevice.KEYBOARD;
  payload: KeyboardPayload;
}

export interface WaitAction extends BaseAction {
  device: ActionDevice.WAIT;
  payload: WaitPayloadWrapper;
}

export interface ClipboardAction extends BaseAction {
  device: ActionDevice.CLIPBOARD;
  payload: ClipboardPayload;
}

export interface ScreenAction extends BaseAction {
  device: ActionDevice.SCREEN;
  payload: ScreenPayload;
}

export interface LlmAction extends BaseAction {
  device: ActionDevice.LLM;
  payload: LlmPayload;
}

export interface OcrAction extends BaseAction {
  device: ActionDevice.OCR;
  payload: OcrPayload;
}

// União de todas as ações
export type AutomationAction =
  | MouseAction
  | KeyboardAction
  | WaitAction
  | ClipboardAction
  | ScreenAction
  | LlmAction
  | OcrAction;

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

// Novas constantes de validação
export const WAIT_CONSTRAINTS = {
  MIN_MS: 0,
  MAX_MS: 3600000, // 1 hora
  DEFAULT_MS: 1000,
} as const;

export const CLIPBOARD_CONSTRAINTS = {
  MAX_CONTENT_SIZE: 1048576, // 1MB
} as const;

export const SCREEN_CONSTRAINTS = {
  MAX_TEMPLATE_SIZE: 1048576, // 1MB
  MIN_CONFIDENCE: 0.1,
  MAX_CONFIDENCE: 1.0,
  DEFAULT_CONFIDENCE: 0.9,
  MIN_TIMEOUT: 100,
  MAX_TIMEOUT: 60000, // 1 minuto
  DEFAULT_TIMEOUT: 5000,
} as const;

export const LLM_CONSTRAINTS = {
  MIN_PROMPT_LENGTH: 1,
  MAX_PROMPT_LENGTH: 8192,
  MIN_TEMPERATURE: 0,
  MAX_TEMPERATURE: 2,
  DEFAULT_TEMPERATURE: 0.7,
  MIN_MAX_TOKENS: 1,
  MAX_MAX_TOKENS: 4096,
  DEFAULT_MAX_TOKENS: 1000,
} as const;

export const OCR_CONSTRAINTS = {
  MAX_IMAGE_SIZE: 14680064, // 14MB (base64)
  MIN_CONFIDENCE: 0,
  MAX_CONFIDENCE: 100,
  DEFAULT_CONFIDENCE: 0,
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

// Labels para exibição na UI
export const ACTION_DEVICE_LABELS: Record<ActionDevice, string> = {
  [ActionDevice.WAIT]: 'Aguardar',
  [ActionDevice.CLIPBOARD]: 'Área de Transferência',
  [ActionDevice.SCREEN]: 'Tela',
  [ActionDevice.LLM]: 'IA/LLM',
  [ActionDevice.OCR]: 'OCR',
  [ActionDevice.MOUSE]: 'Mouse',
  [ActionDevice.KEYBOARD]: 'Teclado',
} as const;

// Props do componente ActionBuilder
export interface ActionBuilderProps {
  onChange?: (_actions: AutomationAction[]) => void;
  initialActions?: AutomationAction[];
  maxActions?: number;
  className?: string;
}

// Estado do formulário
export interface ActionFormState {
  device: ActionDevice;
  mouseAction?: MouseActionType;
  keyboardAction?: KeyboardActionType;
  clipboardAction?: ClipboardActionType;
  screenAction?: ScreenActionType;
  llmAction?: LlmActionType;
  ocrAction?: OcrActionType;
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
  // Estados específicos de wait
  waitMs?: string;
  // Estados específicos de screen
  template?: string;
  confidence?: string;
  timeout?: string;
  regionX?: string;
  regionY?: string;
  regionWidth?: string;
  regionHeight?: string;
  // Estados específicos de LLM
  prompt?: string;
  model?: string;
  temperature?: string;
  maxTokens?: string;
  systemPrompt?: string;
  outputFormat?: string;
  // Estados específicos de OCR
  ocrImage?: string;
  ocrLanguages?: string[];
  ocrMode?: string;
  ocrConfidence?: string;
}

// Reducer actions
export type ActionReducerAction =
  | { type: 'ADD'; payload: AutomationAction }
  | { type: 'REMOVE'; id: string }
  | { type: 'UPDATE'; id: string; payload: AutomationAction }
  | { type: 'CLEAR' }
  | { type: 'SET'; payload: AutomationAction[] };
