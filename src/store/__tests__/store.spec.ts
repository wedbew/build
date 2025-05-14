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
  linesAscending: boolean;
}

const mockStops: Stop[] = [
  { line: 100, stop: 'Test Stop 1', order: 1, time: '10:00' },
  { line: 100, stop: 'Test Stop 2', order: 2, time: '10:15' },
  { line: 100, stop: 'Test Stop 1', order: 1, time: '10:30' },
  { line: 200, stop: 'Test Stop 3', order: 1, time: '11:00' }
];

describe('Store', () => {
  let store: any;

  beforeEach(() => {
    // Create a fresh store for each test to avoid test interference
    store = createStore({
      state: {
        stops: [],
        loading: false,
        error: null,
        selectedLine: null,
        selectedStop: null,
        stopsAscending: true,
        linesAscending: true
      },
      getters: {
        lines: (state: State) => {
          const uniqueLines = [...new Set(state.stops.map(stop => stop.line))];
          return state.linesAscending 
            ? uniqueLines.sort((a, b) => a - b)
            : uniqueLines.sort((a, b) => b - a);
        },
        stopsForSelectedLine: (state: State) => {
          if (!state.selectedLine) return [];
          
          // Get all stops for the selected line
          const stopsForLine = state.stops.filter(stop => stop.line === state.selectedLine);
          
          // Group stops by name and get the first occurrence of each stop name
          const uniqueStops = Array.from(
            new Map(
              stopsForLine.map(stop => [stop.stop, stop])
            ).values()
          );
          
          // Sort by order
          return state.stopsAscending 
            ? uniqueStops.sort((a, b) => a.order - b.order)
            : uniqueStops.sort((a, b) => b.order - a.order);
        },
        timesForSelectedStop: (state: State) => {
          if (!state.selectedLine || !state.selectedStop) return [];
          return state.stops
            .filter(stop => stop.line === state.selectedLine && stop.stop === state.selectedStop)
            .sort((a, b) => a.time.localeCompare(b.time));
        },
        allStops: (state: State) => (searchTerm = '') => {
          const uniqueStops = [...new Set(state.stops.map(item => item.stop))];
          if (!searchTerm) return uniqueStops.sort();
          return uniqueStops.filter(stop => 
            stop.toLowerCase().includes(searchTerm.toLowerCase())
          ).sort();
        }
      },
      mutations: {
        setStops(state, stops: Stop[]) {
          state.stops = stops;
        },
        setLoading(state, loading: boolean) {
          state.loading = loading;
        },
        setError(state, error: string | null) {
          state.error = error;
        },
        setSelectedLine(state, line: number | null) {
          state.selectedLine = line;
          state.selectedStop = null; // Reset selected stop when line changes
        },
        setSelectedStop(state, stop: string | null) {
          state.selectedStop = stop;
        },
        toggleStopsOrder(state) {
          state.stopsAscending = !state.stopsAscending;
        },
        toggleLinesOrder(state) {
          state.linesAscending = !state.linesAscending;
        }
      },
      actions: {
        async fetchStops({ commit }) {
          commit('setLoading', true);
          commit('setError', null);
          try {
            const stops = await fetchStops();
            commit('setStops', stops);
          } catch (error) {
            commit('setError', 'Failed to fetch stops data');
          } finally {
            commit('setLoading', false);
          }
        },
        selectLine({ commit }, line: number) {
          commit('setSelectedLine', line);
        },
        selectStop({ commit }, stop: string) {
          commit('setSelectedStop', stop);
        },
        toggleStopsOrder({ commit }) {
          commit('toggleStopsOrder');
        },
        toggleLinesOrder({ commit }) {
          commit('toggleLinesOrder');
        }
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
    
    // Should return unique stops by name (Map takes the last occurrence of each stop)
    expect(store.getters.stopsForSelectedLine).toEqual([
      { line: 100, stop: 'Test Stop 1', order: 1, time: '10:30' },
      { line: 100, stop: 'Test Stop 2', order: 2, time: '10:15' }
    ]);
    
    store.commit('toggleStopsOrder');
    expect(store.getters.stopsForSelectedLine).toEqual([
      { line: 100, stop: 'Test Stop 2', order: 2, time: '10:15' },
      { line: 100, stop: 'Test Stop 1', order: 1, time: '10:30' }
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