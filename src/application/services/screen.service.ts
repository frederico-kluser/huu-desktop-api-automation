import { injectable, inject } from 'tsyringe';
import { ScreenFindRequest, ScreenCaptureRequest } from '../dto/automation-request.dto.js';
import { MatchResult, Region } from '../../domain/entities/screen-region.js';

export interface IScreenAdapter {
  capture(region?: Region): Promise<Buffer>;
  find(template: Buffer, confidence: number, region?: Region): Promise<MatchResult[]>;
  waitFor(template: Buffer, timeout: number, confidence: number): Promise<MatchResult>;
}

@injectable()
export class ScreenService {
  constructor(
    @inject('ScreenAdapter')
    private readonly screenAdapter: IScreenAdapter,
  ) {}

  async findTemplate(request: ScreenFindRequest): Promise<MatchResult[]> {
    const { template, confidence = 0.8, region } = request;

    const imageBuffer = this.decodeBase64Image(template);
    const matches = await this.screenAdapter.find(imageBuffer, confidence, region);

    return matches;
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