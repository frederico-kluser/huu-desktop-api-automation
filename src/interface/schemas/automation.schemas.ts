export const mouseMoveJsonSchema = {
  type: 'object',
  properties: {
    x: { type: 'integer', minimum: 0 },
    y: { type: 'integer', minimum: 0 },
    smooth: { type: 'boolean', default: true },
    duration: { type: 'integer', minimum: 100, maximum: 5000, default: 1000 },
  },
  required: ['x', 'y'],
  additionalProperties: false,
};

export const mouseClickJsonSchema = {
  type: 'object',
  properties: {
    x: { type: 'integer', minimum: 0 },
    y: { type: 'integer', minimum: 0 },
    button: { type: 'string', enum: ['left', 'right', 'middle'], default: 'left' },
    doubleClick: { type: 'boolean', default: false },
  },
  additionalProperties: false,
};

export const mouseDragJsonSchema = {
  type: 'object',
  properties: {
    from: {
      type: 'object',
      properties: {
        x: { type: 'integer', minimum: 0 },
        y: { type: 'integer', minimum: 0 },
      },
      required: ['x', 'y'],
      additionalProperties: false,
    },
    to: {
      type: 'object',
      properties: {
        x: { type: 'integer', minimum: 0 },
        y: { type: 'integer', minimum: 0 },
      },
      required: ['x', 'y'],
      additionalProperties: false,
    },
    duration: { type: 'integer', minimum: 100, maximum: 5000, default: 1000 },
  },
  required: ['from', 'to'],
  additionalProperties: false,
};

export const mouseScrollJsonSchema = {
  type: 'object',
  properties: {
    direction: { type: 'string', enum: ['up', 'down'] },
    amount: { type: 'integer', minimum: 1, maximum: 10, default: 3 },
  },
  required: ['direction'],
  additionalProperties: false,
};

export const screenFindJsonSchema = {
  type: 'object',
  properties: {
    template: { type: 'string', minLength: 1 },
    confidence: { type: 'number', minimum: 0, maximum: 1, default: 0.8 },
    region: {
      type: 'object',
      properties: {
        x: { type: 'integer', minimum: 0 },
        y: { type: 'integer', minimum: 0 },
        width: { type: 'integer', minimum: 1 },
        height: { type: 'integer', minimum: 1 },
      },
      required: ['x', 'y', 'width', 'height'],
      additionalProperties: false,
    },
  },
  required: ['template'],
  additionalProperties: false,
};

export const screenCaptureJsonSchema = {
  type: 'object',
  properties: {
    region: {
      type: 'object',
      properties: {
        x: { type: 'integer', minimum: 0 },
        y: { type: 'integer', minimum: 0 },
        width: { type: 'integer', minimum: 1 },
        height: { type: 'integer', minimum: 1 },
      },
      required: ['x', 'y', 'width', 'height'],
      additionalProperties: false,
    },
    format: { type: 'string', enum: ['png', 'jpg'], default: 'png' },
  },
  additionalProperties: false,
};