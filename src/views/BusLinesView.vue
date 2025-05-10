<template>
  <div class="bus-lines-view">
    <LoadingSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :message="error" />
    <div v-else class="container bus-lines-container">
      <!-- First row - Bus Lines -->
      <div class="row bus-lines-row">
        <div class="column">
          <h2 class="column-title">Select Bus Lines</h2>
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
        <div v-if="!selectedLine" class="empty-column">
          <EmptyState message="Please select the bus line first" />
        </div>
        <div v-else class="column">
          <div class="column-header">
            <h2 class="column-title">Bus Line: <span class="selected-value">{{ selectedLine }}</span></h2>
          </div>
          
          <div class="list-header">
            <h3 class="list-title">Bus Stops</h3>
            <button class="sort-button" @click="toggleStopsOrder" aria-label="Sort bus stops">
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                :class="{ 'flipped': !stopsAscending }"
              >
                <path 
                  d="M10.6668 8.66665L8.00004 11.3333M8.00004 11.3333L5.33337 8.66665M8.00004 11.3333L8.00004 4.66665M6.6667 14.6666H9.33337C11.2002 14.6666 12.1336 14.6666 12.8467 14.3033C13.4739 13.9838 13.9838 13.4738 14.3034 12.8466C14.6667 12.1336 14.6667 11.2002 14.6667 9.33332V6.66665C14.6667 4.7998 14.6667 3.86638 14.3034 3.15334C13.9838 2.52614 13.4739 2.0162 12.8467 1.69662C12.1336 1.33331 11.2002 1.33331 9.33338 1.33331H6.66671C4.79987 1.33331 3.86644 1.33331 3.15341 1.69662C2.5262 2.0162 2.01626 2.52614 1.69669 3.15334C1.33337 3.86638 1.33337 4.7998 1.33337 6.66664V9.33331C1.33337 11.2002 1.33337 12.1336 1.69669 12.8466C2.01626 13.4738 2.5262 13.9838 3.15341 14.3033C3.86644 14.6666 4.79986 14.6666 6.6667 14.6666Z" 
                  stroke="#63666E" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          
          <ItemsList>
            <button 
              v-for="stop in stopsForSelectedLine" 
              :key="`${stop.line}-${stop.stop}-${stop.order}`" 
              class="list-item" 
              :class="{ active: selectedStop === stop.stop }"
              @click="selectBusStop(stop.stop)"
            >
              {{ stop.stop }}
            </button>
          </ItemsList>
        </div>

        <!-- Time Column -->
        <div v-if="!selectedLine || !selectedStop" class="empty-column">
          <EmptyState message="Please select the bus stop first" />
        </div>
        <div v-else class="column">
          <div class="column-header">
            <h2 class="column-title">Bus Stop: <span class="selected-value">{{ selectedStop }}</span></h2>
          </div>
          <ItemsList>
            <div 
              v-for="timeInfo in timesForSelectedStop" 
              :key="`${timeInfo.line}-${timeInfo.stop}-${timeInfo.time}`" 
              class="list-item time-item"
            >
              {{ timeInfo.time }}
            </div>
          </ItemsList>
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
import EmptyState from '@/components/EmptyState.vue';
import ItemsList from '@/components/ItemsList.vue';

export default defineComponent({
  name: 'BusLinesView',
  components: {
    LoadingSpinner,
    ErrorMessage,
    EmptyState,
    ItemsList
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
/* Remove local :root CSS variables since they're now defined globally */

.bus-lines-view {
  height: 100%;
}

.bus-lines-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.row {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  width: 100%;
  margin: 0; /* Ensure no negative margins */
}

/* Empty column that will contain the EmptyState */
.empty-column {
  flex: 1;
  display: flex;
  min-height: 300px;
  max-height: 500px;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background: transparent;
  border-radius: var(--radius-md);
  overflow: hidden;
}

/* Second row layout for stops and time columns */
.stops-time-row {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  flex: 1;
}

@media (min-width: 768px) {
  .stops-time-row {
    flex-direction: row;
  }
}

.column {
  flex: 1;
  background: var(--color-white);
  border-radius: var(--radius-md);
  padding: var(--spacing-base);
  display: flex;
  flex-direction: column;
}

.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-base);
}

.column-title {
  font-family: 'Inter', sans-serif;
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-base);
}

.selected-value {
  font-weight: var(--font-weight-medium);
}

.column-header .column-title {
  margin-bottom: 0;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.list-title {
  font-family: 'Inter', sans-serif;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  margin: 0;
}

.sort-button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-base);
  border-radius: var(--radius-sm);
}

.sort-button:hover {
  background-color: rgba(99, 102, 110, 0.1);
}

.flipped {
  transform: rotate(180deg);
}

.bus-lines-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: var(--spacing-md);
  overflow-y: auto;
  padding-bottom: var(--spacing-base);
}

@media (min-width: 640px) {
  .bus-lines-grid {
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    gap: var(--spacing-base);
  }
}

.bus-line-item {
  font-family: 'Inter', sans-serif;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-base);
  color: var(--color-white);
  height: 44px;
  border-radius: var(--radius-base);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1952E1;
  cursor: pointer;
  transition: var(--transition-base);
}

.bus-line-item:hover {
  background: #1649CA;
}

.bus-line-item.active {
  background: #2E3E6E;
  color: var(--color-white);
}

/* Apply min-height only to columns in the stops-time-row */
.stops-time-row .column {
  min-height: 300px;
  max-height: 500px;
  overflow: hidden; /* Prevents overflow of child content */
}

@media (max-height: 800px) {
  .stops-time-row .column {
    max-height: 400px;
  }
  
  .empty-column {
    max-height: 400px;
  }
}

@media (max-height: 600px) {
  .stops-time-row .column {
    max-height: 300px;
  }
  
  .empty-column {
    max-height: 300px;
  }
}
</style> 