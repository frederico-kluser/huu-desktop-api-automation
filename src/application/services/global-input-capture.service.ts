/**
 * Serviço de captura global de eventos de mouse e teclado
 * Captura eventos do sistema operacional em tempo real usando múltiplas bibliotecas
 * para máxima compatibilidade no macOS
 */

import { injectable, inject } from 'tsyringe';
import { EventDispatcher } from './event-dispatcher.service.js';
import { logger } from '../../config/logger.js';
import type { MouseButton } from '../../types/input-event.types.js';

/**
 * Interface para eventos do uiohook
 */
interface UIOHookEvent {
  type: number;
  time: number;
  x: number;
  y: number;
  button?: number;
  keycode?: number;
  keychar?: string;
}

/**
 * Interface para o uiohook
 */
interface UIOHook {
  start(): void;
  stop(): void;
  on(
    event: 'mousedown' | 'mouseup' | 'mousemove' | 'mousedrag' | 'keydown' | 'keyup' | 'input',
    callback: (event: UIOHookEvent) => void,
  ): void;
  on(event: 'error', callback: (error: Error) => void): void;
}

/**
 * Interface para o GlobalKeyboardListener
 */
interface GlobalKeyboardListener {
  addListener(callback: (e: any, down: any) => void): void;
  kill(): void;
}

@injectable()
export class GlobalInputCaptureService {
  private isRunning = false;
  private uiohook: UIOHook | null = null;
  private keyboardListener: GlobalKeyboardListener | null = null;
  private eventCount = 0;
  private readonly maxEventsPerSecond = 1000;
  private eventTimes: number[] = [];
  private lastMousePosition = { x: 0, y: 0 };
  private mousePositionInterval: NodeJS.Timeout | null = null;

  constructor(@inject(EventDispatcher) private eventDispatcher: EventDispatcher) {}

  /**
   * Inicia a captura global de eventos
   */
  async start(): Promise<void> {
    if (this.isRunning) {
      logger.warn('🔄 GlobalInputCaptureService já está rodando');
      return;
    }

    try {
      logger.info('🎯 Iniciando captura global de eventos...');

      // Importar dinamicamente o uiohook-napi
      const { uIOhook } = await import('uiohook-napi');
      this.uiohook = uIOhook as unknown as UIOHook;

      // Configurar listeners para eventos de mouse
      this.setupMouseListeners();

      // Configurar listeners para eventos de teclado
      this.setupKeyboardListeners();

      // Configurar tratamento de erros
      this.setupErrorHandling();

      // Iniciar captura
      this.uiohook.start();
      this.isRunning = true;

      logger.info('✅ Captura global iniciada com sucesso');
    } catch (error) {
      logger.error('❌ Erro ao iniciar captura global:', error);
      throw error;
    }
  }

  /**
   * Para a captura global de eventos
   */
  stop(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.isRunning || !this.uiohook) {
        logger.warn('⚠️ GlobalInputCaptureService não está rodando');
        resolve();
        return;
      }

