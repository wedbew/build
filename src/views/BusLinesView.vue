<template>
  <div class="bus-lines-view">
    <LoadingSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :message="error" />
    <div v-else class="container bus-lines-container">
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

      <div class="row stops-time-row">
        <div v-if="!selectedLine" class="empty-column">
          <EmptyState message="Please select the bus line first" />
        </div>
        <div v-else class="column">
          <div class="column-header">
            <h2 class="column-title">Bus Line: <span class="selected-value">{{ selectedLine }}</span></h2>
          </div>
          
          <ListHeader 
            title="Bus Stops" 
            :sortable="true" 
            :ascending="stopsAscending"
            @toggle-sort="toggleStopsOrder"
          />
          
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

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import EmptyState from '@/components/EmptyState.vue';
import ItemsList from '@/components/ItemsList.vue';
import ListHeader from '@/components/ListHeader.vue';

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
</script>

<style scoped>
.bus-lines-view {
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.bus-lines-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  flex: 1;
  min-height: 0;
}

.row {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  width: 100%;
  margin: 0;
}

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
  background-color: var(--color-white);
  border-radius: var(--radius-md);
  padding: var(--spacing-base);
  display: flex;
  flex-direction: column;
  transition: var(--transition-base);
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
  background-color: var(--color-button-hover-bg);
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
  background: var(--color-bus-line);
  cursor: pointer;
  transition: var(--transition-base);
}

.bus-line-item:hover {
  background: var(--color-bus-line-hover);
}

.bus-line-item.active {
  background: var(--color-bus-line-active);
  color: var(--color-white);
}

.stops-time-row .column {
  min-height: 300px;
  max-height: 500px;
  overflow: hidden;
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