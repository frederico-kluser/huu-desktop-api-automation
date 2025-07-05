import 'reflect-metadata';

// Usando dynamic import para contornar o problema de ESM
describe('screen-region coverage', () => {
  let ScreenRegion: any;

  beforeAll(async () => {
    const module = await import('../../../src/domain/entities/screen-region.js');
    ScreenRegion = module.ScreenRegion;
  });

  // Testa instanciação da classe ScreenRegion
  test('instantiates ScreenRegion class', () => {
    const region = new ScreenRegion(10, 20, 100, 200);
    expect(region.x).toBe(10);
    expect(region.y).toBe(20);
    expect(region.width).toBe(100);
    expect(region.height).toBe(200);
  });

  // Testa método contains com múltiplos casos para maximizar coverage
  describe('contains method', () => {
    test('all contains cases', () => {
      const region = new ScreenRegion(10, 20, 100, 200);

      const testCases = [
        // Casos dentro da região
        [10, 20, true], // Canto superior esquerdo
        [110, 220, true], // Canto inferior direito
        [60, 120, true], // Centro
        [10, 120, true], // Borda esquerda
        [110, 120, true], // Borda direita
        [60, 20, true], // Borda superior
        [60, 220, true], // Borda inferior
        // Casos fora da região
        [9, 20, false], // Esquerda
        [111, 120, false], // Direita
        [60, 19, false], // Acima
        [60, 221, false], // Abaixo
        [9, 19, false], // Diagonal superior esquerda
        [111, 221, false], // Diagonal inferior direita
        [0, 0, false], // Origem
        [-10, -20, false], // Negativos
      ];

      testCases.forEach(([x, y, expected]) => {
        expect(region.contains(x, y)).toBe(expected);
      });
    });
  });

  // Testa método center
  test('center method returns correct center point', () => {
    const testCases = [
      { region: new ScreenRegion(0, 0, 100, 100), expected: { x: 50, y: 50 } },
      { region: new ScreenRegion(10, 20, 100, 200), expected: { x: 60, y: 120 } },
      { region: new ScreenRegion(-50, -50, 100, 100), expected: { x: 0, y: 0 } },
      { region: new ScreenRegion(0, 0, 101, 101), expected: { x: 50, y: 50 } }, // Teste com números ímpares
      { region: new ScreenRegion(0, 0, 1, 1), expected: { x: 0, y: 0 } }, // Região mínima
    ];

    testCases.forEach(({ region, expected }) => {
      const center = region.center();
      expect(center).toEqual(expected);
    });
  });

  // Testa método estático fromMatch
  test('fromMatch static method creates ScreenRegion from MatchResult', () => {
    const matchResults = [
      { x: 10, y: 20, width: 100, height: 200, confidence: 0.95 },
      { x: 0, y: 0, width: 50, height: 50, confidence: 1.0 },
      { x: -10, y: -20, width: 30, height: 40, confidence: 0.5 },
    ];

    matchResults.forEach((match) => {
      const region = ScreenRegion.fromMatch(match);
      expect(region).toBeInstanceOf(ScreenRegion);
      expect(region.x).toBe(match.x);
      expect(region.y).toBe(match.y);
      expect(region.width).toBe(match.width);
      expect(region.height).toBe(match.height);
      // Verifica que confidence não é copiado (apenas as propriedades de Region)
      expect((region as any).confidence).toBeUndefined();
    });
  });

  // Teste adicional para garantir 100% de coverage com edge cases
  test('edge cases and boundaries', () => {
    // Região com dimensões zero
    const zeroRegion = new ScreenRegion(0, 0, 0, 0);
    expect(zeroRegion.contains(0, 0)).toBe(true); // Ponto na origem ainda está "dentro"
    expect(zeroRegion.center()).toEqual({ x: 0, y: 0 });

    // Região com coordenadas e dimensões grandes
    const largeRegion = new ScreenRegion(1000000, 1000000, 1000000, 1000000);
    expect(largeRegion.contains(1500000, 1500000)).toBe(true);
    expect(largeRegion.center()).toEqual({ x: 1500000, y: 1500000 });

    // Teste com valores decimais (serão truncados pelo Math.floor no center)
    const decimalRegion = new ScreenRegion(0, 0, 99, 99);
    expect(decimalRegion.center()).toEqual({ x: 49, y: 49 }); // Math.floor(99/2) = 49
  });
});
