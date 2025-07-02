import { injectable, inject } from 'tsyringe';
import type {
  MouseMoveRequest,
  MouseClickRequest,
  MouseDragRequest,
  MouseScrollRequest,
} from '../dto/automation-request.dto.js';
import type { Point } from '../../domain/entities/mouse-action.js';
import { MouseButton } from '../../domain/entities/mouse-action.js';
import { screen } from '@nut-tree-fork/nut-js';
import pino from 'pino';
import { EventDispatcher } from './event-dispatcher.service.js';
import type { MouseButton as EventMouseButton } from '../../types/input-event.types.js';

export interface IMouseAdapter {
  move(point: Point, smooth: boolean, duration: number): Promise<void>;
  click(button: MouseButton, doubleClick: boolean): Promise<void>;
  clickAt(point: Point, button: MouseButton, doubleClick: boolean): Promise<void>;
  drag(from: Point, to: Point, duration: number): Promise<void>;
  scroll(direction: 'up' | 'down', amount: number): Promise<void>;
  getPosition(): Promise<Point>;
}

@injectable()
export class MouseService {
  private readonly logger = pino({ name: 'MouseService' });

  constructor(
    @inject('MouseAdapter')
    private readonly mouseAdapter: IMouseAdapter,
    @inject(EventDispatcher)
    private readonly eventDispatcher: EventDispatcher,
  ) {}

  async move(request: MouseMoveRequest): Promise<void> {
    const { x, y, smooth = true, duration = 1000 } = request;
    
    // Validar coordenadas
    await this.validateCoordinates(x, y);
    
    this.logger.debug({ x, y, smooth, duration }, 'Moving mouse');
    
    try {
      await this.mouseAdapter.move({ x, y }, smooth, duration);
      this.logger.info({ x, y }, 'Mouse moved successfully');
    } catch (error) {
      this.logger.error({ error, x, y }, 'Failed to move mouse');
      throw error;
    }
  }

  async click(request: MouseClickRequest): Promise<void> {
    const { x, y, button = MouseButton.LEFT, doubleClick = false, smooth = true, duration = 1000 } = request;

    if (x !== undefined && y !== undefined) {
      // Validar coordenadas antes de clicar
      await this.validateCoordinates(x, y);
      
      // Se smooth é true, mover primeiro com a duração especificada
      if (smooth) {
        await this.mouseAdapter.move({ x, y }, smooth, duration);
      }
      
      await this.mouseAdapter.clickAt({ x, y }, button as MouseButton, doubleClick);
      this.logger.info({ x, y, button, doubleClick }, 'Mouse clicked successfully');
      
      // Emitir evento de clique
      this.eventDispatcher.dispatchMouseClick(button as EventMouseButton, x, y);
    } else {
      // Obter posição atual para incluir no evento
      const currentPos = await this.getPosition();
      
      await this.mouseAdapter.click(button as MouseButton, doubleClick);
      this.logger.info({ button, doubleClick }, 'Mouse clicked at current position');
      
      // Emitir evento de clique na posição atual
      this.eventDispatcher.dispatchMouseClick(button as EventMouseButton, currentPos.x, currentPos.y);
    }
  }

  async drag(request: MouseDragRequest): Promise<void> {
    const { from, to, duration = 1000, smooth = true } = request;
    
    // Validar coordenadas de origem e destino
    await this.validateCoordinates(from.x, from.y);
    await this.validateCoordinates(to.x, to.y);
    
    this.logger.debug({ from, to, duration, smooth }, 'Dragging mouse');
    
    try {
      // Se smooth é true, mover primeiro para a posição inicial com movimento suave
      if (smooth) {
        await this.mouseAdapter.move(from, smooth, duration / 3);
      }
      
      await this.mouseAdapter.drag(from, to, duration);
      this.logger.info({ from, to }, 'Mouse dragged successfully');
    } catch (error) {
      this.logger.error({ error, from, to }, 'Failed to drag mouse');
      throw error;
    }
  }

  async scroll(request: MouseScrollRequest): Promise<void> {
    const { direction, amount = 3, smooth = true, duration = 1000 } = request;
    
    this.logger.debug({ direction, amount, smooth, duration }, 'Scrolling mouse');
    
    try {
      if (smooth && duration > 0) {
        // Dividir o scroll em múltiplos passos menores para criar efeito suave
        const steps = Math.max(1, Math.floor(duration * 30 / 1000)); // 30 fps
        const stepAmount = amount / steps;
        const stepDuration = duration / steps;
        
        for (let i = 0; i < steps; i++) {
          await this.mouseAdapter.scroll(direction, stepAmount);
          if (i < steps - 1) {
            await new Promise(resolve => setTimeout(resolve, stepDuration));
          }
        }
      } else {
        // Scroll instantâneo
        await this.mouseAdapter.scroll(direction, amount);
      }
      
      this.logger.info({ direction, amount }, 'Mouse scrolled successfully');
    } catch (error) {
      this.logger.error({ error, direction, amount }, 'Failed to scroll mouse');
      throw error;
    }
  }

  async getPosition(): Promise<Point> {
    return this.mouseAdapter.getPosition();
  }

  private async validateCoordinates(x: number, y: number): Promise<void> {
    // Obter dimensões da tela
    const screenWidth = await screen.width();
    const screenHeight = await screen.height();

    if (x < 0 || x >= screenWidth) {
      throw new Error(`Invalid X coordinate: ${x}. Must be between 0 and ${screenWidth - 1}`);
    }

    if (y < 0 || y >= screenHeight) {
      throw new Error(`Invalid Y coordinate: ${y}. Must be between 0 and ${screenHeight - 1}`);
    }
  }
}