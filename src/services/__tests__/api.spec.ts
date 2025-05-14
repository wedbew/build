import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Stop } from '@/types';

// Mock the axios module
vi.mock('axios', async () => {
  return {
    default: {
      get: vi.fn()
    }
  };
});

// Import axios after mocking
import axios from 'axios';
import { fetchStops } from '../api';

describe('API Service', () => {
  const mockStops: Stop[] = [
    { line: 100, stop: 'Test Stop 1', order: 1, time: '10:00' },
    { line: 200, stop: 'Test Stop 2', order: 2, time: '10:15' }
  ];

  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch stops data successfully', async () => {
    // Setup the mock response
    vi.mocked(axios.get).mockResolvedValue({ data: mockStops });

    // Call the function
    const result = await fetchStops();

    // Verify the result
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/stops');
    expect(result).toEqual(mockStops);
  });

  it('should handle fetch error', async () => {
    // Setup the mock error
    const mockError = new Error('Network error');
    vi.mocked(axios.get).mockRejectedValue(mockError);
    
    // Spy on console.error to prevent it from actually logging during tests
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(vi.fn());

    // Verify the error is thrown
    await expect(fetchStops()).rejects.toThrow(mockError);
    
    // Verify the API call and logging
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/stops');
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching stops data:', mockError);
    
    // Restore the console spy
    consoleSpy.mockRestore();
  });
}); 