import { z } from 'zod';

export const pointSchema = z.object({
  x: z.number().int().min(0),
  y: z.number().int().min(0),
});

export const mouseMoveSchema = z.object({
  x: z.number().int().min(0),
  y: z.number().int().min(0),
  smooth: z.boolean().optional().default(true),
  duration: z.number().int().min(100).max(5000).optional().default(1000),
});

export const mouseClickSchema = z.object({
  x: z.number().int().min(0).optional(),
  y: z.number().int().min(0).optional(),
  button: z.enum(['left', 'right', 'middle']).optional().default('left'),
  doubleClick: z.boolean().optional().default(false),
  smooth: z.boolean().optional().default(true),
  duration: z.number().int().min(100).max(5000).optional().default(1000),
});

export const mouseDragSchema = z.object({
  from: pointSchema,
  to: pointSchema,
  duration: z.number().int().min(100).max(5000).optional().default(1000),
  smooth: z.boolean().optional().default(true),
});

export const mouseScrollSchema = z.object({
  direction: z.enum(['up', 'down']),
  amount: z.number().int().min(1).max(10).default(3),
  smooth: z.boolean().optional().default(true),
  duration: z.number().int().min(100).max(5000).optional().default(1000),
});

export const screenFindSchema = z.object({
  template: z.string().min(1),
  confidence: z.number().min(0).max(1).optional().default(0.8),
  region: z
    .object({
      x: z.number().int().min(0),
      y: z.number().int().min(0),
      width: z.number().int().min(1),
      height: z.number().int().min(1),
    })
    .optional(),
});

export const screenCaptureSchema = z.object({
  region: z
    .object({
      x: z.number().int().min(0),
      y: z.number().int().min(0),
      width: z.number().int().min(1),
      height: z.number().int().min(1),
    })
    .optional(),
  format: z.enum(['png', 'jpg']).optional().default('png'),
});

export type MouseMoveRequest = z.infer<typeof mouseMoveSchema>;
export type MouseClickRequest = z.infer<typeof mouseClickSchema>;
export type MouseDragRequest = z.infer<typeof mouseDragSchema>;
export type MouseScrollRequest = z.infer<typeof mouseScrollSchema>;
export type ScreenFindRequest = z.infer<typeof screenFindSchema>;
export type ScreenCaptureRequest = z.infer<typeof screenCaptureSchema>;
