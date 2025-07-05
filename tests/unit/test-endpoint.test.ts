// Mock fetch before imports
const mockFetch = jest.fn();
global.fetch = mockFetch as any;

// Mock setTimeout to execute immediately
global.setTimeout = jest.fn((fn: any, ms: number) => {
  // Execute callback asynchronously to allow promises to settle
  Promise.resolve().then(fn);
  return 123;
}) as any;

// Mock console
jest.spyOn(console, 'log').mockImplementation();
jest.spyOn(console, 'error').mockImplementation();

describe('test-endpoint coverage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    
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
    
    // Wait for all async operations to complete
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Verify all API endpoints were called
    expect(mockFetch).toHaveBeenCalledTimes(3);
    
    // Verify specific calls
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/api/v1/mouse/position');
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/v1/mouse/move',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    );
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/v1/mouse/click',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    );
  });

  test('handles error in catch block', async () => {
    // Make first call fail
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    
    // Import module
    require('../../src/test-endpoint');
    
    // Wait for error to be processed
    await new Promise(resolve => setTimeout(resolve, 10));
    
    // Just verify fetch was called once before error
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test('verifies setTimeout usage', async () => {
    // Track setTimeout calls
    const setTimeoutCalls: any[] = [];
    global.setTimeout = jest.fn((fn: any, ms: number) => {
      setTimeoutCalls.push(ms);
      Promise.resolve().then(fn);
      return 123;
    }) as any;
    
    // Clear modules to get fresh import
    jest.resetModules();
    
    // Import module
    require('../../src/test-endpoint');
    
    // Wait for initial operations
    await new Promise(resolve => setImmediate(resolve));
    
    // Should have 2 setTimeout calls with correct delays
    expect(setTimeoutCalls).toEqual([1000, 1500]);
  });
});