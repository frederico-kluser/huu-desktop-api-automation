/**
 * Testes unitários para NutJSMouseAdapter
 * Foco na implementação de movimento suave com interpolação
 */
import 'reflect-metadata';

// Mock do environment.js para evitar problemas com valores undefined
jest.mock('../../../src/config/environment.js', () => ({
  environment: {
    mouseSpeed: 500,
  },
}));

// Mock do nut-js
jest.mock('@nut-tree-fork/nut-js', () => ({
  mouse: {
    config: { mouseSpeed: 500 },
    move: jest.fn().mockResolvedValue(undefined),
    click: jest.fn().mockResolvedValue(undefined),
    doubleClick: jest.fn().mockResolvedValue(undefined),
    pressButton: jest.fn().mockResolvedValue(undefined),
    releaseButton: jest.fn().mockResolvedValue(undefined),
    scrollDown: jest.fn().mockResolvedValue(undefined),
    getPosition: jest.fn().mockResolvedValue({ x: 0, y: 0 }),
  },
  straightTo: jest.fn((point) => point),
  Button: {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    MIDDLE: 'MIDDLE',
  },
  Point: jest.fn((x, y) => ({ x, y })),
}));

// Mock de setTimeout para execução imediata
global.setTimeout = jest.fn((callback: any) => {
  callback();
  return 0 as any;
}) as any;

import { NutJSMouseAdapter } from '../../../src/infrastructure/adapters/nutjs/nutjs-mouse.adapter.js';
import { mouse, Button } from '@nut-tree-fork/nut-js';
import { MouseButton } from '../../../src/domain/entities/mouse-action.js';
import { MouseDefaults } from '../../../src/config/mouse.config.js';

