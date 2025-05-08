<template>
  <div class="bus-lines-view">
    <LoadingSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :message="error" />
    <div v-else class="content">
      <!-- First row - Bus Lines -->
      <div class="row bus-lines-row">
        <div class="column">
          <h2 class="column-title">Bus Lines</h2>
          <div class="bus-lines-grid">
            <button 
              v-for="line in lines" 
              :key="line" 
              class="bus-line-item" 
              :class="{ active: selectedLine === line }"
              @click="selectLine(line)"
            >
              {{ line }}
            </button>
          </div>
        </div>
      </div>

      <!-- Second row - Bus Stops and Time -->
      <div class="row stops-time-row">
        <!-- Bus Stops Column -->
        <div class="column">
          <div class="column-header">
            <h2 class="column-title">Bus Stops</h2>
            <button v-if="stopsForSelectedLine.length > 0" class="sort-button" @click="toggleStopsOrder" aria-label="Sort bus stops">
              <span class="sort-icon">
                {{ stopsAscending ? '↑' : '↓' }}
              </span>
            </button>
          </div>
          <div v-if="!selectedLine" class="placeholder">
            Please select the bus line first
          </div>
          <div v-else class="list">
            <button 
              v-for="stop in stopsForSelectedLine" 
              :key="`${stop.line}-${stop.stop}-${stop.order}`" 
              class="list-item" 
              :class="{ active: selectedStop === stop.stop }"
              @click="selectBusStop(stop.stop)"
            >
              {{ stop.stop }}
            </button>
          </div>
        </div>

        <!-- Time Column -->
        <div class="column">
          <h2 class="column-title">Time</h2>
          <div v-if="!selectedLine || !selectedStop" class="placeholder">
            Please select the bus stop first
          </div>
          <div v-else class="list">
            <div 
              v-for="timeInfo in timesForSelectedStop" 
              :key="`${timeInfo.line}-${timeInfo.stop}-${timeInfo.time}`" 
              class="list-item time-item"
            >
              {{ timeInfo.time }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';

export default defineComponent({
  name: 'BusLinesView',
  components: {
    LoadingSpinner,
    ErrorMessage
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch('fetchStops');
    });

    const loading = computed(() => store.state.loading);
    const error = computed(() => store.state.error);
    const lines = computed(() => store.getters.lines);
    const selectedLine = computed(() => store.state.selectedLine);
    const selectedStop = computed(() => store.state.selectedStop);
    const stopsForSelectedLine = computed(() => store.getters.stopsForSelectedLine);
    const timesForSelectedStop = computed(() => store.getters.timesForSelectedStop);
    const stopsAscending = computed(() => store.state.stopsAscending);

    const selectLine = (line: number) => {
      store.dispatch('selectLine', line);
    };

    const selectBusStop = (stop: string) => {
      store.dispatch('selectStop', stop);
    };

    const toggleStopsOrder = () => {
      store.dispatch('toggleStopsOrder');
    };

    return {
      loading,
      error,
      lines,
      selectedLine,
      selectedStop,
      stopsForSelectedLine,
      timesForSelectedStop,
      stopsAscending,
      selectLine,
      selectBusStop,
      toggleStopsOrder
    };
  }
});
</script>

<style scoped>
.bus-lines-view {
  height: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
}

.row {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

/* Second row layout for stops and time columns */
.stops-time-row {
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
}

@media (min-width: 768px) {
  .stops-time-row {
    flex-direction: row;
  }
}

.column {
  flex: 1;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
}

/* Apply min-height only to columns in the stops-time-row */
.stops-time-row .column {
  min-height: 300px;
  max-height: 500px;
  overflow: hidden; /* Prevents overflow of child content */
}

.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.column-title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #101828;
  margin-bottom: 16px;
}

.column-header .column-title {
  margin-bottom: 0;
}

.sort-button {
  background: #F9FAFB;
  border: 1px solid #D0D5DD;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
}

.sort-button:hover {
  background: #F0F9FF;
  border-color: #84CAFF;
}

.sort-icon {
  font-size: 14px;
  color: #344054;
}

.placeholder {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #667085;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 32px;
  border: 2px dashed #E4E7EB;
  border-radius: 8px;
  margin-top: 16px;
  background-color: #F9FAFB;
  overflow-y: auto;
}

.bus-lines-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 12px;
  overflow-y: auto;
  padding-bottom: 16px;
}

@media (min-width: 640px) {
  .bus-lines-grid {
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    gap: 16px;
  }
}

.bus-line-item {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #344054;
  height: 44px;
  border-radius: 6px;
  border: 1px solid #D0D5DD;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFFFFF;
  cursor: pointer;
  transition: all 0.15s ease;
}

.bus-line-item:hover {
  background: #F9FAFB;
  border-color: #B9E6FE;
}

.bus-line-item.active {
  background: #2563EB;
  border-color: #2563EB;
  color: white;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  flex-grow: 1;
  max-height: calc(100% - 60px); /* Accounting for header height */
}

.list-item {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #344054;
  padding: 12px 16px;
  border-radius: 6px;
  border: 1px solid #EAECF0;
  text-align: left;
  background: #FFFFFF;
  cursor: pointer;
  transition: all 0.15s ease;
}

.list-item:hover {
  background: #F9FAFB;
  border-color: #B9E6FE;
}

.list-item.active {
  background: #F0F9FF;
  border-color: #84CAFF;
  color: #026AA2;
}

.time-item {
  cursor: default;
}

@media (max-height: 800px) {
  .stops-time-row .column {
    max-height: 400px;
  }
}

@media (max-height: 600px) {
  .stops-time-row .column {
    max-height: 300px;
  }
}
</style> 