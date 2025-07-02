/**
 * Adaptador de mouse para o recorder que emite eventos durante operações
 * Extende o adaptador base adicionando notificações de eventos
 */

import { injectable, inject } from 'tsyringe';
import { mouse, Button } from '@nut-tree-fork/nut-js';
import { NutJSMouseAdapter } from './nutjs-mouse.adapter.js';
import { EventDispatcher } from '../../../application/services/event-dispatcher.service.js';
import type { Point } from '../../../domain/entities/mouse-action.js';
import { MouseButton } from '../../../domain/entities/mouse-action.js';
import type { MouseButton as EventMouseButton } from '../../../types/input-event.types.js';
import { recorderConfig } from '../../../config/recorder.config.js';

@injectable()
export class RecorderMouseAdapter extends NutJSMouseAdapter {
  private eventButtonMap: Record<MouseButton, EventMouseButton> = {
    [MouseButton.LEFT]: 'left',
    [MouseButton.RIGHT]: 'right',
    [MouseButton.MIDDLE]: 'middle',
  };
  
  private lastMoveTime = 0;
  
  constructor(
    @inject(EventDispatcher) private eventDispatcher: EventDispatcher
  ) {
    super();
  }
  
  /**
   * Sobrescreve o método drag para emitir eventos durante o movimento
   */
  async drag(from: Point, to: Point, duration: number): Promise<void> {
    // Mover para posição inicial
    await this.move(from, true, duration / 3);
    
    // Emitir mouse down
    this.eventDispatcher.dispatch({
      id: '',
      type: 'mouse',
      timestamp: Date.now(),
      cursorX: from.x,
      cursorY: from.y,
      data: {
        action: 'click',
        x: from.x,
        y: from.y,
        button: 'left'
      }
    });
    
    // Pressionar botão
    await mouse.pressButton(Button.LEFT);
    
    // Calcular passos para movimento
    const steps = Math.max(1, Math.floor((duration * 2/3) / recorderConfig.moveIntervalMs));
    const deltaX = to.x - from.x;
    const deltaY = to.y - from.y;
    
    // Mover com emissão de eventos
    for (let i = 1; i <= steps; i++) {
      const progress = i / steps;
      const x = Math.round(from.x + deltaX * progress);
      const y = Math.round(from.y + deltaY * progress);
      
      // Mover mouse
      await this.move({ x, y }, false, 0);
      
      // Emitir evento de movimento
      this.eventDispatcher.dispatch({
        id: '',
        type: 'mouse',
        timestamp: Date.now(),
        cursorX: x,
        cursorY: y,
        data: {
          action: 'move',
          x,
          y
        }
      });
      
      // Aguardar intervalo
      if (i < steps) {
        await this.delayMs(recorderConfig.moveIntervalMs);
      }
    }
    
    // Soltar botão
    await mouse.releaseButton(Button.LEFT);
    
    // Emitir mouse up
    this.eventDispatcher.dispatch({
      id: '',
      type: 'mouse',
      timestamp: Date.now(),
      cursorX: to.x,
      cursorY: to.y,
      data: {
        action: 'release',
        x: to.x,
        y: to.y,
        button: 'left'
      }
    });
  }
  
  /**
   * Aguarda um período em milissegundos
   */
  private delayMs(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}