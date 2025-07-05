/**
 * Testes de integração para o endpoint de streaming de posição do mouse
 */
import 'reflect-metadata';
import Fastify, { FastifyInstance } from 'fastify';
import { container } from 'tsyringe';
import { AutomationController } from '../../src/interface/controllers/automation.controller.js';
import { MouseService, type IMouseAdapter } from '../../src/application/services/mouse.service.js';
import { environment } from '../../src/config/environment.js';
import EventSource from 'eventsource';

describe('Mouse Position Stream Endpoint', () => {
  let app: FastifyInstance;
  let mockMouseAdapter: jest.Mocked<IMouseAdapter>;
  let mockScreenService: any;
  let eventSource: EventSource;
  const testPort = 3001;
  const baseUrl = `http://localhost:${testPort}`;

  beforeAll(async () => {
    // Configurar intervalo mais rápido para os testes
    process.env.MOUSE_STREAM_INTERVAL = '50';
    // Criar mock do adapter
    mockMouseAdapter = {
      move: jest.fn().mockResolvedValue(undefined),
      click: jest.fn().mockResolvedValue(undefined),
      clickAt: jest.fn().mockResolvedValue(undefined),
      drag: jest.fn().mockResolvedValue(undefined),
      scroll: jest.fn().mockResolvedValue(undefined),
      getPosition: jest.fn(),
    };

    // Criar mock do ScreenService
    mockScreenService = {
      capture: jest.fn().mockResolvedValue(Buffer.from('fake-image')),
      find: jest.fn().mockResolvedValue({ x: 100, y: 100 }),
    };

    // Registrar mocks no container
    container.register('MouseAdapter', { useValue: mockMouseAdapter });
    container.register('MouseService', { useClass: MouseService });
    container.register('ScreenService', { useValue: mockScreenService });

    // Criar instância do Fastify
    app = Fastify({ logger: false });
    
    // Registrar rotas
    const controller = new AutomationController();
    controller.registerRoutes(app);

    // Iniciar servidor
    await app.listen({ port: testPort });
  });

  afterAll(async () => {
    await app.close();
    container.clearInstances();
    // Restaurar configuração original
    delete process.env.MOUSE_STREAM_INTERVAL;
  });

  afterEach(() => {
    if (eventSource) {
      eventSource.close();
    }
    // Resetar apenas as chamadas, não as implementações
    jest.clearAllMocks();
  });

  beforeEach(() => {
    // Configurar mock para cada teste
    let positionCounter = 0;
    mockMouseAdapter.getPosition.mockImplementation(() => {
      const positions = [
        { x: 100, y: 100 },
        { x: 150, y: 150 },
        { x: 200, y: 200 },
        { x: 250, y: 250 },
        { x: 300, y: 300 },
        { x: 350, y: 350 },
      ];
      const position = positions[positionCounter] || { x: 400, y: 400 };
      positionCounter++;
      return Promise.resolve(position);
    });
  });

  describe('GET /mouse/position/stream', () => {
    it('deve retornar 401 quando API key não for fornecida', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/mouse/position/stream',
      });

      expect(response.statusCode).toBe(401);
      expect(JSON.parse(response.body)).toEqual({
        success: false,
        error: 'Unauthorized',
      });
    });

    it('deve retornar 401 quando API key for inválida', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/mouse/position/stream',
        headers: {
          'x-api-key': 'invalid-key',
        },
      });

      expect(response.statusCode).toBe(401);
    });

    it('deve enviar stream de posições quando API key for válida', (done) => {
      const receivedData: any[] = [];
      const expectedMinEvents = 2;

      // Criar EventSource com headers
      eventSource = new EventSource(`${baseUrl}/mouse/position/stream`, {
        headers: {
          'x-api-key': environment.apiKey,
        },
      });

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        receivedData.push(data);

        // Verificar estrutura dos dados
        expect(data).toHaveProperty('x');
        expect(data).toHaveProperty('y');
        expect(data).toHaveProperty('timestamp');
        expect(typeof data.x).toBe('number');
        expect(typeof data.y).toBe('number');
        expect(typeof data.timestamp).toBe('number');

        // Após receber eventos suficientes, verificar e encerrar
        if (receivedData.length >= expectedMinEvents) {
          eventSource.close();
          
          // Verificar que recebemos posições diferentes
          expect(receivedData[0].x).toBe(100);
          expect(receivedData[0].y).toBe(100);
          expect(receivedData[1].x).toBe(150);
          expect(receivedData[1].y).toBe(150);
          
          // Verificar que getPosition foi chamado múltiplas vezes
          expect(mockMouseAdapter.getPosition).toHaveBeenCalledTimes(receivedData.length);
          
          done();
        }
      };

      eventSource.onerror = (error) => {
        done(error);
      };
    }, 2000); // Timeout de 2 segundos

    it('deve parar de enviar eventos quando a conexão for fechada', (done) => {
      let eventCount = 0;

      eventSource = new EventSource(`${baseUrl}/mouse/position/stream`, {
        headers: {
          'x-api-key': environment.apiKey,
        },
      });

      eventSource.onmessage = () => {
        eventCount++;
        
        // Fechar após primeiro evento
        if (eventCount === 1) {
          eventSource.close();
          
          // Aguardar um pouco e verificar que não há mais chamadas
          setTimeout(() => {
            const callsAfterFirstEvent = mockMouseAdapter.getPosition.mock.calls.length;
            
            setTimeout(() => {
              // Verificar que não houve novas chamadas
              expect(mockMouseAdapter.getPosition).toHaveBeenCalledTimes(callsAfterFirstEvent);
              done();
            }, 50);
          }, 50);
        }
      };

      eventSource.onerror = (error) => {
        done(error);
      };
    });
  });

  describe('Performance do streaming', () => {
    it('deve enviar pelo menos 5 eventos em 1 segundo', (done) => {
      const startTime = Date.now();
      const receivedEvents: any[] = [];
      const minExpectedEvents = 5;

      eventSource = new EventSource(`${baseUrl}/mouse/position/stream`, {
        headers: {
          'x-api-key': environment.apiKey,
        },
      });

      eventSource.onmessage = (event) => {
        receivedEvents.push(JSON.parse(event.data));

        const elapsedTime = Date.now() - startTime;
        
        // Após 1 segundo, verificar número de eventos
        if (elapsedTime >= 1000) {
          eventSource.close();
          
          expect(receivedEvents.length).toBeGreaterThanOrEqual(minExpectedEvents);
          
          // Verificar que os timestamps estão em ordem crescente
          for (let i = 1; i < receivedEvents.length; i++) {
            expect(receivedEvents[i].timestamp).toBeGreaterThan(receivedEvents[i - 1].timestamp);
          }
          
          done();
        }
      };

      eventSource.onerror = (error) => {
        done(error);
      };
    }, 1500);
  });
});