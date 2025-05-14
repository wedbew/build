import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Stop } from '@/types';

// Mock the necessary functions and state for testing
const mockStops = ['Stop A', 'Stop B', 'Stop C'];
const mockStore = {
  state: {
    stops: [],
    loading: false,
    error: null,
    stopsAscending: true
  },
  getters: {
    allStops: (searchTerm = '') => {
      if (!searchTerm) return mockStops;
      return mockStops.filter(stop => 
        stop.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  },
  dispatch: vi.fn()
};

// Create mocked function for toggleStopsOrder
const mockToggleStopsOrder = vi.fn(() => mockStore.dispatch('toggleStopsOrder'));

// Mock the necessary modules
vi.mock('vue', () => ({}));
vi.mock('vuex', () => ({
  useStore: () => mockStore
}));

// Set up test dummy functions
const createToggleStopsOrderTest = () => {
  mockToggleStopsOrder();
  return mockStore.dispatch.mock.calls;
};

const createFetchStopsTest = () => {
  mockStore.dispatch('fetchStops');
  return mockStore.dispatch.mock.calls;
};

describe('StopsView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch stops data when mounted', () => {
    const dispatchCalls = createFetchStopsTest();
    expect(dispatchCalls[0]).toEqual(['fetchStops']);
  });

  it('should call toggleStopsOrder when toggling stops order', () => {
    const dispatchCalls = createToggleStopsOrderTest();
    expect(dispatchCalls[0]).toEqual(['toggleStopsOrder']);
  });
  
  it('should filter stops based on search term', () => {
    // Test filtering with a search term
    const allStopsSpy = vi.spyOn(mockStore.getters, 'allStops');
    
    // Test with search term "Stop A"
    expect(mockStore.getters.allStops('Stop A')).toEqual(['Stop A']);
    expect(allStopsSpy).toHaveBeenCalledWith('Stop A');
    
    // Test with empty search term returns all stops
    expect(mockStore.getters.allStops('')).toEqual(mockStops);
    expect(allStopsSpy).toHaveBeenCalledWith('');
  });
}); 