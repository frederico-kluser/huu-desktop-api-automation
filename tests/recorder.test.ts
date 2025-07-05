/**
 * Testes para o sistema de gravação
 */

import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { RecorderListenerService } from '../src/application/services/recorder-listener.service.js';
import { EventDispatcher } from '../src/application/services/event-dispatcher.service.js';
import { ScreenService } from '../src/application/services/screen.service.js';
import { RecordedEvent } from '../src/types/recorder-event.types.js';

// Mock das dependências
jest.mock('../src/application/services/event-dispatcher.service.js');
jest.mock('../src/application/services/screen.service.js');
jest.mock('../src/config/recorder.config.js', () => ({
  recorderConfig: {
    includeScreenshot: true,
    moveIntervalMs: 50,
    maxScreenshotSize: 2097152
  }
}));

describe('RecorderListenerService', () => {
  let service: RecorderListenerService;
  let eventDispatcher: jest.Mocked<EventDispatcher>;
  let screenService: any;
  let recordedEvents: RecordedEvent[] = [];
  
  beforeEach(() => {
    // Limpar mocks
    jest.clearAllMocks();
    recordedEvents = [];
    
    // Criar mocks
    eventDispatcher = new EventDispatcher() as jest.Mocked<EventDispatcher>;
    screenService = {
      capture: jest.fn((request: any) => Promise.resolve('data:image/png;base64,base64_screenshot_data'))
    };
    
    // Criar serviço
    service = new RecorderListenerService(eventDispatcher, screenService);
    
    // Adicionar listener para capturar eventos
    service.addListener((event) => {
      recordedEvents.push(event);
    });
  });
  
  afterEach(() => {
    service.dispose();
  });
  
  describe('Mouse Events', () => {
    it('deve gravar evento de mouse down com screenshot', async () => {
      // Simular evento de mouse click
      const inputEvent = {
        id: 'test-1',
        type: 'mouse' as const,
        timestamp: Date.now(),
        cursorX: 100,
        cursorY: 200,
        data: {
          action: 'click',
          x: 100,
          y: 200,
          button: 'left' as const
        }
      };
      
      // Chamar handler diretamente
      await (service as any).handleInputEvent(inputEvent);
      
      // Verificar evento gravado
      expect(recordedEvents).toHaveLength(1);
      expect(recordedEvents[0]).toMatchObject({
        type: 'mouse',
        action: 'down',
        x: 100,
        y: 200,
        button: 'left',
        screenshot: 'data:image/png;base64,base64_screenshot_data'
      });
      
      // Verificar que screenshot foi capturado
      expect(screenService.capture).toHaveBeenCalledTimes(1);
    });
    
    it('deve gravar evento de mouse up sem screenshot', async () => {
      // Simular evento de mouse release
      const inputEvent = {
        id: 'test-2',
        type: 'mouse' as const,
        timestamp: Date.now(),
        cursorX: 100,
        cursorY: 200,
        data: {
          action: 'release',
          x: 100,
          y: 200,
          button: 'left' as const
        }
      };
      
      // Chamar handler
      await (service as any).handleInputEvent(inputEvent);
      
      // Verificar evento gravado
      expect(recordedEvents).toHaveLength(1);
      expect(recordedEvents[0]).toMatchObject({
        type: 'mouse',
        action: 'up',
        x: 100,
        y: 200,
        button: 'left'
      });
      expect('screenshot' in recordedEvents[0] ? recordedEvents[0].screenshot : undefined).toBeUndefined();
      
      // Verificar que screenshot NÃO foi capturado
      expect(screenService.capture).not.toHaveBeenCalled();
    });
  });
  
  describe('Keyboard Events', () => {
    it('deve gravar evento de tecla pressionada', async () => {
      // Simular evento de keyboard down
      const inputEvent = {
        id: 'test-3',
        type: 'keyboard' as const,
        timestamp: Date.now(),
        cursorX: 0,
        cursorY: 0,
        data: {
          key: 'a',
          action: 'down'
        }
      };
      
      // Chamar handler
      await (service as any).handleInputEvent(inputEvent);
      
      // Verificar evento gravado
      expect(recordedEvents).toHaveLength(1);
      expect(recordedEvents[0]).toMatchObject({
        type: 'keyboard',
        action: 'down',
        key: 'a'
      });
    });
    
    it('deve gravar evento de tecla solta', async () => {
      // Simular evento de keyboard up
      const inputEvent = {
        id: 'test-4',
        type: 'keyboard' as const,
        timestamp: Date.now(),
        cursorX: 0,
        cursorY: 0,
        data: {
          key: 'a',
          action: 'up'
        }
      };
      
      // Chamar handler
      await (service as any).handleInputEvent(inputEvent);
      
      // Verificar evento gravado
      expect(recordedEvents).toHaveLength(1);
      expect(recordedEvents[0]).toMatchObject({
        type: 'keyboard',
        action: 'up',
        key: 'a'
      });
    });
  });
  
  describe('Listener Management', () => {
    it('deve adicionar e remover listeners', () => {
      const listener = jest.fn();
      
      // Adicionar listener
      service.addListener(listener);
      
      // Remover listener
      service.removeListener(listener);
      
      // Verificar que listener foi removido
      expect((service as any).listeners.size).toBe(1); // Apenas o listener de teste
    });
  });
});