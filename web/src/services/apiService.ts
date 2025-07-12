/**
 * Serviço para comunicação com a API de automação
 */
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { AutomationAction } from '../types/automation-builder.types';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}

interface ExecutionResult {
  success: boolean;
  actionId: string;
  device: string;
  error?: string;
  data?: any;
}

interface ExecutionResponse {
  success: boolean;
  results: ExecutionResult[];
}

interface ExecutionOptions {
  stopOnError?: boolean;
  delayBetweenActions?: number;
}

class ApiService {
  private api: AxiosInstance;
  private readonly baseURL = 'http://localhost:3000/api/v1';
  private readonly apiKey = process.env.REACT_APP_API_KEY || 'dev-api-key'; // Configurar conforme necessário

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 30000, // 30 segundos para execução
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
      },
    });

    // Interceptor para logs de requisições
    this.api.interceptors.request.use(
      (config) => {
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
          data: config.data,
          headers: config.headers,
        });
        return config;
      },
      (error) => {
        console.error('❌ API Request Error:', error);
        return Promise.reject(error);
      },
    );

    // Interceptor para logs de respostas
    this.api.interceptors.response.use(
      (response) => {
        console.log(`✅ API Response: ${response.status}`, {
          url: response.config.url,
          data: response.data,
        });
        return response;
      },
      (error) => {
        console.error('❌ API Response Error:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        return Promise.reject(error);
      },
    );
  }

  /**
   * Executa uma sequência de ações de automação
   */
  async executeActions(
    actions: AutomationAction[],
    options: ExecutionOptions = {},
  ): Promise<ExecutionResponse> {
    try {
      console.log('🎯 Iniciando execução de ações:', {
        actionsCount: actions.length,
        actions: actions.map((a) => ({ id: a.id, device: a.device, payload: a.payload })),
        options,
      });

      const response: AxiosResponse<ExecutionResponse> = await this.api.post(
        '/automation/execute',
        {
          actions,
          options: {
            stopOnError: true,
            delayBetweenActions: 500, // 500ms entre ações por padrão
            ...options,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error('💥 Erro na execução de ações:', error);
      throw error;
    }
  }

  /**
   * Testa conectividade com a API
   */
  async testConnection(): Promise<boolean> {
    try {
      console.log('🔗 Testando conexão com a API...');
      const response = await this.api.get('/status');
      console.log('✅ Conexão com API estabelecida:', response.data);
      return response.data.success === true;
    } catch (error) {
      console.error('❌ Falha na conexão com a API:', error);
      return false;
    }
  }

  /**
   * Executa ação individual de mouse
   */
  async executeMouseAction(action: string, payload: any): Promise<ApiResponse> {
    const endpoint = `/mouse/${action}`;
    const response = await this.api.post(endpoint, payload);
    return response.data;
  }

  /**
   * Executa ação individual de teclado
   */
  async executeKeyboardAction(action: string, payload: any): Promise<ApiResponse> {
    const endpoint = `/keyboard/${action}`;
    const response = await this.api.post(endpoint, payload);
    return response.data;
  }

  /**
   * Executa ação individual de tela
   */
  async executeScreenAction(action: string, payload: any): Promise<ApiResponse> {
    const endpoint = `/screen/${action}`;
    const response = await this.api.post(endpoint, payload);
    return response.data;
  }

  /**
   * Executa ação individual de clipboard
   */
  async executeClipboardAction(action: string, payload: any): Promise<ApiResponse> {
    const endpoint = `/clipboard/${action}`;
    const response = await this.api.post(endpoint, payload);
    return response.data;
  }
}

// Exporta instância singleton
export const apiService = new ApiService();
export default apiService;
