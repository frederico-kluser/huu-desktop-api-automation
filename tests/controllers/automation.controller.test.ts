import 'reflect-metadata';
import { container } from 'tsyringe';
import { AutomationController } from '../../src/interface/controllers/automation.controller';
import { MouseService } from '../../src/application/services/mouse.service';
import { ScreenService } from '../../src/application/services/screen.service';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

// Mock das dependências
jest.mock('../../src/application/services/mouse.service');
jest.mock('../../src/application/services/screen.service');

describe('AutomationController - Screen Print', () => {
  let controller: AutomationController;
  let mockScreenService: jest.Mocked<ScreenService>;
  let mockRequest: Partial<FastifyRequest>;
  let mockReply: Partial<FastifyReply>;
  let mockServer: Partial<FastifyInstance>;

  beforeEach(() => {
    // Limpa container e mocks
    container.clearInstances();
    jest.clearAllMocks();

    // Cria mocks dos serviços
    mockScreenService = {
      capture: jest.fn(),
      findTemplate: jest.fn(),
      waitForTemplate: jest.fn(),
    } as any;

    // Registra mocks no container
    container.registerInstance('ScreenService', mockScreenService);
    container.registerInstance('MouseService', {} as any);

    // Instancia controller
    controller = new AutomationController();

    // Mock do request e reply
    mockRequest = {};
    mockReply = {
      send: jest.fn().mockReturnThis(),
      code: jest.fn().mockReturnThis(),
    };

    // Mock do server
    mockServer = {
      get: jest.fn(),
      post: jest.fn(),
    };
  });

  describe('GET /screen/print', () => {
    it('deve capturar a tela com sucesso e retornar base64', async () => {
      // Arrange
      const mockBase64 =
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
      const mockCaptureResult = `data:image/png;base64,${mockBase64}`;
      mockScreenService.capture.mockResolvedValue(mockCaptureResult);

      // Act
      controller.registerRoutes(mockServer as FastifyInstance);

      // Captura o handler registrado
      const routeCall = (mockServer.get as jest.Mock).mock.calls.find(
        (call) => call[0] === '/screen/print',
      );
      const handler = routeCall[2];

      // Executa o handler
      await handler(mockRequest, mockReply);

      // Assert
      expect(mockScreenService.capture).toHaveBeenCalledWith({ format: 'png' });
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        data: {
          image: mockBase64,
          timestamp: expect.any(Number),
          format: 'png',
        },
      });
    });

    it('deve retornar erro quando a captura falhar', async () => {
      // Arrange
      const mockError = new Error('CAPTURE_FAILED');
      mockScreenService.capture.mockRejectedValue(mockError);

      // Act
      controller.registerRoutes(mockServer as FastifyInstance);

      const routeCall = (mockServer.get as jest.Mock).mock.calls.find(
        (call) => call[0] === '/screen/print',
      );
      const handler = routeCall[2];

      await handler(mockRequest, mockReply);

      // Assert
      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        error: 'CAPTURE_FAILED',
      });
    });

    it('deve retornar erro quando a imagem exceder 1MB', async () => {
      // Arrange
      const largeBase64 = 'a'.repeat(1_000_001);
      const mockCaptureResult = `data:image/png;base64,${largeBase64}`;
      mockScreenService.capture.mockResolvedValue(mockCaptureResult);

      // Act
      controller.registerRoutes(mockServer as FastifyInstance);

      const routeCall = (mockServer.get as jest.Mock).mock.calls.find(
        (call) => call[0] === '/screen/print',
      );
      const handler = routeCall[2];

      await handler(mockRequest, mockReply);

      // Assert
      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        error: 'IMAGE_TOO_LARGE',
      });
    });

    it('deve registrar a rota com o schema correto', () => {
      // Act
      controller.registerRoutes(mockServer as FastifyInstance);

      // Assert
      const routeCall = (mockServer.get as jest.Mock).mock.calls.find(
        (call) => call[0] === '/screen/print',
      );

      expect(routeCall).toBeDefined();
      expect(routeCall[1]).toHaveProperty('schema');
      expect(routeCall[1].schema).toHaveProperty('response');
      expect(routeCall[1].schema.response[200]).toEqual({
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          data: {
            type: 'object',
            properties: {
              image: { type: 'string' },
              timestamp: { type: 'number' },
              format: { type: 'string' },
            },
          },
        },
      });
    });
  });
});
