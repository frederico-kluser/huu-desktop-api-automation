/**
 * Schemas de validação para o ActionBuilder
 * Utilizando Zod para garantir integridade dos dados
 */

import { z } from 'zod';
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
  KEYBOARD_CONSTRAINTS,
  MOUSE_CONSTRAINTS,
  WAIT_CONSTRAINTS,
  SCREEN_CONSTRAINTS,
  LLM_CONSTRAINTS,
  OCR_CONSTRAINTS,
} from '../types/automation-builder.types.js';

// Schema para ação de wait
export const waitActionSchema = z.object({
  ms: z
    .number()
    .min(WAIT_CONSTRAINTS.MIN_MS, `Tempo mínimo é ${WAIT_CONSTRAINTS.MIN_MS}ms`)
    .max(WAIT_CONSTRAINTS.MAX_MS, `Tempo máximo é ${WAIT_CONSTRAINTS.MAX_MS}ms`),
});

// Schemas para clipboard
export const clipboardCopySchema = z.object({});
export const clipboardPasteSchema = z.object({});
export const clipboardClearSchema = z.object({});

export const clipboardActionSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal(ClipboardActionType.COPY),
    data: clipboardCopySchema,
  }),
  z.object({
    type: z.literal(ClipboardActionType.PASTE),
    data: clipboardPasteSchema,
  }),
  z.object({
    type: z.literal(ClipboardActionType.CLEAR),
    data: clipboardClearSchema,
  }),
]);

// Schema para região (usado em screen)
const regionSchema = z.object({
  x: z.number().min(0),
  y: z.number().min(0),
  width: z.number().min(1),
  height: z.number().min(1),
});

// Schemas para screen
export const screenCaptureSchema = z.object({
  region: regionSchema.optional(),
});

export const screenFindSchema = z.object({
  template: z.string().min(1, 'Template é obrigatório'),
  confidence: z
    .number()
    .min(SCREEN_CONSTRAINTS.MIN_CONFIDENCE)
    .max(SCREEN_CONSTRAINTS.MAX_CONFIDENCE)
    .default(SCREEN_CONSTRAINTS.DEFAULT_CONFIDENCE),
  region: regionSchema.optional(),
});

export const screenWaitForSchema = z.object({
  template: z.string().min(1, 'Template é obrigatório'),
  timeout: z
    .number()
    .min(SCREEN_CONSTRAINTS.MIN_TIMEOUT)
    .max(SCREEN_CONSTRAINTS.MAX_TIMEOUT)
    .default(SCREEN_CONSTRAINTS.DEFAULT_TIMEOUT),
  confidence: z
    .number()
    .min(SCREEN_CONSTRAINTS.MIN_CONFIDENCE)
    .max(SCREEN_CONSTRAINTS.MAX_CONFIDENCE)
    .default(SCREEN_CONSTRAINTS.DEFAULT_CONFIDENCE),
  region: regionSchema.optional(),
});

export const screenActionSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal(ScreenActionType.CAPTURE),
    data: screenCaptureSchema,
  }),
  z.object({
    type: z.literal(ScreenActionType.FIND),
    data: screenFindSchema,
  }),
  z.object({
    type: z.literal(ScreenActionType.WAIT_FOR),
    data: screenWaitForSchema,
  }),
]);

// Schema para LLM
export const llmCompletionSchema = z.object({
  prompt: z
    .string()
    .min(LLM_CONSTRAINTS.MIN_PROMPT_LENGTH, 'Prompt é obrigatório')
    .max(
      LLM_CONSTRAINTS.MAX_PROMPT_LENGTH,
      `Prompt muito longo (máx: ${LLM_CONSTRAINTS.MAX_PROMPT_LENGTH})`,
    ),
  model: z.string().optional(),
  temperature: z
    .number()
    .min(LLM_CONSTRAINTS.MIN_TEMPERATURE)
    .max(LLM_CONSTRAINTS.MAX_TEMPERATURE)
    .default(LLM_CONSTRAINTS.DEFAULT_TEMPERATURE),
  maxTokens: z
    .number()
    .min(LLM_CONSTRAINTS.MIN_MAX_TOKENS)
    .max(LLM_CONSTRAINTS.MAX_MAX_TOKENS)
    .default(LLM_CONSTRAINTS.DEFAULT_MAX_TOKENS),
  systemPrompt: z.string().optional(),
  outputFormat: z.string().optional(),
});