describe('NutJSMouseAdapter', () => {
  let adapter: NutJSMouseAdapter;

  beforeEach(() => {
    jest.clearAllMocks();
    adapter = new NutJSMouseAdapter();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('move', () => {
    it('deve executar movimento instantâneo quando smooth for false', async () => {
      await adapter.move({ x: 500, y: 500 }, false, 1000);

      expect(mouse.config.mouseSpeed).toBe(10000);
      expect(mouse.move).toHaveBeenCalledTimes(1);
      expect(mouse.move).toHaveBeenCalledWith({ x: 500, y: 500 });
    });

    it('deve executar interpolação linear quando smooth for true', async () => {
      // Configurar posição inicial
      (mouse.getPosition as jest.Mock).mockResolvedValueOnce({ x: 100, y: 100 });

      const targetPoint = { x: 400, y: 400 };
      const duration = 1000; // 1 segundo

      // Calcular número esperado de passos
      const expectedSteps = Math.floor((duration * MouseDefaults.sampleRate) / 1000);

      // Executar movimento
      await adapter.move(targetPoint, true, duration);

      // Verificar número de chamadas
      expect(mouse.move).toHaveBeenCalledTimes(expectedSteps);

      // Verificar primeira e última posição
      const firstCall = (mouse.move as jest.Mock).mock.calls[0][0];
      const lastCall = (mouse.move as jest.Mock).mock.calls[expectedSteps - 1][0];

      // Primeira posição deve estar próxima ao início
      expect(firstCall.x).toBeGreaterThan(100);
      expect(firstCall.x).toBeLessThan(150);

      // Última posição deve ser exatamente o destino
      expect(lastCall.x).toBe(400);
      expect(lastCall.y).toBe(400);

      // Verificar que as posições são progressivas
      for (let i = 1; i < expectedSteps; i++) {
        const prevCall = (mouse.move as jest.Mock).mock.calls[i - 1][0];
        const currCall = (mouse.move as jest.Mock).mock.calls[i][0];

        // X e Y devem aumentar progressivamente
        expect(currCall.x).toBeGreaterThanOrEqual(prevCall.x);
        expect(currCall.y).toBeGreaterThanOrEqual(prevCall.y);
      }
    });

    it('deve lidar com movimento em uma única dimensão', async () => {
      (mouse.getPosition as jest.Mock).mockResolvedValueOnce({ x: 100, y: 200 });

      // Movimento apenas horizontal
      await adapter.move({ x: 500, y: 200 }, true, 500);

      const calls = (mouse.move as jest.Mock).mock.calls;

      // Y deve permanecer constante
      calls.forEach((call) => {
        expect(call[0].y).toBe(200);
      });

      // X deve aumentar
      expect(calls[calls.length - 1][0].x).toBe(500);
    });

    it('deve executar pelo menos um passo mesmo com duração muito curta', async () => {
      (mouse.getPosition as jest.Mock).mockResolvedValueOnce({ x: 0, y: 0 });

      await adapter.move({ x: 100, y: 100 }, true, 10); // 10ms

      expect(mouse.move).toHaveBeenCalledTimes(1);
      expect(mouse.move).toHaveBeenCalledWith({ x: 100, y: 100 });
    });
  });

  describe('drag', () => {
    it('deve executar sequência correta de ações para arrastar', async () => {
      const from = { x: 100, y: 100 };
      const to = { x: 500, y: 500 };
      const duration = 900;

      await adapter.drag(from, to, duration);

      // Verificar sequência de chamadas
      const moveCalls = (mouse.move as jest.Mock).mock.calls;

      // Deve ter movido para posição inicial
      // O primeiro movimento é feito com interpolação, então vamos verificar se alguma chamada tem a posição inicial
      const hasInitialPosition = moveCalls.some(
        (call) => call[0].x === from.x && call[0].y === from.y,
      );
      expect(hasInitialPosition).toBe(true);

      // Deve ter pressionado o botão
      expect(mouse.pressButton).toHaveBeenCalledWith(Button.LEFT);

      // Deve ter movido para posição final
      const lastMoveCall = moveCalls[moveCalls.length - 1][0];
      expect(lastMoveCall).toMatchObject(to);

      // Deve ter soltado o botão
      expect(mouse.releaseButton).toHaveBeenCalledWith(Button.LEFT);
    });
  });

  describe('click', () => {
    it('deve mapear botões corretamente', async () => {
      await adapter.click(MouseButton.LEFT, false);
      expect(mouse.click).toHaveBeenCalledWith(Button.LEFT);

      await adapter.click(MouseButton.RIGHT, false);
      expect(mouse.click).toHaveBeenCalledWith(Button.RIGHT);

      await adapter.click(MouseButton.MIDDLE, false);
      expect(mouse.click).toHaveBeenCalledWith(Button.MIDDLE);
    });

    it('deve executar double click quando solicitado', async () => {
      await adapter.click(MouseButton.LEFT, true);
      expect(mouse.doubleClick).toHaveBeenCalledWith(Button.LEFT);
      expect(mouse.click).not.toHaveBeenCalled();
    });
  });

  describe('clickAt', () => {
    it('deve mover antes de clicar', async () => {
      const point = { x: 250, y: 250 };

      await adapter.clickAt(point, MouseButton.RIGHT, false);

      // Verificar que moveu primeiro
      expect(mouse.move).toHaveBeenCalled();
      const moveCalls = (mouse.move as jest.Mock).mock.calls;
      // O último movimento deve ser para a posição alvo
      const lastCall = moveCalls[moveCalls.length - 1][0];
      expect(lastCall.x).toBe(250);
      expect(lastCall.y).toBe(250);

      // Verificar que clicou depois
      expect(mouse.click).toHaveBeenCalledWith(Button.RIGHT);
    });
  });

  describe('scroll', () => {
    it('deve inverter o valor para scroll up', async () => {
      await adapter.scroll('up', 5);
      expect(mouse.scrollDown).toHaveBeenCalledWith(-5);
    });

    it('deve manter o valor positivo para scroll down', async () => {
      await adapter.scroll('down', 3);
      expect(mouse.scrollDown).toHaveBeenCalledWith(3);
    });
  });

  describe('getPosition', () => {
    it('deve retornar a posição atual do mouse', async () => {
      (mouse.getPosition as jest.Mock).mockResolvedValueOnce({ x: 123, y: 456 });

      const position = await adapter.getPosition();

      expect(position).toEqual({ x: 123, y: 456 });
    });
  });
});
