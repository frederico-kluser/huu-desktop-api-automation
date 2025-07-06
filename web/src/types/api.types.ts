/**
 * Tipos para as respostas da API de automação
 */
export interface ScreenCaptureResponse {
  success: boolean;
  data: {
    image: string;
    timestamp: string;
  };
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  error?: string;
}

export type ApiResponse<T> = T | ApiError;
