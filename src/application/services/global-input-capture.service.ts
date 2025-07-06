/**
 * Serviço para capturar eventos globais de mouse e teclado
 * Usa uiohook-napi para monitorar eventos do sistema operacional
 */

import { injectable, inject } from 'tsyringe';
import { EventDispatcher } from './event-dispatcher.service.js';
import { logger } from '../../config/logger.js';

@injectable()
export class GlobalInputCaptureService {
  private uiohook: any = null;
  private isRunning = false;
  private mouseButtonMap = new Map<number, string>([
    [1, 'left'],
    [2, 'right'],
    [3, 'middle'],
  ]);

  constructor(@inject(EventDispatcher) private eventDispatcher: EventDispatcher) {}

  /**
   * Inicia a captura de eventos globais
   */
  async start(): Promise<void> {
    if (this.isRunning) {
      logger.warn('🔍 GlobalInputCaptureService já está em execução');
      return;
    }

    try {
      // Tentar importar uiohook-napi dinamicamente
      const { uIOhook } = await import('uiohook-napi');
      this.uiohook = uIOhook;

      logger.info('📡 Iniciando captura de eventos globais com uiohook-napi');

      // Configurar listeners de eventos
      this.setupEventListeners();

      // Iniciar captura
      if (this.uiohook) {
        this.uiohook.start();
        this.isRunning = true;
        logger.info('🎯 GlobalInputCaptureService iniciado com sucesso');

        // Teste de debug: verificar se eventos estão sendo capturados
        setTimeout(() => {
          logger.info('📊 Verificando captura de eventos após 5 segundos...');
        }, 5000);

        return;
      }
    } catch (error) {
      logger.error('❌ Erro ao carregar uiohook-napi:', error);
    }

    // Se chegou aqui, uiohook-napi não funcionou
    logger.warn('📋 uiohook-napi não disponível, usando fallback com polling');
    this.startMousePolling();
  }

  /**
   * Para a captura de eventos globais
   */
  stop(): void {
    if (!this.isRunning) return;

    try {
      if (this.uiohook) {
        this.uiohook.stop();
      }
      this.isRunning = false;
      logger.info('🛑 GlobalInputCaptureService parado');
    } catch (error) {
      logger.error('❌ Erro ao parar GlobalInputCaptureService:', error);
    }
  }

  /**
   * Configura os listeners de eventos do uiohook
   */
  private setupEventListeners(): void {
    if (!this.uiohook) return;

    logger.info('🔧 Configurando listeners de eventos...');

    // Listener de erro para capturar problemas
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    this.uiohook.on('error', (error: any) => {
      logger.error('❌ Erro no uiohook-napi:', error);
    });

    // Eventos de mouse
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    this.uiohook.on('mousedown', (event: any) => {
      logger.info('🔥 MOUSEDOWN capturado no serviço!', event);
      this.handleMouseEvent('mousedown', event);
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    this.uiohook.on('mouseup', (event: any) => {
      logger.info('🔥 MOUSEUP capturado no serviço!', event);
      this.handleMouseEvent('mouseup', event);
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    this.uiohook.on('mousemove', (event: any) => {
      // Apenas log de alguns eventos de movimento para não spam
      if (Math.random() < 0.1) {
        // 10% dos eventos
        logger.info('🔥 MOUSEMOVE capturado no serviço!', { x: event.x, y: event.y });
      }
      this.handleMouseEvent('move', event);
    });

    // Eventos de teclado
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    this.uiohook.on('keydown', (event: any) => {
      logger.info('🔥 KEYDOWN capturado no serviço!', event);
      this.handleKeyboardEvent('down', event);
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    this.uiohook.on('keyup', (event: any) => {
      logger.info('🔥 KEYUP capturado no serviço!', event);
      this.handleKeyboardEvent('up', event);
    });

    logger.info('✅ Listeners configurados no serviço');
  } /**
   * Processa eventos de mouse
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleMouseEvent(action: string, event: any): void {
    logger.info(`🔍 Recebido evento de mouse: ${action}`, event);

    const button = this.mouseButtonMap.get(event.button || 1) || 'left';
    const x = event.x || 0;
    const y = event.y || 0;

    // Mapear ações para o formato esperado pelo RecorderListenerService
    let mappedAction = action;
    if (action === 'mousedown') mappedAction = 'click';
    if (action === 'mouseup') mappedAction = 'release';

    const eventData = {
      id: '',
      type: 'mouse',
      timestamp: event.timestamp || Date.now(),
      cursorX: x,
      cursorY: y,
      data: {
        action: mappedAction,
        x,
        y,
        button,
      },
    };

    logger.info(`📤 Enviando evento para dispatcher:`, eventData);

    // Emitir evento no formato compatível com o sistema existente
    this.eventDispatcher.dispatch(eventData);

    logger.info(`🖱️ Mouse ${mappedAction}: ${button} em (${x}, ${y})`);
  }

  /**
   * Processa eventos de teclado
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleKeyboardEvent(action: string, event: any): void {
    // Usar keychar se disponível, senão tentar keycode
    let key = '';
    if (event.keychar && event.keychar.length > 0) {
      key = event.keychar;
    } else if (event.keycode) {
      // Mapear alguns códigos especiais
      const specialKeys: Record<number, string> = {
        8: 'Backspace',
        9: 'Tab',
        13: 'Enter',
        16: 'Shift',
        17: 'Ctrl',
        18: 'Alt',
        27: 'Escape',
        32: ' ', // Espaço
        37: 'ArrowLeft',
        38: 'ArrowUp',
        39: 'ArrowRight',
        40: 'ArrowDown',
        46: 'Delete',
      };

      key = specialKeys[event.keycode] || String.fromCharCode(event.keycode);
    } else {
      key = 'Unknown';
    }

    // Emitir evento no formato compatível com o sistema existente
    this.eventDispatcher.dispatch({
      id: '',
      type: 'keyboard',
      timestamp: event.timestamp || Date.now(),
      cursorX: 0,
      cursorY: 0,
      data: {
        action,
        key,
      },
    });

    logger.debug(`⌨️ Teclado ${action}: "${key}" (code: ${event.keycode})`);
  }

  /**
   * Fallback: polling da posição do mouse (sem captura de eventos)
   */
  private startMousePolling(): void {
    logger.info('🔄 Iniciando polling de posição do mouse como fallback');

    // Importar mouse do @nut-tree-fork/nut-js para posição
    import('@nut-tree-fork/nut-js')
      .then(({ mouse }) => {
        let lastX = 0;
        let lastY = 0;

        const pollInterval = setInterval(() => {
          mouse
            .getPosition()
            .then((position) => {
              if (position.x !== lastX || position.y !== lastY) {
                this.eventDispatcher.dispatch({
                  id: '',
                  type: 'mouse',
                  timestamp: Date.now(),
                  cursorX: position.x,
                  cursorY: position.y,
                  data: {
                    action: 'move',
                    x: position.x,
                    y: position.y,
                  },
                });

                lastX = position.x;
                lastY = position.y;
              }
            })
            .catch((error) => {
              logger.error('❌ Erro no polling do mouse:', error);
            });
        }, 100); // Poll a cada 100ms

        // Limpar intervalo ao parar
        const originalStop = this.stop.bind(this);
        this.stop = () => {
          clearInterval(pollInterval);
          originalStop();
        };
      })
      .catch((error) => {
        logger.error('❌ Erro ao iniciar polling do mouse:', error);
      });

    this.isRunning = true;
  }

  /**
   * Retorna se o serviço está em execução
   */
  isActive(): boolean {
    return this.isRunning;
  }
}
