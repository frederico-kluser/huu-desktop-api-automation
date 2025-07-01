/**
 * Testes unitários para MouseService
 * Foco nas novas funcionalidades de smooth e duration
 */
import 'reflect-metadata';
import { MouseService, type IMouseAdapter } from '../../../src/application/services/mouse.service.js';
import { MouseButton } from '../../../src/domain/entities/mouse-action.js';
import type { Point } from '../../../src/domain/entities/mouse-action.js';
import { screen } from '@nut-tree-fork/nut-js';

// Mock do screen
jest.mock('@nut-tree-fork/nut-js', () => ({
  screen: {
    width: jest.fn().mockResolvedValue(1920),
    height: jest.fn().mockResolvedValue(1080),
  },
}));

describe('MouseService', () => {
  let mouseService: MouseService;
  let mockMouseAdapter: jest.Mocked<IMouseAdapter>;

  beforeEach(() => {
    // Criar mock do adapter
    mockMouseAdapter = {
      move: jest.fn().mockResolvedValue(undefined),
      click: jest.fn().mockResolvedValue(undefined),
      clickAt: jest.fn().mockResolvedValue(undefined),
      drag: jest.fn().mockResolvedValue(undefined),
      scroll: jest.fn().mockResolvedValue(undefined),
      getPosition: jest.fn().mockResolvedValue({ x: 100, y: 100 }),
    };

    // Injetar mock no serviço
    mouseService = new MouseService(mockMouseAdapter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('move', () => {
    it('deve chamar o adapter com parâmetros corretos para movimento suave', async () => {
      const request = { x: 500, y: 500, smooth: true, duration: 2000 };
      
      await mouseService.move(request);

      expect(mockMouseAdapter.move).toHaveBeenCalledWith(
        { x: 500, y: 500 },
        true,
        2000
      );
    });

    it('deve usar valores padrão quando smooth e duration não forem fornecidos', async () => {
      const request = { x: 500, y: 500 };
      
      await mouseService.move(request);

      expect(mockMouseAdapter.move).toHaveBeenCalledWith(
        { x: 500, y: 500 },
        true, // padrão
        1000  // padrão
      );
    });

    it('deve validar coordenadas antes de mover', async () => {
      const request = { x: 2000, y: 500 }; // x fora da tela
      
      await expect(mouseService.move(request)).rejects.toThrow(
        'Invalid X coordinate: 2000. Must be between 0 and 1919'
      );
      
      expect(mockMouseAdapter.move).not.toHaveBeenCalled();
    });
  });

  describe('click', () => {
    it('deve mover antes de clicar quando smooth for true', async () => {
      const request = { x: 300, y: 400, smooth: true, duration: 500 };
      
      await mouseService.click(request);

      // Verificar que moveu primeiro
      expect(mockMouseAdapter.move).toHaveBeenCalledWith(
        { x: 300, y: 400 },
        true,
        500
      );
      
      // Verificar que clicou depois
      expect(mockMouseAdapter.clickAt).toHaveBeenCalledWith(
        { x: 300, y: 400 },
        MouseButton.LEFT,
        false
      );
    });

    it('não deve mover quando smooth for false', async () => {
      const request = { x: 300, y: 400, smooth: false };
      
      await mouseService.click(request);

      expect(mockMouseAdapter.move).not.toHaveBeenCalled();
      expect(mockMouseAdapter.clickAt).toHaveBeenCalledWith(
        { x: 300, y: 400 },
        MouseButton.LEFT,
        false
      );
    });

    it('deve clicar na posição atual quando coordenadas não forem fornecidas', async () => {
      const request = { button: 'right' as any, doubleClick: true };
      
      await mouseService.click(request);

      expect(mockMouseAdapter.click).toHaveBeenCalledWith(
        MouseButton.RIGHT,
        true
      );
      expect(mockMouseAdapter.clickAt).not.toHaveBeenCalled();
    });
  });

  describe('drag', () => {
    it('deve mover para posição inicial antes de arrastar quando smooth for true', async () => {
      const request = {
        from: { x: 100, y: 100 },
        to: { x: 500, y: 500 },
        smooth: true,
        duration: 1500,
      };
      
      await mouseService.drag(request);

      // Verificar movimento inicial
      expect(mockMouseAdapter.move).toHaveBeenCalledWith(
        { x: 100, y: 100 },
        true,
        500 // duration / 3
      );
      
      // Verificar arrasto
      expect(mockMouseAdapter.drag).toHaveBeenCalledWith(
        { x: 100, y: 100 },
        { x: 500, y: 500 },
        1500
      );
    });

    it('deve validar coordenadas de origem e destino', async () => {
      const request = {
        from: { x: 100, y: 100 },
        to: { x: 2000, y: 500 }, // x fora da tela
      };
      
      await expect(mouseService.drag(request)).rejects.toThrow(
        'Invalid X coordinate: 2000. Must be between 0 and 1919'
      );
    });
  });

  describe('scroll', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('deve dividir scroll em múltiplos passos quando smooth for true', async () => {
      const request = {
        direction: 'down' as const,
        amount: 6,
        smooth: true,
        duration: 1000,
      };
      
      const scrollPromise = mouseService.scroll(request);
      
      // Avançar o tempo para permitir execução
      await jest.runAllTimersAsync();
      await scrollPromise;

      // Com 30 fps e 1000ms, deve ter 30 chamadas
      const expectedCalls = Math.floor(1000 * 30 / 1000);
      expect(mockMouseAdapter.scroll).toHaveBeenCalledTimes(expectedCalls);
      
      // Cada chamada deve ter uma fração do amount total
      const expectedStepAmount = 6 / expectedCalls;
      expect(mockMouseAdapter.scroll).toHaveBeenCalledWith('down', expectedStepAmount);
    });

    it('deve fazer scroll instantâneo quando smooth for false', async () => {
      const request = {
        direction: 'up' as const,
        amount: 5,
        smooth: false,
      };
      
      await mouseService.scroll(request);

      expect(mockMouseAdapter.scroll).toHaveBeenCalledTimes(1);
      expect(mockMouseAdapter.scroll).toHaveBeenCalledWith('up', 5);
    });
  });

  describe('getPosition', () => {
    it('deve retornar a posição atual do mouse', async () => {
      const position = await mouseService.getPosition();
      
      expect(position).toEqual({ x: 100, y: 100 });
      expect(mockMouseAdapter.getPosition).toHaveBeenCalled();
    });
  });
});