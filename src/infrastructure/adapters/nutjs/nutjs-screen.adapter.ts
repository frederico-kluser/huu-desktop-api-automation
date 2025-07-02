import { injectable } from 'tsyringe';
import { screen, Region as NutRegion } from '@nut-tree-fork/nut-js';
import sharp from 'sharp';
import type { IScreenAdapter } from '../../../application/services/screen.service.js';
import type { MatchResult, Region } from '../../../domain/entities/screen-region.js';
import { environment } from '../../../config/environment.js';
import pino from 'pino';

// Interface para a Image do nut-js
interface NutJSImage {
  width: number;
  height: number;
  data: Buffer;
  channels: number;
  pixelDensity: { scaleX: number; scaleY: number };
  hasAlphaChannel: boolean;
  toRGB(): Promise<NutJSImage>;
  toBGR(): Promise<NutJSImage>;
}

@injectable()
export class NutJSScreenAdapter implements IScreenAdapter {
  private readonly logger = pino({ name: 'NutJSScreenAdapter' });

  constructor() {
    screen.config.confidence = environment.screenConfidence;
    screen.config.autoHighlight = false;
    screen.config.highlightDurationMs = 500;
    this.logger.info('🖼️ NutJS Screen Adapter initialized');
  }

  async capture(region?: Region): Promise<Buffer> {
    this.logger.debug({ region }, '📸 Starting screen capture');

    try {
      let image: NutJSImage;

      if (region) {
        this.logger.debug({ region }, '🎯 Capturing specific region');
        const nutRegion = new NutRegion(region.x, region.y, region.width, region.height);
        image = (await screen.grabRegion(nutRegion)) as NutJSImage;
      } else {
        this.logger.debug('🖥️ Capturing full screen');
        image = (await screen.grab()) as NutJSImage;
      }

      this.logger.debug(
        {
          width: image.width,
          height: image.height,
          channels: image.channels,
          hasAlpha: image.hasAlphaChannel,
          dataLength: image.data.length,
        },
        '🔍 Raw image data captured',
      );

      // Converter os dados de pixel brutos para PNG usando Sharp
      const pngBuffer = await sharp(image.data, {
        raw: {
          width: image.width,
          height: image.height,
          channels: image.channels as 1 | 2 | 3 | 4,
        },
      })
        .png({ compressionLevel: 6, palette: false })
        .toBuffer();

      this.logger.info(
        {
          originalSize: image.data.length,
          pngSize: pngBuffer.length,
          compression: Math.round((1 - pngBuffer.length / image.data.length) * 100),
        },
        '✅ Screen capture completed and converted to PNG',
      );

      return pngBuffer;
    } catch (error) {
      this.logger.error({ error }, '❌ Failed to capture screen');
      throw error;
    }
  }

  find(_template: Buffer, _confidence: number, _region?: Region): Promise<MatchResult[]> {
    // Por enquanto, retornar um array vazio até que a funcionalidade seja implementada corretamente
    // TODO: Implementar busca de template usando a API correta do nut-js
    return Promise.resolve([]);
  }

  waitFor(_template: Buffer, _timeout: number, _confidence: number): Promise<MatchResult> {
    // Por enquanto, lançar erro até que a funcionalidade seja implementada corretamente
    // TODO: Implementar waitFor usando a API correta do nut-js
    return Promise.reject(
      new Error('waitFor functionality not yet implemented for this nut-js version'),
    );
  }
}
