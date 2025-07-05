/**
 * Serviço que escuta eventos de input e os transforma em eventos de gravação
 * Adiciona screenshots quando necessário e gerencia o fluxo de eventos
 */

import { injectable, inject } from 'tsyringe';
import { nanoid } from 'nanoid';
import { EventDispatcher } from './event-dispatcher.service.js';
import { ScreenService } from './screen.service.js';
import { logger } from '../../config/logger.js';
import { recorderConfig } from '../../config/recorder.config.js';
import type {
  RecordedEvent,
  MouseRecordedEvent,
  KeyboardRecordedEvent,
  MouseButton,
  IRecorderEventListener,
} from '../../types/recorder-event.types.js';
import type { InputEvent } from '../../types/input-event.types.js';

@injectable()
export class RecorderListenerService {
  private listeners = new Set<IRecorderEventListener>();
  private mouseState = new Map<MouseButton, boolean>();
  private lastMouseMoveTime = 0;
  private isDragging = false;

  constructor(
    @inject(EventDispatcher) private eventDispatcher: EventDispatcher,
    @inject('ScreenService') private screenService: ScreenService,
  ) {
    this.setupEventListeners();
  }

  /**
   * Adiciona um listener para eventos gravados
   */
  addListener(listener: IRecorderEventListener): void {
    this.listeners.add(listener);
    logger.debug(`Recorder listener adicionado, total: ${this.listeners.size}`);
  }

  /**
   * Remove um listener
   */
  removeListener(listener: IRecorderEventListener): void {
    this.listeners.delete(listener);
    logger.debug(`Recorder listener removido, total: ${this.listeners.size}`);
  }

  /**
   * Configura os listeners internos
   */
  private setupEventListeners(): void {
    // Criar um wrapper que implementa IEventListener
    const listener = {
      onEvent: (event: InputEvent) => {
        this.handleInputEvent(event);
      },
    };
    this.eventDispatcher.addListener(listener);
  }

  /**
   * Processa eventos de input
   */
  private async handleInputEvent(event: InputEvent): Promise<void> {
    try {
      // Verificar tipo de evento baseado na estrutura
      const eventAny = event as any;
      if (eventAny.data && 'action' in eventAny.data) {
        if ('button' in eventAny.data || 'x' in eventAny.data) {
          // Evento de mouse
          await this.handleMouseEvent(event);
        } else if ('key' in eventAny.data) {
          // Evento de teclado
          await this.handleKeyboardEvent(event);
        }
      }
    } catch (error) {
      logger.error('Erro ao processar evento de input:', error);
    }
  }

  /**
   * Processa eventos de mouse
   */
  private async handleMouseEvent(event: InputEvent): Promise<void> {
    if (!('data' in event)) return;
    const data = event.data as any;

    // Mapear ações do mouse
    if (data.action === 'click') {
      // Click é down + up, vamos processar apenas o down aqui
      await this.emitMouseEvent('down', data.x, data.y, data.button);
      this.mouseState.set(data.button, true);
      this.isDragging = true;
    } else if (data.action === 'release') {
      await this.emitMouseEvent('up', data.x, data.y, data.button);
      this.mouseState.set(data.button, false);
      this.isDragging = Array.from(this.mouseState.values()).some((state) => state);
    } else if (data.action === 'move' && this.isDragging) {
      // Throttle mouse move events
      const now = Date.now();
      if (now - this.lastMouseMoveTime >= recorderConfig.moveIntervalMs) {
        await this.emitMouseEvent('move', data.x, data.y);
        this.lastMouseMoveTime = now;
      }
    }
  }

  /**
   * Processa eventos de teclado
   */
  private async handleKeyboardEvent(event: InputEvent): Promise<void> {
    if (!('data' in event)) return;
    const data = event.data as any;

    // Emitir evento de teclado
    const recordedEvent: KeyboardRecordedEvent = {
      id: nanoid(),
      timestamp: Date.now(),
      type: 'keyboard',
      action: data.action as 'down' | 'up',
      key: data.key,
    };

    this.notifyListeners(recordedEvent);
  }

  /**
   * Emite evento de mouse
   */
  private async emitMouseEvent(
    action: 'down' | 'up' | 'move',
    x: number,
    y: number,
    button?: MouseButton,
  ): Promise<void> {
    const recordedEvent: MouseRecordedEvent = {
      id: nanoid(),
      timestamp: Date.now(),
      type: 'mouse',
      action,
      x,
      y,
    };

    if (button) {
      recordedEvent.button = button;
    }

    // Adicionar screenshot apenas em mouse down
    if (action === 'down' && recorderConfig.includeScreenshot) {
      try {
        const screenshot = await this.captureScreenshot();
        if (screenshot) {
          recordedEvent.screenshot = screenshot;
        }
      } catch (error) {
        logger.error('Erro ao capturar screenshot:', error);
      }
    }

    this.notifyListeners(recordedEvent);
  }

  /**
   * Captura screenshot da tela
   */
  private async captureScreenshot(): Promise<string | null> {
    try {
      // Capturar tela completa
      const base64 = await this.screenService.capture({ format: 'png' });

      // Verificar tamanho
      const size = Buffer.from(base64, 'base64').length;
      if (size > recorderConfig.maxScreenshotSize) {
        logger.warn(`Screenshot muito grande (${size} bytes), ignorando`);
        return null;
      }

      return base64;
    } catch (error) {
      logger.error('Falha ao capturar screenshot:', error);
      return null;
    }
  }

  /**
   * Notifica todos os listeners
   */
  private notifyListeners(event: RecordedEvent): void {
    for (const listener of this.listeners) {
      try {
        listener(event);
      } catch (error) {
        logger.error('Erro em listener:', error);
      }
    }
  }

  /**
   * Limpa recursos
   */
  dispose(): void {
    this.listeners.clear();
    this.mouseState.clear();
    logger.debug('RecorderListenerService disposed');
  }
}
