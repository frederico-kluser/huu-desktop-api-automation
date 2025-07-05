import 'reflect-metadata';
import { EventBuffer } from '../../../src/application/services/event-buffer.service';
import { type InputEvent } from '../../../src/types/input-event.types';

// Mock do logger
jest.mock('../../../src/config/logger', () => ({
  logger: {
    info: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
    warn: jest.fn()
  }
}));

describe('EventBuffer', () => {
  let eventBuffer: EventBuffer;
  const mockEvent: InputEvent = {
    id: 'test-id-1',
    source: 'mouse',
    button: 'left',
    x: 100,
    y: 200,
    ts: Date.now()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock do process.env
    process.env.INPUT_EVENT_BUFFER = '5'; // Buffer pequeno para testes
    eventBuffer = new EventBuffer();
  });

  afterEach(() => {
    delete process.env.INPUT_EVENT_BUFFER;
  });

  describe('constructor', () => {
    it('should initialize with default buffer size', () => {
      delete process.env.INPUT_EVENT_BUFFER;
      const buffer = new EventBuffer();
      expect(buffer.getSize()).toBe(0);
    });

    it('should initialize with custom buffer size from env', () => {
      process.env.INPUT_EVENT_BUFFER = '10';
      const buffer = new EventBuffer();
      expect(buffer.getSize()).toBe(0);
    });
  });

  describe('add', () => {
    it('should add event to buffer', () => {
      eventBuffer.add(mockEvent);
      expect(eventBuffer.getSize()).toBe(1);
    });

    it('should handle circular buffer overflow', () => {
      // Adiciona mais eventos que o tamanho do buffer
      for (let i = 0; i < 10; i++) {
        eventBuffer.add({
          ...mockEvent,
          id: `test-id-${i}`
        });
      }
      expect(eventBuffer.getSize()).toBe(5); // Limitado ao maxSize
    });
  });

  describe('getEventsAfter', () => {
    beforeEach(() => {
      // Adiciona alguns eventos
      for (let i = 0; i < 3; i++) {
        eventBuffer.add({
          ...mockEvent,
          id: `test-id-${i}`,
          ts: Date.now() + i
        });
      }
    });

    it('should return all events when afterId is null', () => {
      const events = eventBuffer.getEventsAfter(null);
      expect(events).toHaveLength(3);
    });

    it('should return events after specified id', () => {
      const events = eventBuffer.getEventsAfter('test-id-1');
      expect(events).toHaveLength(1);
      expect(events[0].id).toBe('test-id-2');
    });

    it('should return empty array when afterId not found', () => {
      const events = eventBuffer.getEventsAfter('non-existent-id');
      expect(events).toHaveLength(0);
    });

    it('should handle last event id', () => {
      const events = eventBuffer.getEventsAfter('test-id-2');
      expect(events).toHaveLength(0);
    });
  });

  describe('getAllEvents', () => {
    it('should return empty array when buffer is empty', () => {
      const events = eventBuffer.getAllEvents();
      expect(events).toHaveLength(0);
    });

    it('should return all events in buffer', () => {
      eventBuffer.add(mockEvent);
      eventBuffer.add({ ...mockEvent, id: 'test-id-2' });
      const events = eventBuffer.getAllEvents();
      expect(events).toHaveLength(2);
    });

    it('should maintain order after circular buffer wraps', () => {
      // Adiciona eventos além da capacidade
      for (let i = 0; i < 7; i++) {
        eventBuffer.add({
          ...mockEvent,
          id: `test-id-${i}`
        });
      }
      const events = eventBuffer.getAllEvents();
      expect(events).toHaveLength(5);
      expect(events[0].id).toBe('test-id-2');
      expect(events[4].id).toBe('test-id-6');
    });
  });

  describe('getEventsSince', () => {
    const baseTime = Date.now();

    beforeEach(() => {
      // Adiciona eventos com timestamps diferentes
      for (let i = 0; i < 3; i++) {
        eventBuffer.add({
          ...mockEvent,
          id: `test-id-${i}`,
          ts: baseTime + (i * 1000)
        });
      }
    });

    it('should return events after specified timestamp', () => {
      const events = eventBuffer.getEventsSince(baseTime + 1500);
      expect(events).toHaveLength(1);
      expect(events[0].id).toBe('test-id-2');
    });

    it('should return all events when timestamp is 0', () => {
      const events = eventBuffer.getEventsSince(0);
      expect(events).toHaveLength(3);
    });

    it('should return empty array when no events match', () => {
      const events = eventBuffer.getEventsSince(baseTime + 5000);
      expect(events).toHaveLength(0);
    });
  });

  describe('clear', () => {
    it('should clear all events from buffer', () => {
      eventBuffer.add(mockEvent);
      eventBuffer.add({ ...mockEvent, id: 'test-id-2' });
      expect(eventBuffer.getSize()).toBe(2);
      
      eventBuffer.clear();
      expect(eventBuffer.getSize()).toBe(0);
      expect(eventBuffer.getAllEvents()).toHaveLength(0);
    });
  });

  describe('getSize', () => {
    it('should return current buffer size', () => {
      expect(eventBuffer.getSize()).toBe(0);
      eventBuffer.add(mockEvent);
      expect(eventBuffer.getSize()).toBe(1);
    });
  });

  describe('getLastEventId', () => {
    it('should return null when buffer is empty', () => {
      expect(eventBuffer.getLastEventId()).toBeNull();
    });

    it('should return last added event id', () => {
      eventBuffer.add(mockEvent);
      eventBuffer.add({ ...mockEvent, id: 'test-id-2' });
      expect(eventBuffer.getLastEventId()).toBe('test-id-2');
    });

    it('should return correct id after buffer wraps', () => {
      for (let i = 0; i < 7; i++) {
        eventBuffer.add({
          ...mockEvent,
          id: `test-id-${i}`
        });
      }
      expect(eventBuffer.getLastEventId()).toBe('test-id-6');
    });
  });

  describe('pruneOldEvents', () => {
    const baseTime = Date.now();

    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(baseTime);
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should remove events older than maxAge', () => {
      // Adiciona eventos em momentos diferentes
      eventBuffer.add({ ...mockEvent, id: 'old-1' });
      
      jest.advanceTimersByTime(5000);
      eventBuffer.add({ ...mockEvent, id: 'old-2' });
      
      jest.advanceTimersByTime(5000);
      eventBuffer.add({ ...mockEvent, id: 'recent-1' });
      
      // Remove eventos mais antigos que 8 segundos
      const removed = eventBuffer.pruneOldEvents(8000);
      
      expect(removed).toBe(1);
      expect(eventBuffer.getSize()).toBe(2);
      
      const remainingEvents = eventBuffer.getAllEvents();
      expect(remainingEvents[0].id).toBe('old-2');
      expect(remainingEvents[1].id).toBe('recent-1');
    });

    it('should return 0 when no events are pruned', () => {
      eventBuffer.add(mockEvent);
      const removed = eventBuffer.pruneOldEvents(60000);
      expect(removed).toBe(0);
      expect(eventBuffer.getSize()).toBe(1);
    });

    it('should handle empty buffer', () => {
      const removed = eventBuffer.pruneOldEvents(1000);
      expect(removed).toBe(0);
    });

    it('should remove all events when all are old', () => {
      eventBuffer.add({ ...mockEvent, id: 'old-1' });
      eventBuffer.add({ ...mockEvent, id: 'old-2' });
      
      jest.advanceTimersByTime(10000);
      
      const removed = eventBuffer.pruneOldEvents(5000);
      expect(removed).toBe(2);
      expect(eventBuffer.getSize()).toBe(0);
    });
  });

  describe('edge cases', () => {
    it('should handle undefined buffer entries gracefully', () => {
      // Força uma situação com entrada undefined
      eventBuffer.add(mockEvent);
      eventBuffer['buffer'][0] = undefined as any;
      
      const events = eventBuffer.getAllEvents();
      expect(events).toHaveLength(0);
    });

    it('should handle invalid process.env value', () => {
      process.env.INPUT_EVENT_BUFFER = 'not-a-number';
      // O parseInt retorna NaN, que causa erro no Array constructor
      // Precisamos verificar se o erro é tratado apropriadamente
      expect(() => new EventBuffer()).toThrow();
    });
  });
});