export const llmActionSchema = z.object({
  type: z.literal(LlmActionType.COMPLETION),
  data: llmCompletionSchema,
});

// Schema para OCR
export const ocrExtractTextSchema = z.object({
  image: z
    .string()
    .min(1, 'Imagem é obrigatória')
    .refine(
      (val) => {
        // Validar formato base64
        const base64Regex = /^data:image\/(png|jpeg|jpg|gif|bmp);base64,/;
        return base64Regex.test(val);
      },
      { message: 'Imagem deve estar em formato base64 válido' },
    )
    .refine(
      (val) => {
        // Verificar tamanho aproximado
        const base64Length = val.split(',')[1]?.length || 0;
        const sizeInBytes = (base64Length * 3) / 4;
        return sizeInBytes <= OCR_CONSTRAINTS.MAX_IMAGE_SIZE;
      },
      { message: `Imagem muito grande (máx: ${OCR_CONSTRAINTS.MAX_IMAGE_SIZE / 1024 / 1024}MB)` },
    ),
  languages: z.array(z.string()).optional(),
  mode: z.string().optional(),
  confidence: z
    .number()
    .min(OCR_CONSTRAINTS.MIN_CONFIDENCE)
    .max(OCR_CONSTRAINTS.MAX_CONFIDENCE)
    .default(OCR_CONSTRAINTS.DEFAULT_CONFIDENCE),
});

export const ocrActionSchema = z.object({
  type: z.literal(OcrActionType.EXTRACT_TEXT),
  data: ocrExtractTextSchema,
});

// Schemas existentes do mouse (mantidos para compatibilidade)
export const mouseMoveSchema = z.object({
  x: z.number().min(0),
  y: z.number().min(0),
  smooth: z.boolean().default(true),
  duration: z
    .number()
    .min(MOUSE_CONSTRAINTS.MIN_DURATION)
    .max(MOUSE_CONSTRAINTS.MAX_DURATION)
    .default(MOUSE_CONSTRAINTS.DEFAULT_DURATION),
});

export const mouseClickSchema = z.object({
  x: z.number().min(0).optional(),
  y: z.number().min(0).optional(),
  button: z.nativeEnum(MouseButton).default(MouseButton.LEFT),
  doubleClick: z.boolean().default(false),
  smooth: z.boolean().default(true),
  duration: z
    .number()
    .min(MOUSE_CONSTRAINTS.MIN_DURATION)
    .max(MOUSE_CONSTRAINTS.MAX_DURATION)
    .default(MOUSE_CONSTRAINTS.DEFAULT_DURATION),
});

export const mouseDragSchema = z.object({
  from: z.object({
    x: z.number().min(0),
    y: z.number().min(0),
  }),
  to: z.object({
    x: z.number().min(0),
    y: z.number().min(0),
  }),
  smooth: z.boolean().default(true),
  duration: z
    .number()
    .min(MOUSE_CONSTRAINTS.MIN_DURATION)
    .max(MOUSE_CONSTRAINTS.MAX_DURATION)
    .default(MOUSE_CONSTRAINTS.DEFAULT_DURATION),
});

