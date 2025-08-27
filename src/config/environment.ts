import { config } from 'dotenv';

config();

export const environment = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  host: process.env.HOST || '0.0.0.0',
  logLevel: process.env.LOG_LEVEL || 'info',
  mouseSpeed: parseInt(process.env.MOUSE_SPEED || '500', 10),
  screenConfidence: parseFloat(process.env.SCREEN_CONFIDENCE || '0.8'),
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  deepseekApiKey: process.env.DEEPSEEK_API_KEY || '',
} as const;

export const isDevelopment = environment.nodeEnv === 'development';
export const isProduction = environment.nodeEnv === 'production';
