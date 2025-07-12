/**
 * Tipos para o componente ActionBuilder
 * Define estruturas de dados para construção de sequências de automação
 */
export declare enum ActionDevice {
  WAIT = 'wait',
  CLIPBOARD = 'clipboard',
  SCREEN = 'screen',
  LLM = 'llm',
  OCR = 'ocr',
  MOUSE = 'mouse',
  KEYBOARD = 'keyboard',
}
export type DeviceType = ActionDevice;
export declare enum MouseActionType {
  MOVE = 'move',
  CLICK = 'click',
  DRAG = 'drag',
  SCROLL = 'scroll',
}
export declare enum KeyboardActionType {
  TYPE = 'type',
  PRESS = 'press',
  COMBINATION = 'combination',
}
export declare enum ClipboardActionType {
  COPY = 'copy',
  PASTE = 'paste',
  CLEAR = 'clear',
}
export declare enum ScreenActionType {
  CAPTURE = 'capture',
  FIND = 'find',
  WAIT_FOR = 'waitFor',
}
export declare enum LlmActionType {
  COMPLETION = 'completion',
}
export declare enum OcrActionType {
  EXTRACT_TEXT = 'extractText',
}
export declare enum MouseButton {
  LEFT = 'left',
  RIGHT = 'right',
  MIDDLE = 'middle',
}
export declare enum ScrollDirection {
  UP = 'up',
  DOWN = 'down',
}
export declare enum TypingMode {
  INSTANT = 'instant',
  PER_CHAR = 'perChar',
  TOTAL = 'total',
}
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
  from: {
    x: number;
    y: number;
  };
  to: {
    x: number;
    y: number;
  };
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
export interface WaitPayload {
  ms: number;
}
export interface ClipboardCopyPayload {}
export interface ClipboardPastePayload {}
export interface ClipboardClearPayload {}
export interface ScreenCapturePayload {
  region?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}
export interface ScreenFindPayload {
  template: string;
  confidence?: number;
  region?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}
export interface ScreenWaitForPayload {
  template: string;
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
  image: string;
  languages?: string[];
  mode?: string;
  confidence?: number;
}
export type MousePayload =
  | {
      type: MouseActionType.MOVE;
      data: MouseMovePayload;
    }
  | {
      type: MouseActionType.CLICK;
      data: MouseClickPayload;
    }
  | {
      type: MouseActionType.DRAG;
      data: MouseDragPayload;
    }
  | {
      type: MouseActionType.SCROLL;
      data: MouseScrollPayload;
    };
export type KeyboardPayload =
  | {
      type: KeyboardActionType.TYPE;
      data: KeyboardTypePayload;
    }
  | {
      type: KeyboardActionType.PRESS;
      data: KeyboardPressPayload;
    }
  | {
      type: KeyboardActionType.COMBINATION;
      data: KeyboardCombinationPayload;
    };
export type ClipboardPayload =
  | {
      type: ClipboardActionType.COPY;
      data: ClipboardCopyPayload;
    }
  | {
      type: ClipboardActionType.PASTE;
      data: ClipboardPastePayload;
    }
  | {
      type: ClipboardActionType.CLEAR;
      data: ClipboardClearPayload;
    };
export type ScreenPayload =
  | {
      type: ScreenActionType.CAPTURE;
      data: ScreenCapturePayload;
    }
  | {
      type: ScreenActionType.FIND;
      data: ScreenFindPayload;
    }
  | {
      type: ScreenActionType.WAIT_FOR;
      data: ScreenWaitForPayload;
    };
export type LlmPayload = {
  type: LlmActionType.COMPLETION;
  data: LlmCompletionPayload;
};
export type OcrPayload = {
  type: OcrActionType.EXTRACT_TEXT;
  data: OcrExtractTextPayload;
};
export type WaitPayloadWrapper = {
  data: WaitPayload;
};
export interface BaseAction {
  id: string;
  device: ActionDevice;
  timestamp: number;
}
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
export type AutomationAction =
  | MouseAction
  | KeyboardAction
  | WaitAction
  | ClipboardAction
  | ScreenAction
  | LlmAction
  | OcrAction;
