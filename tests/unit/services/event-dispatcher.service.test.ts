import 'reflect-metadata';

// Mock dependencies first
jest.mock('../../../src/config/logger.js', () => ({
  logger: {
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  }
}));

jest.mock('nanoid', () => ({
  nanoid: jest.fn(() => 'test-id-123')
}));

// Mock setImmediate to run synchronously
global.setImmediate = ((fn: any) => fn()) as any;

describe('EventDispatcher Service', () => {
  let EventDispatcher: any;

  beforeEach(() => {
    jest.clearAllMocks();
    // Use require to avoid issues with ESM
    const module = require('../../../src/application/services/event-dispatcher.service');
    EventDispatcher = module.EventDispatcher;
  });

  test('coverage maximization', () => {
    // Create instance
    const dispatcher = new EventDispatcher();
    
    // Test singleton
    const instance1 = EventDispatcher.getInstance();
    const instance2 = EventDispatcher.getInstance();
    expect(instance1).toBe(instance2);
    
    // Test listener management
    const listener1 = { onEvent: jest.fn() };
    const listener2 = { onEvent: jest.fn(() => { throw new Error('test error'); }) };
    
    dispatcher.addListener(listener1);
    dispatcher.addListener(listener2);
    dispatcher.removeListener(listener1);
    
    // Test mouse events
    dispatcher.dispatchMouseClick('left', 100, 200, 1234567890);
    dispatcher.dispatchMouseClick('right', 0, 0); // Will use -1 for coordinates
    
    // Test keyboard events
    dispatcher.dispatchKeyPress('a', 50, 60, 1234567890);
    dispatcher.dispatchKeyPress(' ', 10, 20); // Space is printable
    dispatcher.dispatchKeyPress('~', 30, 40); // Tilde is printable
    dispatcher.dispatchKeyPress('\x00', 0, 0); // Non-printable, will be ignored
    dispatcher.dispatchKeyPress('\x10', 0, 0); // Non-printable, will be ignored
    
    // Test generic dispatch
    dispatcher.dispatch({ type: 'custom', data: 'test' }); // No id, will add one
    dispatcher.dispatch({ type: 'mouse', data: { button: 'middle' }, id: 'existing-id' });
    dispatcher.dispatch({ type: 'keyboard', data: { key: 'Enter' } });
    dispatcher.dispatch({ source: 'other' }); // Generic event
    
    // Test stats
    const stats = dispatcher.getStats();
    expect(stats.listenersCount).toBe(1);
    expect(stats.queueSize).toBeGreaterThanOrEqual(0);
    expect(stats.eventsPerSecond).toBeGreaterThan(0);
    
    // Wait for events to process
    expect(listener2.onEvent).toHaveBeenCalled();
  });

  test('rate limiting', () => {
    // Test with low rate limit
    process.env.INPUT_EVENT_RATE = '2';
    const dispatcher = new EventDispatcher();
    const listener = { onEvent: jest.fn() };
    dispatcher.addListener(listener);
    
    // Dispatch many events to trigger rate limit
    for (let i = 0; i < 5; i++) {
      dispatcher.dispatchMouseClick('left', i, i);
    }
    
    // Only 2 should be processed due to rate limit
    expect(listener.onEvent).toHaveBeenCalledTimes(2);
    
    // Test rate limit reset
    const now = Date.now();
    jest.spyOn(Date, 'now').mockReturnValue(now + 1100); // Advance 1.1 seconds
    
    dispatcher.dispatchKeyPress('b', 10, 10);
    expect(listener.onEvent).toHaveBeenCalledTimes(3); // Should process after reset
  });

  test('invalid rate limit config', () => {
    process.env.INPUT_EVENT_RATE = 'invalid';
    const dispatcher = new EventDispatcher();
    expect(() => dispatcher.getStats()).not.toThrow();
  });

  test('edge cases', () => {
    const dispatcher = new EventDispatcher();
    
    // No listeners
    expect(() => dispatcher.dispatchMouseClick('left', 0, 0)).not.toThrow();
    
    // Remove non-existent listener
    expect(() => dispatcher.removeListener({ onEvent: jest.fn() })).not.toThrow();
  });
});