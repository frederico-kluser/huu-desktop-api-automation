/**
 * Serviço de pré-processamento de imagens para OCR
 * Utiliza Sharp para otimizar imagens antes do reconhecimento de texto
 */

import sharp from 'sharp';
import { injectable } from 'tsyringe';
import type { PreprocessingOptions } from '../../types/ocr.types.js';
import { logger } from '../../config/logger.js';

/**
 * Serviço responsável pelo pré-processamento de imagens
 * Melhora a qualidade das imagens para aumentar a precisão do OCR
 */
@injectable()
export class ImagePreprocessor {
  /**
   * Pré-processa uma imagem para otimizar o reconhecimento OCR
   * @param inputBuffer Buffer da imagem original
   * @param options Opções de pré-processamento
   * @returns Buffer da imagem processada
   */
  async preprocessForOCR(inputBuffer: Buffer, options: PreprocessingOptions = {}): Promise<Buffer> {
    const {
      targetWidth = 1000,
      threshold = 128,
      contrastBoost = true,
      denoiseLevel = 0,
      sharpen = true,
    } = options;

    try {
      logger.debug('Iniciando pré-processamento de imagem', {
        bufferSize: inputBuffer.length,
        options,
      });

      let pipeline = sharp(inputBuffer);

      // Obter metadados da imagem
      const metadata = await sharp(inputBuffer).metadata();
      logger.debug('Metadados da imagem', metadata);

      // Passo 1: Redimensionar para dimensões otimizadas (mínimo 300 DPI equivalente)
      if (metadata.width && metadata.width > targetWidth) {
        pipeline = pipeline.resize({
          width: targetWidth,
          fit: 'inside',
          withoutEnlargement: false,
        });
      }

      // Passo 2: Converter para escala de cinza para processamento consistente
      pipeline = pipeline.grayscale();

      // Passo 3: Melhorar contraste usando normalização de histograma
      if (contrastBoost) {
        pipeline = pipeline.normalize({ lower: 1, upper: 99 });
      }

      // Passo 4: Aplicar redução de ruído se necessário
      if (denoiseLevel > 0) {
        pipeline = pipeline.median(denoiseLevel);
      }

      // Passo 5: Aguçar bordas do texto
      if (sharpen) {
        pipeline = pipeline.sharpen({
          sigma: 1.0,
          m1: 1.0, // Aguçamento de área plana
          m2: 2.0, // Aguçamento de área irregular
          x1: 2.0, // Limiar
          y2: 10.0, // Clareamento máximo
          y3: 20.0, // Escurecimento máximo
        });
      }

      // Passo 6: Binarizar usando limiar
      pipeline = pipeline.threshold(threshold, { greyscale: true });

      // Passo 7: Definir metadados adequados
      pipeline = pipeline.withMetadata({ density: 300 });

      const processedBuffer = await pipeline.toBuffer();

      logger.debug('Pré-processamento concluído', {
        originalSize: inputBuffer.length,
        processedSize: processedBuffer.length,
      });

      return processedBuffer;
    } catch (error: any) {
      logger.error('Erro no pré-processamento de imagem', error);
      throw new Error(`Falha no pré-processamento: ${error.message}`);
    }
  }

  /**
   * Pré-processamento adaptativo baseado nas características da imagem
   * @param inputBuffer Buffer da imagem original
   * @returns Buffer da imagem processada
   */
  async adaptivePreprocess(inputBuffer: Buffer): Promise<Buffer> {
    try {
      logger.debug('Iniciando pré-processamento adaptativo');

      // Analisar características da imagem
      const metadata = await sharp(inputBuffer).metadata();
      const stats = await sharp(inputBuffer).stats();

      // Determinar pré-processamento otimizado baseado nas propriedades da imagem
      const isDarkImage = stats.channels[0].mean < 100;
      const isLowContrast = stats.channels[0].stdev < 50;

      logger.debug('Análise da imagem', {
        isDarkImage,
        isLowContrast,
        mean: stats.channels[0].mean,
        stdev: stats.channels[0].stdev,
      });

      let pipeline = sharp(inputBuffer).resize({ width: 1000, fit: 'inside' }).grayscale();

      // Ajustar gamma para imagens escuras
      if (isDarkImage) {
        logger.debug('Aplicando correção gamma para imagem escura');
        pipeline = pipeline.gamma(2.2);
      }

      // Aplicar CLAHE para imagens com baixo contraste
      if (isLowContrast) {
        logger.debug('Aplicando CLAHE para melhorar contraste');
        pipeline = pipeline.clahe({
          width: 3,
          height: 3,
          maxSlope: 3,
        });
      }

      // Finalizar processamento
      const processedBuffer = await pipeline
        .normalize()
        .sharpen()
        .threshold(isDarkImage ? 160 : 128)
        .toBuffer();

      logger.debug('Pré-processamento adaptativo concluído', {
        originalSize: inputBuffer.length,
        processedSize: processedBuffer.length,
      });

      return processedBuffer;
    } catch (error: any) {
      logger.error('Erro no pré-processamento adaptativo', error);
      throw new Error(`Falha no pré-processamento adaptativo: ${error.message}`);
    }
  }

  /**
   * Valida se o buffer contém uma imagem válida
   * @param buffer Buffer a ser validado
   * @returns True se válido, false caso contrário
   */
  async isValidImage(buffer: Buffer): Promise<boolean> {
    try {
      const metadata = await sharp(buffer).metadata();
      return !!(metadata.width && metadata.height && metadata.format);
    } catch {
      return false;
    }
  }

  /**
   * Obtém informações sobre a imagem
   * @param buffer Buffer da imagem
   * @returns Metadados da imagem
   */
  async getImageInfo(buffer: Buffer): Promise<sharp.Metadata> {
    try {
      return await sharp(buffer).metadata();
    } catch (error: any) {
      throw new Error(`Falha ao obter informações da imagem: ${error.message}`);
    }
  }

  /**
   * Divide uma imagem grande em chunks para processamento
   * @param buffer Buffer da imagem
   * @param chunkSize Tamanho do chunk em pixels
   * @returns Array de buffers dos chunks
   */
  async splitImageIntoChunks(buffer: Buffer, chunkSize: number = 1000): Promise<Buffer[]> {
    try {
      const metadata = await sharp(buffer).metadata();
      if (!metadata.width || !metadata.height) {
        throw new Error('Imagem sem dimensões válidas');
      }

      const chunks: Buffer[] = [];

      for (let y = 0; y < metadata.height; y += chunkSize) {
        for (let x = 0; x < metadata.width; x += chunkSize) {
          const chunk = await sharp(buffer)
            .extract({
              left: x,
              top: y,
              width: Math.min(chunkSize, metadata.width - x),
              height: Math.min(chunkSize, metadata.height - y),
            })
            .toBuffer();

          chunks.push(chunk);
        }
      }

      logger.debug(`Imagem dividida em ${chunks.length} chunks`);
      return chunks;
    } catch (error: any) {
      logger.error('Erro ao dividir imagem em chunks', error);
      throw new Error(`Falha ao dividir imagem: ${error.message}`);
    }
  }
}
