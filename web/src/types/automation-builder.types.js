/**
 * Tipos para o componente ActionBuilder
 * Define estruturas de dados para construção de sequências de automação
 */
// Tipos base - incluindo novos dispositivos
export var ActionDevice;
(function (ActionDevice) {
  ActionDevice['WAIT'] = 'wait';
  ActionDevice['CLIPBOARD'] = 'clipboard';
  ActionDevice['SCREEN'] = 'screen';
  ActionDevice['LLM'] = 'llm';
  ActionDevice['OCR'] = 'ocr';
  ActionDevice['MOUSE'] = 'mouse';
  ActionDevice['KEYBOARD'] = 'keyboard';
})(ActionDevice || (ActionDevice = {}));
// Enums de ações disponíveis
export var MouseActionType;
(function (MouseActionType) {
  MouseActionType['MOVE'] = 'move';
  MouseActionType['CLICK'] = 'click';
  MouseActionType['DRAG'] = 'drag';
  MouseActionType['SCROLL'] = 'scroll';
})(MouseActionType || (MouseActionType = {}));
export var KeyboardActionType;
(function (KeyboardActionType) {
  KeyboardActionType['TYPE'] = 'type';
  KeyboardActionType['PRESS'] = 'press';
  KeyboardActionType['COMBINATION'] = 'combination';
})(KeyboardActionType || (KeyboardActionType = {}));
// Novos enums para as ações adicionais
export var ClipboardActionType;
(function (ClipboardActionType) {
  ClipboardActionType['COPY'] = 'copy';
  ClipboardActionType['PASTE'] = 'paste';
  ClipboardActionType['CLEAR'] = 'clear';
})(ClipboardActionType || (ClipboardActionType = {}));
export var ScreenActionType;
(function (ScreenActionType) {
  ScreenActionType['CAPTURE'] = 'capture';
  ScreenActionType['FIND'] = 'find';
  ScreenActionType['WAIT_FOR'] = 'waitFor';
})(ScreenActionType || (ScreenActionType = {}));
export var LlmActionType;
(function (LlmActionType) {
  LlmActionType['COMPLETION'] = 'completion';
})(LlmActionType || (LlmActionType = {}));
export var OcrActionType;
(function (OcrActionType) {
  OcrActionType['EXTRACT_TEXT'] = 'extractText';
})(OcrActionType || (OcrActionType = {}));
// Enums auxiliares
export var MouseButton;
(function (MouseButton) {
  MouseButton['LEFT'] = 'left';
  MouseButton['RIGHT'] = 'right';
  MouseButton['MIDDLE'] = 'middle';
})(MouseButton || (MouseButton = {}));
export var ScrollDirection;
(function (ScrollDirection) {
  ScrollDirection['UP'] = 'up';
  ScrollDirection['DOWN'] = 'down';
})(ScrollDirection || (ScrollDirection = {}));
export var TypingMode;
(function (TypingMode) {
  TypingMode['INSTANT'] = 'instant';
  TypingMode['PER_CHAR'] = 'perChar';
  TypingMode['TOTAL'] = 'total';
})(TypingMode || (TypingMode = {}));
// Constantes de validação
export const KEYBOARD_CONSTRAINTS = {
  MAX_TEXT_LENGTH: 10000,
  MAX_DELAY: 300000, // 5 minutos
  MIN_DELAY: 0,
  MAX_COMBINATION_KEYS: 5,
  MIN_COMBINATION_KEYS: 1,
};
export const MOUSE_CONSTRAINTS = {
  MIN_DURATION: 100,
  MAX_DURATION: 5000,
  DEFAULT_DURATION: 1000,
  MIN_SCROLL_AMOUNT: 1,
  MAX_SCROLL_AMOUNT: 10,
  DEFAULT_SCROLL_AMOUNT: 3,
};
// Novas constantes de validação
export const WAIT_CONSTRAINTS = {
  MIN_MS: 0,
  MAX_MS: 3600000, // 1 hora
  DEFAULT_MS: 1000,
};
export const CLIPBOARD_CONSTRAINTS = {
  MAX_CONTENT_SIZE: 1048576, // 1MB
};
export const SCREEN_CONSTRAINTS = {
  MAX_TEMPLATE_SIZE: 1048576, // 1MB
  MIN_CONFIDENCE: 0.1,
  MAX_CONFIDENCE: 1.0,
  DEFAULT_CONFIDENCE: 0.9,
  MIN_TIMEOUT: 100,
  MAX_TIMEOUT: 60000, // 1 minuto
  DEFAULT_TIMEOUT: 5000,
};
export const LLM_CONSTRAINTS = {
  MIN_PROMPT_LENGTH: 1,
  MAX_PROMPT_LENGTH: 8192,
  MIN_TEMPERATURE: 0,
  MAX_TEMPERATURE: 2,
  DEFAULT_TEMPERATURE: 0.7,
  MIN_MAX_TOKENS: 1,
  MAX_MAX_TOKENS: 4096,
  DEFAULT_MAX_TOKENS: 1000,
};
export const OCR_CONSTRAINTS = {
  MAX_IMAGE_SIZE: 14680064, // 14MB (base64)
  MIN_CONFIDENCE: 0,
  MAX_CONFIDENCE: 100,
  DEFAULT_CONFIDENCE: 0,
};
// Teclas suportadas
export const SUPPORTED_KEYS = {
  NAVIGATION: ['enter', 'tab', 'escape', 'space', 'backspace', 'delete'],
  ARROWS: ['up', 'down', 'left', 'right'],
  PAGE: ['home', 'end', 'pageup', 'pagedown'],
  FUNCTION: Array.from({ length: 12 }, (_, i) => `f${i + 1}`),
  MODIFIERS: ['ctrl', 'control', 'alt', 'shift', 'cmd', 'command', 'meta', 'win'],
  LETTERS: ['a', 'c', 'v', 'x', 'z', 'y'],
};
// Helper para obter todas as teclas válidas
export const getAllSupportedKeys = () => [
  ...SUPPORTED_KEYS.NAVIGATION,
  ...SUPPORTED_KEYS.ARROWS,
  ...SUPPORTED_KEYS.PAGE,
  ...SUPPORTED_KEYS.FUNCTION,
];
export const getAllModifierKeys = () => [...SUPPORTED_KEYS.MODIFIERS];
export const getAllLetterKeys = () => [...SUPPORTED_KEYS.LETTERS];
// Labels para exibição na UI
export const ACTION_DEVICE_LABELS = {
  [ActionDevice.WAIT]: 'Aguardar',
  [ActionDevice.CLIPBOARD]: 'Área de Transferência',
  [ActionDevice.SCREEN]: 'Tela',
  [ActionDevice.LLM]: 'IA/LLM',
  [ActionDevice.OCR]: 'OCR',
  [ActionDevice.MOUSE]: 'Mouse',
  [ActionDevice.KEYBOARD]: 'Teclado',
};
//# sourceMappingURL=automation-builder.types.js.map
