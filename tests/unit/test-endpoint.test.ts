// Mock fetch before imports
const mockFetch = jest.fn();
global.fetch = mockFetch as any;

// Store setTimeout callbacks for controlled execution
let timeoutCallbacks: Array<{ fn: Function; ms: number }> = [];
global.setTimeout = jest.fn((fn: any, ms: number) => {
  timeoutCallbacks.push({ fn, ms });
  return timeoutCallbacks.length;
}) as any;

describe('test-endpoint coverage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    timeoutCallbacks = [];

    // Mock console
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();

    // Default mock response
    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: true }),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('executes all functions successfully - covers all lines', async () => {
    // Import module which triggers runTests()
    require('../../src/test-endpoint');

    // Wait for initial async operations to complete
    await new Promise((resolve) => setImmediate(resolve));

    // First call to testMousePosition should have happened
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/api/v1/mouse/position');

    // Execute first setTimeout callback (1000ms delay)
    await timeoutCallbacks[0].fn();
    await new Promise((resolve) => setImmediate(resolve));

    // Second call to testMouseMove should have happened
    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/v1/mouse/move',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    // Execute second setTimeout callback (1500ms delay)
    await timeoutCallbacks[1].fn();
    await new Promise((resolve) => setImmediate(resolve));

    // Third call to testMouseClick should have happened
    expect(mockFetch).toHaveBeenCalledTimes(3);
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/v1/mouse/click',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  });

  test('handles error in catch block', async () => {
    // Make first call fail
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    // Import module
    require('../../src/test-endpoint');

    // Wait for error to be processed
    await new Promise((resolve) => setImmediate(resolve));

    // Just verify fetch was called once before error
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalled();
  });

  test('verifies setTimeout usage', async () => {
    // Clear modules to get fresh import
    jest.resetModules();
    timeoutCallbacks = [];

    // Ensure fetch succeeds for this test
    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: true }),
    });

    // Import module
    require('../../src/test-endpoint');

    // Wait for initial operations
    await new Promise((resolve) => setImmediate(resolve));

    // Execute first setTimeout callback
    await timeoutCallbacks[0].fn();
    await new Promise((resolve) => setImmediate(resolve));

    // Now we should have the second setTimeout
    expect(timeoutCallbacks.length).toBe(2);
    expect(timeoutCallbacks[0].ms).toBe(1000);
    expect(timeoutCallbacks[1].ms).toBe(1500);
  });
});
