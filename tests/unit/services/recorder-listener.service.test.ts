// Mock das dependências antes dos imports
jest.mock('tsyringe', () => ({
  injectable: () => (target: any) => target,
  inject: () => () => {},
}));

jest.mock('../../../src/config/logger', () => ({
  logger: {
    debug: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  },
}));

jest.mock('../../../src/config/recorder.config', () => ({
  recorderConfig: {
    moveIntervalMs: 50,
    includeScreenshot: true,
    maxScreenshotSize: 1024 * 1024,
  },
}));

jest.mock('nanoid', () => ({
  nanoid: jest.fn(() => 'test-id-123'),
}));

// Importar depois dos mocks
const {
  RecorderListenerService,
} = require('../../../src/application/services/recorder-listener.service');

describe('RecorderListenerService', () => {
  let service: any;
  let mockEventDispatcher: any;
  let mockScreenService: any;
  let mockListener: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-01-01'));

    mockEventDispatcher = {
      addListener: jest.fn(),
    };

    mockScreenService = {
      capture: jest.fn().mockResolvedValue('base64-screenshot-data'),
    };

    mockListener = jest.fn();

    service = new RecorderListenerService(mockEventDispatcher, mockScreenService);
  });

  afterEach(() => {
    service.dispose();
    jest.useRealTimers();
  });

  test('should setup event listeners on construction', () => {
    expect(mockEventDispatcher.addListener).toHaveBeenCalledWith(
      expect.objectContaining({
        onEvent: expect.any(Function),
      }),
    );
  });

  test('should add and remove listeners', () => {
    const listener1 = jest.fn();
    const listener2 = jest.fn();

    service.addListener(listener1);
    service.addListener(listener2);
    expect(service.listeners.size).toBe(2);

    service.removeListener(listener1);
    expect(service.listeners.size).toBe(1);

    service.removeListener(listener2);
    expect(service.listeners.size).toBe(0);
  });

  test('should handle all event types through eventDispatcher', async () => {
    const onEventHandler = mockEventDispatcher.addListener.mock.calls[0][0].onEvent;
    service.addListener(mockListener);

    // Test mouse click
    await onEventHandler({
      data: { action: 'click', button: 'left', x: 100, y: 200 },
    });

    // Test mouse release
    await onEventHandler({
      data: { action: 'release', button: 'right', x: 150, y: 250 },
    });

    // Test keyboard
    await onEventHandler({
      data: { action: 'down', key: 'Enter' },
    });

    // Test keyboard up
    await onEventHandler({
      data: { action: 'up', key: 'Escape' },
    });

    // Verify multiple calls
    expect(mockListener).toHaveBeenCalledTimes(4);
    expect(mockScreenService.capture).toHaveBeenCalled();
  });

  test('should handle drag and throttled move events', async () => {
    const onEventHandler = mockEventDispatcher.addListener.mock.calls[0][0].onEvent;
    service.addListener(mockListener);

    // Start drag
    await onEventHandler({
      data: { action: 'click', button: 'left', x: 0, y: 0 },
    });

    const initialCalls = mockListener.mock.calls.length;

    // Move should work
    await onEventHandler({
      data: { action: 'move', x: 10, y: 10 },
    });

    // Quick moves should be throttled
    await onEventHandler({
      data: { action: 'move', x: 20, y: 20 },
    });

    // Should only have one more call (first move)
    expect(mockListener).toHaveBeenCalledTimes(initialCalls + 1);

    // Advance time for next move
    jest.advanceTimersByTime(60);

    await onEventHandler({
      data: { action: 'move', x: 30, y: 30 },
    });

    expect(mockListener).toHaveBeenCalledTimes(initialCalls + 2);

    // End drag
    await onEventHandler({
      data: { action: 'release', button: 'left', x: 30, y: 30 },
    });

    // Move without drag should not work
    const finalCalls = mockListener.mock.calls.length;
    await onEventHandler({
      data: { action: 'move', x: 40, y: 40 },
    });

    expect(mockListener).toHaveBeenCalledTimes(finalCalls);
  });

  test('should handle screenshot errors and size limits', async () => {
    // Test error handling directly on captureScreenshot
    mockScreenService.capture.mockRejectedValueOnce(new Error('Failed'));
    const result1 = await service.captureScreenshot();
    expect(result1).toBeNull();

    // Test large screenshot directly
    const largeData = 'x'.repeat(2 * 1024 * 1024);
    mockScreenService.capture.mockResolvedValueOnce(largeData);
    const result2 = await service.captureScreenshot();
    expect(result2).toBeNull();

    // Test normal screenshot
    mockScreenService.capture.mockResolvedValueOnce('normal-data');
    const result3 = await service.captureScreenshot();
    expect(result3).toBe('normal-data');
  });

  test('should handle invalid events gracefully', async () => {
    const onEventHandler = mockEventDispatcher.addListener.mock.calls[0][0].onEvent;
    service.addListener(mockListener);

    // Various invalid events
    await onEventHandler(null);
    await onEventHandler({});
    await onEventHandler({ data: null });
    await onEventHandler({ data: {} });
    await onEventHandler({ data: { x: 100 } }); // Missing action
    await onEventHandler({ data: { action: 'invalid' } });

    // Should not crash
    expect(true).toBe(true);
  });

  test('should handle listener errors without stopping other listeners', async () => {
    const onEventHandler = mockEventDispatcher.addListener.mock.calls[0][0].onEvent;

    const errorListener = jest.fn().mockImplementation(() => {
      throw new Error('Listener error');
    });
    const goodListener = jest.fn();

    service.addListener(errorListener);
    service.addListener(goodListener);

    await onEventHandler({
      data: { action: 'down', key: 'a' },
    });

    expect(errorListener).toHaveBeenCalled();
    expect(goodListener).toHaveBeenCalled();
  });

  test('should maintain multi-button state correctly', async () => {
    const onEventHandler = mockEventDispatcher.addListener.mock.calls[0][0].onEvent;
    service.addListener(mockListener);

    // Press multiple buttons
    await onEventHandler({
      data: { action: 'click', button: 'left', x: 0, y: 0 },
    });

    await onEventHandler({
      data: { action: 'click', button: 'right', x: 0, y: 0 },
    });

    await onEventHandler({
      data: { action: 'click', button: 'middle', x: 0, y: 0 },
    });

    // Release one button, should still be dragging
    await onEventHandler({
      data: { action: 'release', button: 'left', x: 0, y: 0 },
    });

    // Clear calls and test move
    const callsBeforeMove = mockListener.mock.calls.length;

    await onEventHandler({
      data: { action: 'move', x: 100, y: 100 },
    });

    // Should have processed move (still dragging with right and middle)
    expect(mockListener.mock.calls.length).toBeGreaterThan(callsBeforeMove);

    // Release all buttons
    await onEventHandler({
      data: { action: 'release', button: 'right', x: 0, y: 0 },
    });

    await onEventHandler({
      data: { action: 'release', button: 'middle', x: 0, y: 0 },
    });

    // Now move should not work
    const finalCalls = mockListener.mock.calls.length;
    await onEventHandler({
      data: { action: 'move', x: 200, y: 200 },
    });

    expect(mockListener.mock.calls.length).toBe(finalCalls);
  });

  test('should respect configuration options', async () => {
    const { recorderConfig } = require('../../../src/config/recorder.config');
    const onEventHandler = mockEventDispatcher.addListener.mock.calls[0][0].onEvent;
    service.addListener(mockListener);

    // Disable screenshots
    recorderConfig.includeScreenshot = false;

    await onEventHandler({
      data: { action: 'click', button: 'left', x: 0, y: 0 },
    });

    expect(mockScreenService.capture).not.toHaveBeenCalled();

    // Re-enable for other tests
    recorderConfig.includeScreenshot = true;
  });

  test('should clean up resources on dispose', () => {
    // Add some state
    service.addListener(jest.fn());
    service.addListener(jest.fn());
    service.mouseState.set('left', true);
    service.mouseState.set('right', false);

    expect(service.listeners.size).toBe(2);
    expect(service.mouseState.size).toBe(2);

    service.dispose();

    expect(service.listeners.size).toBe(0);
    expect(service.mouseState.size).toBe(0);
  });

  test('should achieve maximum coverage with edge cases', async () => {
    // Direct method calls for coverage
    const testEvent = {
      id: 'test',
      timestamp: Date.now(),
      type: 'mouse' as const,
      action: 'down' as const,
      x: 0,
      y: 0,
    };

    service.notifyListeners(testEvent);

    // Test captureScreenshot directly
    const screenshot = await service.captureScreenshot();
    expect(screenshot).toBe('base64-screenshot-data');

    // Test with buffer size exactly at limit
    const exactSizeData = 'x'.repeat(1024 * 1024);
    mockScreenService.capture.mockResolvedValueOnce(exactSizeData);
    const screenshot2 = await service.captureScreenshot();
    expect(screenshot2).toBe(exactSizeData);
  });
});