export declare const KEYBOARD_CONSTRAINTS: {
  readonly MAX_TEXT_LENGTH: 10000;
  readonly MAX_DELAY: 300000;
  readonly MIN_DELAY: 0;
  readonly MAX_COMBINATION_KEYS: 5;
  readonly MIN_COMBINATION_KEYS: 1;
};
export declare const MOUSE_CONSTRAINTS: {
  readonly MIN_DURATION: 100;
  readonly MAX_DURATION: 5000;
  readonly DEFAULT_DURATION: 1000;
  readonly MIN_SCROLL_AMOUNT: 1;
  readonly MAX_SCROLL_AMOUNT: 10;
  readonly DEFAULT_SCROLL_AMOUNT: 3;
};
export declare const WAIT_CONSTRAINTS: {
  readonly MIN_MS: 0;
  readonly MAX_MS: 3600000;
  readonly DEFAULT_MS: 1000;
};
export declare const CLIPBOARD_CONSTRAINTS: {
  readonly MAX_CONTENT_SIZE: 1048576;
};
export declare const SCREEN_CONSTRAINTS: {
  readonly MAX_TEMPLATE_SIZE: 1048576;
  readonly MIN_CONFIDENCE: 0.1;
  readonly MAX_CONFIDENCE: 1;
  readonly DEFAULT_CONFIDENCE: 0.9;
  readonly MIN_TIMEOUT: 100;
  readonly MAX_TIMEOUT: 60000;
  readonly DEFAULT_TIMEOUT: 5000;
};
export declare const LLM_CONSTRAINTS: {
  readonly MIN_PROMPT_LENGTH: 1;
  readonly MAX_PROMPT_LENGTH: 8192;
  readonly MIN_TEMPERATURE: 0;
  readonly MAX_TEMPERATURE: 2;
  readonly DEFAULT_TEMPERATURE: 0.7;
  readonly MIN_MAX_TOKENS: 1;
  readonly MAX_MAX_TOKENS: 4096;
  readonly DEFAULT_MAX_TOKENS: 1000;
};
export declare const OCR_CONSTRAINTS: {
  readonly MAX_IMAGE_SIZE: 14680064;
  readonly MIN_CONFIDENCE: 0;
  readonly MAX_CONFIDENCE: 100;
  readonly DEFAULT_CONFIDENCE: 0;
};
export declare const SUPPORTED_KEYS: {
  readonly NAVIGATION: readonly ['enter', 'tab', 'escape', 'space', 'backspace', 'delete'];
  readonly ARROWS: readonly ['up', 'down', 'left', 'right'];
  readonly PAGE: readonly ['home', 'end', 'pageup', 'pagedown'];
  readonly FUNCTION: string[];
  readonly MODIFIERS: readonly ['ctrl', 'control', 'alt', 'shift', 'cmd', 'command', 'meta', 'win'];
  readonly LETTERS: readonly ['a', 'c', 'v', 'x', 'z', 'y'];
};
export declare const getAllSupportedKeys: () => string[];
export declare const getAllModifierKeys: () => string[];
export declare const getAllLetterKeys: () => string[];
export declare const ACTION_DEVICE_LABELS: Record<ActionDevice, string>;
export interface ActionBuilderProps {
  onChange?: (_actions: AutomationAction[]) => void;
  initialActions?: AutomationAction[];
  maxActions?: number;
  className?: string;
}
export interface ActionFormState {
  device: ActionDevice;
  mouseAction?: MouseActionType;
  keyboardAction?: KeyboardActionType;
  clipboardAction?: ClipboardActionType;
  screenAction?: ScreenActionType;
  llmAction?: LlmActionType;
  ocrAction?: OcrActionType;
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
  text?: string;
  mode?: TypingMode;
  delay?: string;
  key?: string;
  keys?: string[];
  waitMs?: string;
  template?: string;
  confidence?: string;
  timeout?: string;
  regionX?: string;
  regionY?: string;
  regionWidth?: string;
  regionHeight?: string;
  prompt?: string;
  model?: string;
  temperature?: string;
  maxTokens?: string;
  systemPrompt?: string;
  outputFormat?: string;
  ocrImage?: string;
  ocrLanguages?: string[];
  ocrMode?: string;
  ocrConfidence?: string;
}
export type ActionReducerAction =
  | {
      type: 'ADD';
      payload: AutomationAction;
    }
  | {
      type: 'REMOVE';
      id: string;
    }
  | {
      type: 'UPDATE';
      id: string;
      payload: AutomationAction;
    }
  | {
      type: 'CLEAR';
    }
  | {
      type: 'SET';
      payload: AutomationAction[];
    };
