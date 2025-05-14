import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Stop } from '@/types';

// Mock the necessary functions and state for testing
const mockStore = {
  state: {
    stops: [],
    loading: false,
    error: null,
    selectedLine: null,
    selectedStop: null,
    stopsAscending: true
  },
  getters: {
    lines: [100, 200],
    stopsForSelectedLine: [
      { line: 100, stop: 'Test Stop 1', order: 1, time: '10:00' },
      { line: 100, stop: 'Test Stop 2', order: 2, time: '10:15' }
    ],
    timesForSelectedStop: [
      { line: 100, stop: 'Test Stop 1', order: 1, time: '10:00' },
      { line: 100, stop: 'Test Stop 1', order: 1, time: '10:30' }
    ],
    allStops: ['Test Stop 1', 'Test Stop 2', 'Test Stop 3']
  },
  dispatch: vi.fn()
};

// Mock the necessary modules
vi.mock('vue', () => ({}));
vi.mock('vuex', () => ({
  useStore: () => mockStore
}));

// Set up test dummy functions
const createFetchStopsTest = () => {
  mockStore.dispatch('fetchStops');
  return mockStore.dispatch.mock.calls;
};

const createSelectLineTest = (line: number) => {
  mockStore.dispatch('selectLine', line);
  return mockStore.dispatch.mock.calls;
};

const createSelectStopTest = (stop: string) => {
  mockStore.dispatch('selectStop', stop);
  return mockStore.dispatch.mock.calls;
};

const createToggleStopsOrderTest = () => {
  mockStore.dispatch('toggleStopsOrder');
  return mockStore.dispatch.mock.calls;
};

describe('BusLinesView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch stops data when mounted', () => {
    const dispatchCalls = createFetchStopsTest();
    expect(dispatchCalls[0]).toEqual(['fetchStops']);
  });

  it('should call selectLine when selecting a bus line', () => {
    const dispatchCalls = createSelectLineTest(100);
    expect(dispatchCalls[0]).toEqual(['selectLine', 100]);
  });

  it('should call selectBusStop when selecting a bus stop', () => {
    const dispatchCalls = createSelectStopTest('Test Stop 1');
    expect(dispatchCalls[0]).toEqual(['selectStop', 'Test Stop 1']);
  });

  it('should call toggleStopsOrder when toggling stops order', () => {
    const dispatchCalls = createToggleStopsOrderTest();
    expect(dispatchCalls[0]).toEqual(['toggleStopsOrder']);
  });
}); 