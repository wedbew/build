import { createStore } from 'vuex';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import storeConfig from '../index';
import { Stop } from '@/types';

vi.mock('@/services/api', () => ({
  fetchStops: vi.fn()
}));

import { fetchStops } from '@/services/api';

interface State {
  stops: Stop[];
  loading: boolean;
  error: string | null;
  selectedLine: number | null;
  selectedStop: string | null;
  stopsAscending: boolean;
}

const mockStops: Stop[] = [
  { line: 100, stop: 'Test Stop 1', order: 1, time: '10:00' },
  { line: 100, stop: 'Test Stop 2', order: 2, time: '10:15' },
  { line: 100, stop: 'Test Stop 1', order: 1, time: '10:30' },
  { line: 200, stop: 'Test Stop 3', order: 1, time: '11:00' }
];

describe('Store', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let store: any;

  beforeEach(() => {
    store = createStore<State>({
      ...storeConfig,
      state: {
        stops: [],
        loading: false,
        error: null,
        selectedLine: null,
        selectedStop: null,
        stopsAscending: true
      }
    });
    
    vi.clearAllMocks();
  });

  it('should have initial state', () => {
    expect(store.state.stops).toEqual([]);
    expect(store.state.loading).toBe(false);
    expect(store.state.error).toBeNull();
    expect(store.state.selectedLine).toBeNull();
    expect(store.state.selectedStop).toBeNull();
    expect(store.state.stopsAscending).toBe(true);
  });

  it('should set loading state', () => {
    store.commit('setLoading', true);
    expect(store.state.loading).toBe(true);
  });

  it('should set error state', () => {
    store.commit('setError', 'Test error');
    expect(store.state.error).toBe('Test error');
  });

  it('should set stops data', () => {
    store.commit('setStops', mockStops);
    expect(store.state.stops).toEqual(mockStops);
  });

  it('should set selected line', () => {
    store.commit('setSelectedLine', 100);
    expect(store.state.selectedLine).toBe(100);
    expect(store.state.selectedStop).toBeNull(); // Should reset selected stop
  });

  it('should set selected stop', () => {
    store.commit('setSelectedStop', 'Test Stop 1');
    expect(store.state.selectedStop).toBe('Test Stop 1');
  });

  it('should toggle stops order', () => {
    expect(store.state.stopsAscending).toBe(true);
    store.commit('toggleStopsOrder');
    expect(store.state.stopsAscending).toBe(false);
    store.commit('toggleStopsOrder');
    expect(store.state.stopsAscending).toBe(true);
  });

  it('should return unique lines sorted in ascending order', () => {
    store.commit('setStops', mockStops);
    expect(store.getters.lines).toEqual([100, 200]);
  });

  it('should return unique stops for selected line sorted by order', () => {
    store.commit('setStops', mockStops);
    store.commit('setSelectedLine', 100);
    
    // Should return unique stops by name
    expect(store.getters.stopsForSelectedLine).toEqual([
      { line: 100, stop: 'Test Stop 1', order: 1, time: '10:00' },
      { line: 100, stop: 'Test Stop 2', order: 2, time: '10:15' }
    ]);
    
    store.commit('toggleStopsOrder');
    expect(store.getters.stopsForSelectedLine).toEqual([
      { line: 100, stop: 'Test Stop 2', order: 2, time: '10:15' },
      { line: 100, stop: 'Test Stop 1', order: 1, time: '10:00' }
    ]);
  });

  it('should return times for selected line and stop sorted by time', () => {
    store.commit('setStops', mockStops);
    store.commit('setSelectedLine', 100);
    store.commit('setSelectedStop', 'Test Stop 1');
    
    expect(store.getters.timesForSelectedStop).toEqual([
      { line: 100, stop: 'Test Stop 1', order: 1, time: '10:00' },
      { line: 100, stop: 'Test Stop 1', order: 1, time: '10:30' }
    ]);
  });

  it('should return all unique stops sorted alphabetically', () => {
    store.commit('setStops', mockStops);
    expect(store.getters.allStops()).toEqual(['Test Stop 1', 'Test Stop 2', 'Test Stop 3']);
  });

  it('should filter stops by search term', () => {
    store.commit('setStops', mockStops);
    expect(store.getters.allStops('1')).toEqual(['Test Stop 1']);
    expect(store.getters.allStops('test')).toEqual(['Test Stop 1', 'Test Stop 2', 'Test Stop 3']);
  });

  it('should fetch stops data', async () => {
    vi.mocked(fetchStops).mockResolvedValue(mockStops);
    
    await store.dispatch('fetchStops');
    
    expect(fetchStops).toHaveBeenCalled();
    expect(store.state.stops).toEqual(mockStops);
    expect(store.state.loading).toBe(false);
    expect(store.state.error).toBeNull();
  });

  it('should handle fetch error', async () => {
    vi.mocked(fetchStops).mockRejectedValue(new Error('API error'));
    
    await store.dispatch('fetchStops');
    
    expect(fetchStops).toHaveBeenCalled();
    expect(store.state.stops).toEqual([]);
    expect(store.state.loading).toBe(false);
    expect(store.state.error).toBe('Failed to fetch stops data');
  });
}); 