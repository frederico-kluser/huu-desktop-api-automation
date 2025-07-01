import { injectable, inject } from 'tsyringe';
import {
  MouseMoveRequest,
  MouseClickRequest,
  MouseDragRequest,
  MouseScrollRequest,
} from '../dto/automation-request.dto.js';
import { Point, MouseButton } from '../../domain/entities/mouse-action.js';

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
  constructor(
    @inject('MouseAdapter')
    private readonly mouseAdapter: IMouseAdapter,
  ) {}

  async move(request: MouseMoveRequest): Promise<void> {
    const { x, y, smooth = true, duration = 1000 } = request;
    await this.mouseAdapter.move({ x, y }, smooth, duration);
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
}