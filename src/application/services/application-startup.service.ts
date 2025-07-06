/**
 * Serviço de inicialização para configurar sistemas de captura de eventos
 * Inicia o GlobalInputCaptureService na inicialização da aplicação
 */

import { injectable, inject } from 'tsyringe';
import { GlobalInputCaptureService } from './global-input-capture.service.js';
import { logger } from '../../config/logger.js';

@injectable()
export class ApplicationStartupService {
  constructor(
    @inject(GlobalInputCaptureService) private globalInputCapture: GlobalInputCaptureService,
  ) {}

  /**
   * Inicia todos os serviços necessários para a aplicação
   */
  async initialize(): Promise<void> {
    logger.info('🚀 Iniciando serviços da aplicação...');

    try {
      // Iniciar captura de eventos globais
      await this.globalInputCapture.start();

      logger.info('✅ Aplicação inicializada com sucesso');
    } catch (error) {
      logger.error('❌ Erro ao inicializar aplicação:', error);
      throw error;
    }
  }

  /**
   * Para todos os serviços da aplicação
   */
  shutdown(): void {
    logger.info('🔄 Parando serviços da aplicação...');

    try {
      // Parar captura de eventos globais
      this.globalInputCapture.stop();

      logger.info('✅ Aplicação finalizada com sucesso');
    } catch (error) {
      logger.error('❌ Erro ao finalizar aplicação:', error);
      throw error;
    }
  }
}
