import { injectable } from 'tsyringe';
import { screen, Image, imageResource, Region as NutRegion } from '@nut-tree-fork/nut-js';
import { IScreenAdapter } from '../../../application/services/screen.service.js';
import { MatchResult, Region } from '../../../domain/entities/screen-region.js';
import { environment } from '../../../config/environment.js';

@injectable()
export class NutJSScreenAdapter implements IScreenAdapter {
  constructor() {
    screen.config.confidence = environment.screenConfidence;
    screen.config.autoHighlight = false;
    screen.config.highlightDurationMs = 500;
  }

  async capture(region?: Region): Promise<Buffer> {
    let image: Image;

    if (region) {
      const nutRegion = new NutRegion(region.x, region.y, region.width, region.height);
      image = await screen.grabRegion(nutRegion);
    } else {
      image = await screen.capture();
    }

    const buffer = await image.toRGB();
    return Buffer.from(buffer);
  }

  async find(template: Buffer, confidence: number, region?: Region): Promise<MatchResult[]> {
    screen.config.confidence = confidence;

    const templateImage = await this.createImageFromBuffer(template);

    let searchRegion: NutRegion | undefined;
    if (region) {
      searchRegion = new NutRegion(region.x, region.y, region.width, region.height);
    }

    try {
      const matches = await screen.findAll(imageResource(templateImage), {
        searchRegion,
        confidence,
      });

      return matches.map((match) => ({
        x: match.left,
        y: match.top,
        width: match.width,
        height: match.height,
        confidence: confidence,
      }));
    } catch (error) {
      if (error instanceof Error && error.message.includes('no match')) {
        return [];
      }
      throw error;
    }
  }

  async waitFor(template: Buffer, timeout: number, confidence: number): Promise<MatchResult> {
    screen.config.confidence = confidence;

    const templateImage = await this.createImageFromBuffer(template);

    const match = await screen.waitFor(imageResource(templateImage), timeout);

    return {
      x: match.left,
      y: match.top,
      width: match.width,
      height: match.height,
      confidence: confidence,
    };
  }

  private async createImageFromBuffer(buffer: Buffer): Promise<Image> {
    const width = 100;
    const height = Math.floor(buffer.length / (width * 3));
    const channels = 3;

    return new Image(width, height, buffer, channels);
  }
}