import { createStore } from 'vuex'
import { Stop } from '@/types'
import { fetchStops } from '@/services/api'

interface State {
  stops: Stop[];
  loading: boolean;
  error: string | null;
  selectedLine: number | null;
  selectedStop: string | null;
  stopsAscending: boolean;
  linesAscending: boolean;
}

export default createStore<State>({
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
    // Get all unique line numbers, sorted 
    lines: (state) => {
      const uniqueLines = [...new Set(state.stops.map(stop => stop.line))];
      return state.linesAscending 
        ? uniqueLines.sort((a, b) => a - b)
        : uniqueLines.sort((a, b) => b - a);
    },
    // Get all stops for the selected line
    stopsForSelectedLine: (state) => {
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
    // Get all times for the selected line and stop
    timesForSelectedStop: (state) => {
      if (!state.selectedLine || !state.selectedStop) return [];
      return state.stops
        .filter(stop => stop.line === state.selectedLine && stop.stop === state.selectedStop)
        .sort((a, b) => a.time.localeCompare(b.time));
    },
    // Get all stops, with optional filtering by name
    allStops: (state) => (searchTerm = '') => {
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
})
