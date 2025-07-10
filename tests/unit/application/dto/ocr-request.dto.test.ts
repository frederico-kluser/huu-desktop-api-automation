/**
 * Testes para ocr-request.dto.ts
 * Estratégia: Maximização rápida de coverage com foco em execução de código
 */

// Baseado no know-how.txt: usar require() em vez de import para contornar verbatimModuleSyntax
const {
  ocrRequestSchema,
  ocrBatchRequestSchema,
  OcrRequest,
  OcrBatchRequest,
  OcrValidation,
} = require('../../../../src/application/dto/ocr-request.dto');

describe('ocr-request.dto coverage', () => {
  // Dados de teste válidos
  const validBase64Image =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
  const validImageJpeg =
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=';

  // Helper para gerar string longa para testes de tamanho
  const generateLargeImage = () => {
    // O cálculo no schema é (value.length * 3) / 4, então para exceder 14MB precisamos:
    // (length * 3) / 4 > 14 * 1024 * 1024
    // length > (14 * 1024 * 1024 * 4) / 3
    const minLength = Math.ceil((14 * 1024 * 1024 * 4) / 3) + 1000; // +1000 para garantir
    const largeData = 'A'.repeat(minLength);
    return `data:image/png;base64,${largeData}`;
  };

  describe('ocrRequestSchema', () => {
    test('valida imagem válida', () => {
      const result = ocrRequestSchema.parse({
        image: validBase64Image,
      });
      expect(result.image).toBe(validBase64Image);
    });

    test('valida com config opcional', () => {
      const result = ocrRequestSchema.parse({
        image: validBase64Image,
        config: {
          languages: ['eng', 'por'],
          mode: 'fast',
          pageSegmentationMode: 3,
          timeout: 5000,
        },
      });
      expect(result.config?.languages).toEqual(['eng', 'por']);
      expect(result.config?.mode).toBe('fast');
    });

    test('rejeita imagem vazia', () => {
      expect(() => ocrRequestSchema.parse({ image: '' })).toThrow();
    });

    test('rejeita formato inválido', () => {
      expect(() =>
        ocrRequestSchema.parse({
          image: 'not-a-base64-image',
        }),
      ).toThrow();
    });

    test('rejeita imagem muito grande', () => {
      expect(() =>
        ocrRequestSchema.parse({
          image: generateLargeImage(),
        }),
      ).toThrow();
    });

    test('valida todos os formatos de imagem suportados', () => {
      const formats = ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'webp'];
      formats.forEach((format) => {
        const image = `data:image/${format};base64,dGVzdA==`;
        const result = ocrRequestSchema.parse({ image });
        expect(result.image).toBe(image);
      });
    });

    test('valida todos os idiomas suportados', () => {
      const languages = ['eng', 'por', 'spa', 'fra', 'deu', 'ita', 'jpn', 'chi_sim'];
      const result = ocrRequestSchema.parse({
        image: validBase64Image,
        config: { languages },
      });
      expect(result.config?.languages).toEqual(languages);
    });

    test('valida todos os modos', () => {
      const modes = ['fast', 'balanced', 'accurate'];
      modes.forEach((mode) => {
        const result = ocrRequestSchema.parse({
          image: validBase64Image,
          config: { mode },
        });
        expect(result.config?.mode).toBe(mode);
      });
    });

    test('valida pageSegmentationMode limites', () => {
      // Valores válidos
      [0, 7, 13].forEach((psm) => {
        const result = ocrRequestSchema.parse({
          image: validBase64Image,
          config: { pageSegmentationMode: psm },
        });
        expect(result.config?.pageSegmentationMode).toBe(psm);
      });

      // Valores inválidos
      expect(() =>
        ocrRequestSchema.parse({
          image: validBase64Image,
          config: { pageSegmentationMode: -1 },
        }),
      ).toThrow();

      expect(() =>
        ocrRequestSchema.parse({
          image: validBase64Image,
          config: { pageSegmentationMode: 14 },
        }),
      ).toThrow();
    });

    test('valida timeout limites', () => {
      // Valores válidos
      [1000, 30000, 60000].forEach((timeout) => {
        const result = ocrRequestSchema.parse({
          image: validBase64Image,
          config: { timeout },
        });
        expect(result.config?.timeout).toBe(timeout);
      });

      // Valores inválidos
      expect(() =>
        ocrRequestSchema.parse({
          image: validBase64Image,
          config: { timeout: 999 },
        }),
      ).toThrow();

      expect(() =>
        ocrRequestSchema.parse({
          image: validBase64Image,
          config: { timeout: 60001 },
        }),
      ).toThrow();
    });
  });

  describe('ocrBatchRequestSchema', () => {
    test('valida batch válido', () => {
      const result = ocrBatchRequestSchema.parse({
        images: [validBase64Image, validImageJpeg],
      });
      expect(result.images).toHaveLength(2);
    });

    test('rejeita batch vazio', () => {
      expect(() => ocrBatchRequestSchema.parse({ images: [] })).toThrow();
    });

    test('rejeita batch muito grande', () => {
      const images = Array(11).fill(validBase64Image);
      expect(() => ocrBatchRequestSchema.parse({ images })).toThrow();
    });

    test('valida batch com config', () => {
      const result = ocrBatchRequestSchema.parse({
        images: [validBase64Image],
        config: { mode: 'accurate' },
      });
      expect(result.config?.mode).toBe('accurate');
    });

    test('valida batch no limite máximo', () => {
      const images = Array(10).fill(validBase64Image);
      const result = ocrBatchRequestSchema.parse({ images });
      expect(result.images).toHaveLength(10);
    });
  });

  describe('OcrRequest class', () => {
    test('constructor', () => {
      const request = new OcrRequest({
        image: validBase64Image,
        config: { mode: 'fast' },
      });
      expect(request.image).toBe(validBase64Image);
      expect(request.config?.mode).toBe('fast');
    });

    test('getImageBuffer', () => {
      const request = new OcrRequest({ image: validBase64Image });
      const buffer = request.getImageBuffer();
      expect(buffer).toBeInstanceOf(Buffer);
      expect(buffer.length).toBeGreaterThan(0);
    });

    test('getMimeType para png', () => {
      const request = new OcrRequest({ image: validBase64Image });
      expect(request.getMimeType()).toBe('image/png');
    });

    test('getMimeType para jpeg', () => {
      const request = new OcrRequest({ image: validImageJpeg });
      expect(request.getMimeType()).toBe('image/jpeg');
    });

    test('getMimeType para formato inválido', () => {
      // Criar request com imagem sem match válido
      const request = new OcrRequest({ image: 'data:text/plain;base64,dGVzdA==' });
      request.image = 'invalid-format'; // Forçar formato inválido
      expect(request.getMimeType()).toBe('image/png'); // Retorna default
    });

    test('fromRawData com dados válidos', () => {
      const request = OcrRequest.fromRawData({
        image: validBase64Image,
        config: { languages: ['eng'] },
      });
      expect(request).toBeInstanceOf(OcrRequest);
      expect(request.image).toBe(validBase64Image);
    });

    test('fromRawData com dados inválidos', () => {
      expect(() => OcrRequest.fromRawData({ image: 'invalid' })).toThrow();
    });
  });

  describe('OcrBatchRequest class', () => {
    test('constructor', () => {
      const request = new OcrBatchRequest({
        images: [validBase64Image, validImageJpeg],
        config: { mode: 'balanced' },
      });
      expect(request.images).toHaveLength(2);
      expect(request.config?.mode).toBe('balanced');
    });

    test('toIndividualRequests', () => {
      const request = new OcrBatchRequest({
        images: [validBase64Image, validImageJpeg],
        config: { timeout: 10000 },
      });
      const individuals = request.toIndividualRequests();

      expect(individuals).toHaveLength(2);
      expect(individuals[0]).toBeInstanceOf(OcrRequest);
      expect(individuals[0].config?.timeout).toBe(10000);
      expect(individuals[1]).toBeInstanceOf(OcrRequest);
      expect(individuals[1].config?.timeout).toBe(10000);
    });

    test('fromRawData com dados válidos', () => {
      const request = OcrBatchRequest.fromRawData({
        images: [validBase64Image],
      });
      expect(request).toBeInstanceOf(OcrBatchRequest);
      expect(request.images).toHaveLength(1);
    });

    test('fromRawData com dados inválidos', () => {
      expect(() => OcrBatchRequest.fromRawData({ images: [] })).toThrow();
    });
  });

  describe('OcrValidation helpers', () => {
    test('isValidBase64Image com imagem válida', () => {
      expect(OcrValidation.isValidBase64Image(validBase64Image)).toBe(true);
    });

    test('isValidBase64Image com imagem inválida', () => {
      expect(OcrValidation.isValidBase64Image('not-base64')).toBe(false);
      expect(OcrValidation.isValidBase64Image('')).toBe(false);
    });

    test('getImageFormat com diferentes formatos', () => {
      expect(OcrValidation.getImageFormat(validBase64Image)).toBe('png');
      expect(OcrValidation.getImageFormat(validImageJpeg)).toBe('jpeg');
      expect(OcrValidation.getImageFormat('data:image/gif;base64,test')).toBe('gif');
    });

    test('getImageFormat com formato inválido', () => {
      expect(OcrValidation.getImageFormat('invalid-format')).toBeNull();
      expect(OcrValidation.getImageFormat('data:text/plain;base64,test')).toBeNull();
    });

    test('getImageSize', () => {
      const size = OcrValidation.getImageSize(validBase64Image);
      expect(size).toBeGreaterThan(0);
      expect(typeof size).toBe('number');
    });

    test('getImageSize com diferentes tamanhos', () => {
      const smallImage = 'data:image/png;base64,dGVzdA==';
      const mediumImage = 'data:image/png;base64,' + 'A'.repeat(1000);

      const smallSize = OcrValidation.getImageSize(smallImage);
      const mediumSize = OcrValidation.getImageSize(mediumImage);

      expect(mediumSize).toBeGreaterThan(smallSize);
    });
  });

  // Testes adicionais para edge cases e coverage completo
  describe('edge cases', () => {
    test('config vazio é tratado como undefined', () => {
      const result = ocrRequestSchema.parse({
        image: validBase64Image,
        config: {},
      });
      expect(result.config).toEqual({});
    });

    test('languages array vazio', () => {
      const result = ocrRequestSchema.parse({
        image: validBase64Image,
        config: { languages: [] },
      });
      expect(result.config?.languages).toEqual([]);
    });

    test('múltiplos formatos em batch', () => {
      const formats = ['png', 'jpeg', 'gif', 'bmp', 'webp'];
      const images = formats.map((fmt) => `data:image/${fmt};base64,dGVzdA==`);

      const result = ocrBatchRequestSchema.parse({ images });
      expect(result.images).toHaveLength(5);
    });
  });
});
