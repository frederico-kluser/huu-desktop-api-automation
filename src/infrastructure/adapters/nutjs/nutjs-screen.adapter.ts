import { injectable } from 'tsyringe';
import { screen, imageResource, Region as NutRegion } from '@nut-tree-fork/nut-js';
// Image type is complex in nut-js, using any for now
import type { IScreenAdapter } from '../../../application/services/screen.service.js';
import type { MatchResult, Region } from '../../../domain/entities/screen-region.js';
import { environment } from '../../../config/environment.js';

@injectable()
export class NutJSScreenAdapter implements IScreenAdapter {
  constructor() {
    screen.config.confidence = environment.screenConfidence;
    screen.config.autoHighlight = false;
    screen.config.highlightDurationMs = 500;
  }

  async capture(region?: Region): Promise<Buffer> {
    let image: any; // Usando any temporariamente devido a incompatibilidade de tipos

    if (region) {
      const nutRegion = new NutRegion(region.x, region.y, region.width, region.height);
      image = await screen.grabRegion(nutRegion);
    } else {
      image = await screen.grab();
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

  private async createImageFromBuffer(buffer: Buffer): Promise<any> {
    // Para imagens base64 decodificadas, precisamos detectar as dimensões reais
    // Este é um método temporário - idealmente, as dimensões deveriam vir junto com o buffer
    // ou o buffer deveria incluir um header com as dimensões
    
    // Assumindo formato PNG/JPEG padrão, tentamos detectar dimensões
    // Para PNG: width está nos bytes 16-19, height nos bytes 20-23
    // Para JPEG: mais complexo, precisa procurar por markers SOF0/SOF2
    
    // Por enquanto, vamos usar uma abordagem que funciona para imagens quadradas
    // ou permitir que o caller especifique as dimensões
    const channels = 3; // RGB
    
    // Calcula dimensões assumindo imagem quadrada
    const pixelCount = buffer.length / channels;
    const dimension = Math.floor(Math.sqrt(pixelCount));
    
    // Se não for quadrada perfeita, ajusta para o próximo tamanho válido
    const width = dimension;
    const height = Math.floor(pixelCount / width);
    
    // Valida se as dimensões fazem sentido
    if (width * height * channels !== buffer.length) {
      // Tenta dimensões comuns de screenshot
      const commonDimensions = [
        { width: 1920, height: 1080 },
        { width: 1366, height: 768 },
        { width: 1280, height: 720 },
        { width: 800, height: 600 },
      ];
      
      for (const dim of commonDimensions) {
        if (dim.width * dim.height * channels === buffer.length) {
          // Criando um objeto compatível com Image
          return {
            width: dim.width,
            height: dim.height,
            data: buffer,
            channels,
            toRGB: async () => buffer,
            hasAlphaChannel: false,
            pixelDensity: { scaleX: 1, scaleY: 1 },
          };
        }
      }
      
      // Se nenhuma dimensão comum funcionar, usa a estimativa quadrada
      throw new Error(
        `Cannot determine image dimensions for buffer of length ${buffer.length}. ` +
        `Expected dimensions that multiply to ${pixelCount} pixels.`
      );
    }

    // Criando um objeto compatível com Image do nut-js
    // Nota: Esta é uma implementação temporária que precisa ser ajustada
    // quando tivermos acesso aos construtores corretos do nut-js
    const imageObj = {
      width,
      height,
      data: buffer,
      channels,
      toRGB: async () => buffer,
      hasAlphaChannel: false,
      pixelDensity: { scaleX: 1, scaleY: 1 },
    };
    return imageObj;
  }
}