export interface Region {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface MatchResult extends Region {
  confidence: number;
}

export class ScreenRegion implements Region {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly width: number,
    public readonly height: number,
  ) {}

  contains(x: number, y: number): boolean {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
  }

  center(): { x: number; y: number } {
    return {
      x: this.x + Math.floor(this.width / 2),
      y: this.y + Math.floor(this.height / 2),
    };
  }

  static fromMatch(match: MatchResult): ScreenRegion {
    return new ScreenRegion(match.x, match.y, match.width, match.height);
  }
}