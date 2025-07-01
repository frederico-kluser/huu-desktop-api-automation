/**
 * Configuração padrão para operações do mouse
 */
export const MouseDefaults = {
  /** Duração mínima permitida para ações do mouse em ms */
  minDuration: parseInt(process.env.MOUSE_MIN_DUR || '100', 10),
  
  /** Duração máxima permitida para ações do mouse em ms */
  maxDuration: parseInt(process.env.MOUSE_MAX_DUR || '5000', 10),
  
  /** Valor padrão para movimento suave */
  defaultSmooth: process.env.MOUSE_DEFAULT_SMOOTH === 'true' || false,
  
  /** Taxa de amostragem para interpolação suave (fps) */
  sampleRate: parseInt(process.env.MOUSE_SAMPLE_RATE || '30', 10),
  
  /** Intervalo padrão em ms para streaming de posição */
  streamInterval: parseInt(process.env.MOUSE_STREAM_INTERVAL || '100', 10),
  
  /** Duração padrão para movimentos em ms */
  defaultDuration: parseInt(process.env.MOUSE_DEFAULT_DURATION || '1000', 10),
} as const;

export type MouseConfig = typeof MouseDefaults;