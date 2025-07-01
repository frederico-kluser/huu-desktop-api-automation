import { injectable, inject } from 'tsyringe';
import type { ScreenFindRequest, ScreenCaptureRequest } from '../dto/automation-request.dto.js';
import type { MatchResult, Region } from '../../domain/entities/screen-region.js';
import pino from 'pino';

export interface IScreenAdapter {
  capture(region?: Region): Promise<Buffer>;
  find(template: Buffer, confidence: number, region?: Region): Promise<MatchResult[]>;
  waitFor(template: Buffer, timeout: number, confidence: number): Promise<MatchResult>;
}

@injectable()
export class ScreenService {
  private readonly logger = pino({ name: 'ScreenService' });

  constructor(
    @inject('ScreenAdapter')
    private readonly screenAdapter: IScreenAdapter,
  ) {}

  async findTemplate(request: ScreenFindRequest): Promise<MatchResult[]> {
    const { template, confidence = 0.8, region } = request;

    this.logger.debug({ confidence, region }, 'Finding template on screen');

    try {
      const imageBuffer = this.decodeBase64Image(template);
      const matches = await this.screenAdapter.find(imageBuffer, confidence, region);

      this.logger.info({ matchCount: matches.length }, 'Template search completed');
      return matches;
    } catch (error) {
      this.logger.error({ error }, 'Failed to find template');
      throw error;
    }
  }

  async capture(request: ScreenCaptureRequest): Promise<string> {
    const { region, format = 'png' } = request;

    const buffer = await this.screenAdapter.capture(region);
    const base64 = buffer.toString('base64');

    return `data:image/${format};base64,${base64}`;
  }

  async waitForTemplate(
    template: string,
    timeout: number = 5000,
    confidence: number = 0.8,
  ): Promise<MatchResult> {
    const imageBuffer = this.decodeBase64Image(template);
    return this.screenAdapter.waitFor(imageBuffer, timeout, confidence);
  }

  private decodeBase64Image(base64String: string): Buffer {
    const base64Data = base64String.replace(/^data:image\/[a-z]+;base64,/, '');
    return Buffer.from(base64Data, 'base64');
  }
}