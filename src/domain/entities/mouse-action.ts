export interface Point {
  x: number;
  y: number;
}

export enum MouseButton {
  LEFT = 'left',
  RIGHT = 'right',
  MIDDLE = 'middle',
}

export interface MouseMoveOptions {
  smooth?: boolean;
  duration?: number;
}

export interface MouseClickOptions {
  button?: MouseButton;
  doubleClick?: boolean;
}

export class MouseAction {
  constructor(
    public readonly type: 'move' | 'click' | 'drag' | 'scroll',
    public readonly position?: Point,
    public readonly options?: MouseMoveOptions | MouseClickOptions,
  ) {}

  static move(x: number, y: number, options?: MouseMoveOptions): MouseAction {
    return new MouseAction('move', { x, y }, options);
  }

  static click(position?: Point, options?: MouseClickOptions): MouseAction {
    return new MouseAction('click', position, options);
  }

  static drag(from: Point, to: Point): MouseAction {
    return new MouseAction('drag', from, { to } as any);
  }

  static scroll(direction: 'up' | 'down', amount: number): MouseAction {
    return new MouseAction('scroll', undefined, { direction, amount } as any);
  }
}