      try {
        logger.info('🛑 Parando captura global...');

        this.uiohook.stop();
        this.isRunning = false;
        this.uiohook = null;

        logger.info('✅ Captura global parada com sucesso');
        resolve();
      } catch (error) {
        logger.error('❌ Erro ao parar captura global:', error);
        resolve();
      }
    });
  }

  /**
   * Configura listeners para eventos de mouse
   */
  private setupMouseListeners(): void {
    if (!this.uiohook) return;

    // Mouse down - início do clique
    this.uiohook.on('mousedown', (event: UIOHookEvent) => {
      if (!this.shouldProcessEvent()) return;

      const button = this.mapMouseButton(event.button || 0);
      if (button) {
        logger.debug(`🖱️ Mouse down: ${button} em (${event.x}, ${event.y})`);

        // Emitir evento de mouse down
        this.eventDispatcher.dispatch({
          id: '',
          type: 'mouse',
          timestamp: Date.now(),
          cursorX: event.x,
          cursorY: event.y,
          data: {
            action: 'click',
            x: event.x,
            y: event.y,
            button,
          },
        });
      }
    });

    // Mouse up - fim do clique
    this.uiohook.on('mouseup', (event: UIOHookEvent) => {
      if (!this.shouldProcessEvent()) return;

      const button = this.mapMouseButton(event.button || 0);
      if (button) {
        logger.debug(`🖱️ Mouse up: ${button} em (${event.x}, ${event.y})`);

        // Emitir evento de mouse up
        this.eventDispatcher.dispatch({
          id: '',
          type: 'mouse',
          timestamp: Date.now(),
          cursorX: event.x,
          cursorY: event.y,
          data: {
            action: 'release',
            x: event.x,
            y: event.y,
            button,
          },
        });
      }
    });

    // Mouse move - movimento do mouse
    this.uiohook.on('mousemove', (event: UIOHookEvent) => {
      if (!this.shouldProcessEvent()) return;

      // Throttle mouse move events (a cada 50ms)
      if (this.eventCount % 20 === 0) {
        logger.debug(`🖱️ Mouse move: (${event.x}, ${event.y})`);

        // Emitir evento de mouse move
        this.eventDispatcher.dispatch({
          id: '',
          type: 'mouse',
          timestamp: Date.now(),
          cursorX: event.x,
          cursorY: event.y,
          data: {
            action: 'move',
            x: event.x,
            y: event.y,
          },
        });
      }
    });

    // Mouse drag - arrastar (combinação de move + botão pressionado)
    this.uiohook.on('mousedrag', (event: UIOHookEvent) => {
      if (!this.shouldProcessEvent()) return;

      const button = this.mapMouseButton(event.button || 0);
      if (button) {
        logger.debug(`🖱️ Mouse drag: ${button} em (${event.x}, ${event.y})`);

        // Emitir evento de mouse drag
        this.eventDispatcher.dispatch({
          id: '',
          type: 'mouse',
          timestamp: Date.now(),
          cursorX: event.x,
          cursorY: event.y,
          data: {
            action: 'move',
            x: event.x,
            y: event.y,
            button,
          },
        });
      }
    });
  }

  /**
   * Configura listeners para eventos de teclado
   */
  private setupKeyboardListeners(): void {
    if (!this.uiohook) return;

    // Key down - tecla pressionada
    this.uiohook.on('keydown', (event: UIOHookEvent) => {
      if (!this.shouldProcessEvent()) return;

      const key = this.mapKeyCode(event.keycode || 0);
      if (key) {
        logger.debug(`⌨️ Key down: "${key}" (${event.keycode})`);

        // Emitir evento de key down
        this.eventDispatcher.dispatch({
          id: '',
          type: 'keyboard',
          timestamp: Date.now(),
          cursorX: 0,
          cursorY: 0,
          data: {
            key,
            action: 'down',
          },
        });
      }
    });

    // Key up - tecla solta
    this.uiohook.on('keyup', (event: UIOHookEvent) => {
      if (!this.shouldProcessEvent()) return;

      const key = this.mapKeyCode(event.keycode || 0);
      if (key) {
        logger.debug(`⌨️ Key up: "${key}" (${event.keycode})`);

        // Emitir evento de key up
        this.eventDispatcher.dispatch({
          id: '',
          type: 'keyboard',
          timestamp: Date.now(),
          cursorX: 0,
          cursorY: 0,
          data: {
            key,
            action: 'up',
          },
        });
      }
    });
  }

  /**
   * Configura tratamento de erros
   */
  private setupErrorHandling(): void {
    if (!this.uiohook) return;

    this.uiohook.on('error', (error: Error) => {
      logger.error('🔥 Erro no uiohook:', error);
    });

    this.uiohook.on('input', (event: UIOHookEvent) => {
      logger.debug('📥 Evento de input genérico:', event);
    });
  }

  /**
   * Mapeia códigos de botão do mouse do uiohook para nossos tipos
   */
  private mapMouseButton(button: number): MouseButton | null {
    switch (button) {
      case 1:
        return 'left';
      case 2:
        return 'right';
      case 3:
        return 'middle';
      default:
        return null;
    }
  }

  /**
   * Mapeia códigos de tecla do uiohook para strings legíveis
   */
  private mapKeyCode(keycode: number): string | null {
    // Mapeamento básico de keycodes comuns
    const keyMap: Record<number, string> = {
      // Letras
      30: 'a',
      48: 'b',
      46: 'c',
      32: 'd',
      18: 'e',
      33: 'f',
      34: 'g',
      35: 'h',
      23: 'i',
      36: 'j',
      37: 'k',
      38: 'l',
      50: 'm',
      49: 'n',
      24: 'o',
      25: 'p',
      16: 'q',
      19: 'r',
      31: 's',
      20: 't',
      22: 'u',
      47: 'v',
      17: 'w',
      45: 'x',
      21: 'y',
      44: 'z',

      // Números
      11: '0',
      2: '1',
      3: '2',
      4: '3',
      5: '4',
      6: '5',
      7: '6',
      8: '7',
      9: '8',
      10: '9',

      // Teclas especiais
      1: 'Escape',
      15: 'Tab',
      28: 'Enter',
      29: 'Ctrl',
      42: 'Shift',
      56: 'Alt',
      57: 'Space',
      14: 'Backspace',
      211: 'Delete',

      // Setas
      200: 'ArrowUp',
      208: 'ArrowDown',
      203: 'ArrowLeft',
      205: 'ArrowRight',

      // Função
      59: 'F1',
      60: 'F2',
      61: 'F3',
      62: 'F4',
      63: 'F5',
      64: 'F6',
      65: 'F7',
      66: 'F8',
      67: 'F9',
      68: 'F10',
      87: 'F11',
      88: 'F12',
    };

    return keyMap[keycode] || `Key${keycode}`;
  }

  /**
   * Controla rate limiting para evitar spam de eventos
   */
  private shouldProcessEvent(): boolean {
    const now = Date.now();
    this.eventCount++;

    // Limpar eventos antigos (mais de 1 segundo)
    this.eventTimes = this.eventTimes.filter((time) => now - time < 1000);

    // Adicionar evento atual
    this.eventTimes.push(now);

    // Verificar se excedeu o limite
    if (this.eventTimes.length > this.maxEventsPerSecond) {
      if (this.eventCount % 100 === 0) {
        logger.warn(`⚠️ Rate limit excedido: ${this.eventTimes.length} eventos/segundo`);
      }
      return false;
    }

    return true;
  }

  /**
   * Retorna estatísticas do serviço
   */
  getStats(): {
    isRunning: boolean;
    eventCount: number;
    eventsPerSecond: number;
  } {
    const now = Date.now();
    const recentEvents = this.eventTimes.filter((time) => now - time < 1000);

    return {
      isRunning: this.isRunning,
      eventCount: this.eventCount,
      eventsPerSecond: recentEvents.length,
    };
  }

  /**
   * Limpa recursos
   */
  dispose(): void {
    this.stop().catch((error) => {
      logger.error('Erro ao fazer dispose do GlobalInputCaptureService:', error);
    });
  }
}
