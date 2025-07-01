import { injectable } from 'tsyringe';
import { mouse, straightTo, Button } from '@nut-tree-fork/nut-js';
import { Point as NutPoint } from '@nut-tree-fork/nut-js';
import type { IMouseAdapter } from '../../../application/services/mouse.service.js';
import type { Point } from '../../../domain/entities/mouse-action.js';
import { MouseButton } from '../../../domain/entities/mouse-action.js';
import { environment } from '../../../config/environment.js';

@injectable()
export class NutJSMouseAdapter implements IMouseAdapter {
  private buttonMap: Record<MouseButton, Button> = {
    [MouseButton.LEFT]: Button.LEFT,
    [MouseButton.RIGHT]: Button.RIGHT,
    [MouseButton.MIDDLE]: Button.MIDDLE,
  };

  constructor() {
    mouse.config.mouseSpeed = environment.mouseSpeed;
  }

  async move(point: Point, smooth: boolean, duration: number): Promise<void> {
    if (smooth) {
      mouse.config.mouseSpeed = Math.max(100, Math.min(1000, duration));
    } else {
      mouse.config.mouseSpeed = 10000;
    }

    const targetPoint = new NutPoint(point.x, point.y);
    await mouse.move(straightTo(targetPoint));
  }

  async click(button: MouseButton, doubleClick: boolean): Promise<void> {
    const nutButton = this.buttonMap[button];

    if (doubleClick) {
      await mouse.doubleClick(nutButton);
    } else {
      await mouse.click(nutButton);
    }
  }

  async clickAt(point: Point, button: MouseButton, doubleClick: boolean): Promise<void> {
    await this.move(point, true, 500);
    await this.click(button, doubleClick);
  }

  async drag(from: Point, to: Point, duration: number): Promise<void> {
    await this.move(from, true, duration / 3);
    await mouse.pressButton(Button.LEFT);
    await this.move(to, true, (duration * 2) / 3);
    await mouse.releaseButton(Button.LEFT);
  }

  async scroll(direction: 'up' | 'down', amount: number): Promise<void> {
    const scrollAmount = direction === 'up' ? -amount : amount;
    await mouse.scrollDown(scrollAmount);
  }

  async getPosition(): Promise<Point> {
    const position = await mouse.getPosition();
    return { x: position.x, y: position.y };
  }
}