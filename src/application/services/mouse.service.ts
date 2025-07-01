import { injectable, inject } from 'tsyringe';
import {
  MouseMoveRequest,
  MouseClickRequest,
  MouseDragRequest,
  MouseScrollRequest,
} from '../dto/automation-request.dto.js';
import { Point, MouseButton } from '../../domain/entities/mouse-action.js';
import { screen } from '@nut-tree-fork/nut-js';
import pino from 'pino';

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
    const { x, y, button = MouseButton.LEFT, doubleClick = false } = request;

    if (x !== undefined && y !== undefined) {
      await this.mouseAdapter.clickAt({ x, y }, button as MouseButton, doubleClick);
    } else {
      await this.mouseAdapter.click(button as MouseButton, doubleClick);
    }
  }

  async drag(request: MouseDragRequest): Promise<void> {
    const { from, to, duration = 1000 } = request;
    await this.mouseAdapter.drag(from, to, duration);
  }

  async scroll(request: MouseScrollRequest): Promise<void> {
    const { direction, amount = 3 } = request;
    await this.mouseAdapter.scroll(direction, amount);
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