export const mouseScrollSchema = z.object({
  direction: z.nativeEnum(ScrollDirection),
  amount: z
    .number()
    .min(MOUSE_CONSTRAINTS.MIN_SCROLL_AMOUNT)
    .max(MOUSE_CONSTRAINTS.MAX_SCROLL_AMOUNT)
    .default(MOUSE_CONSTRAINTS.DEFAULT_SCROLL_AMOUNT),
  smooth: z.boolean().default(true),
  duration: z
    .number()
    .min(MOUSE_CONSTRAINTS.MIN_DURATION)
    .max(MOUSE_CONSTRAINTS.MAX_DURATION)
    .default(MOUSE_CONSTRAINTS.DEFAULT_DURATION),
});

export const mouseActionSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal(MouseActionType.MOVE),
    data: mouseMoveSchema,
  }),
  z.object({
    type: z.literal(MouseActionType.CLICK),
    data: mouseClickSchema,
  }),
  z.object({
    type: z.literal(MouseActionType.DRAG),
    data: mouseDragSchema,
  }),
  z.object({
    type: z.literal(MouseActionType.SCROLL),
    data: mouseScrollSchema,
  }),
]);

// Schemas existentes do teclado
export const keyboardTypeSchema = z.object({
  text: z
    .string()
    .min(1, 'Texto é obrigatório')
    .max(
      KEYBOARD_CONSTRAINTS.MAX_TEXT_LENGTH,
      `Texto muito longo (máx: ${KEYBOARD_CONSTRAINTS.MAX_TEXT_LENGTH})`,
    ),
  mode: z.nativeEnum(TypingMode).default(TypingMode.INSTANT),
  value: z
    .number()
    .min(KEYBOARD_CONSTRAINTS.MIN_DELAY)
    .max(KEYBOARD_CONSTRAINTS.MAX_DELAY)
    .optional(),
});

export const keyboardPressSchema = z.object({
  key: z.string().min(1, 'Tecla é obrigatória'),
});

export const keyboardCombinationSchema = z.object({
  keys: z
    .array(z.string())
    .min(KEYBOARD_CONSTRAINTS.MIN_COMBINATION_KEYS, 'Pelo menos uma tecla é necessária')
    .max(
      KEYBOARD_CONSTRAINTS.MAX_COMBINATION_KEYS,
      `Máximo de ${KEYBOARD_CONSTRAINTS.MAX_COMBINATION_KEYS} teclas`,
    ),
});

export const keyboardActionSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal(KeyboardActionType.TYPE),
    data: keyboardTypeSchema,
  }),
  z.object({
    type: z.literal(KeyboardActionType.PRESS),
    data: keyboardPressSchema,
  }),
  z.object({
    type: z.literal(KeyboardActionType.COMBINATION),
    data: keyboardCombinationSchema,
  }),
]);

// Schema principal para validar ações completas
export const automationActionSchema = z.discriminatedUnion('device', [
  z.object({
    id: z.string(),
    device: z.literal(ActionDevice.WAIT),
    timestamp: z.number(),
    payload: z.object({
      data: waitActionSchema,
    }),
  }),
  z.object({
    id: z.string(),
    device: z.literal(ActionDevice.CLIPBOARD),
    timestamp: z.number(),
    payload: clipboardActionSchema,
  }),
  z.object({
    id: z.string(),
    device: z.literal(ActionDevice.SCREEN),
    timestamp: z.number(),
    payload: screenActionSchema,
  }),
  z.object({
    id: z.string(),
    device: z.literal(ActionDevice.LLM),
    timestamp: z.number(),
    payload: llmActionSchema,
  }),
  z.object({
    id: z.string(),
    device: z.literal(ActionDevice.OCR),
    timestamp: z.number(),
    payload: ocrActionSchema,
  }),
  z.object({
    id: z.string(),
    device: z.literal(ActionDevice.MOUSE),
    timestamp: z.number(),
    payload: mouseActionSchema,
  }),
  z.object({
    id: z.string(),
    device: z.literal(ActionDevice.KEYBOARD),
    timestamp: z.number(),
    payload: keyboardActionSchema,
  }),
]);
