<template>
  <div class="stops-view">
    <LoadingSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :message="error" />
    <div v-else class="content">
      <div class="search-bar">
        <SearchInput 
          v-model="searchTerm" 
          placeholder="Search for stops..."
        >
          <template #icon>
            <SearchIcon />
          </template>
        </SearchInput>
      </div>
      
      <div class="stops-list-header">
        <div class="column-header">
          <h2 class="column-title">Bus Stops</h2>
          <button class="sort-button" @click="toggleStopsOrder" aria-label="Sort bus stops">
            <span class="sort-icon">
              {{ stopsAscending ? '↑' : '↓' }}
            </span>
          </button>
        </div>
      </div>
      
      <div class="stops-list">
        <div 
          v-for="stop in filteredStops" 
          :key="stop" 
          class="stop-item"
        >
          {{ stop }}
        </div>
        <div v-if="filteredStops.length === 0" class="no-results">
          No stops found matching your search.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import SearchInput from '@/components/SearchInput.vue';
import SearchIcon from '@/components/SearchIcon.vue';

export default defineComponent({
  name: 'StopsView',
  components: {
    LoadingSpinner,
    ErrorMessage,
    SearchInput,
    SearchIcon
  },
  setup() {
    const store = useStore();
    const searchTerm = ref('');

    onMounted(() => {
      store.dispatch('fetchStops');
    });

    const loading = computed(() => store.state.loading);
    const error = computed(() => store.state.error);
    const stopsAscending = computed(() => store.state.stopsAscending);
    
    const filteredStops = computed(() => {
      const stops = store.getters.allStops(searchTerm.value);
      return stopsAscending.value 
        ? stops 
        : [...stops].reverse();
    });

    const toggleStopsOrder = () => {
      store.dispatch('toggleStopsOrder');
    };

    return {
      loading,
      error,
      searchTerm,
      filteredStops,
      stopsAscending,
      toggleStopsOrder
    };
  }
});
</script>

<style scoped>
.stops-view {
  height: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1);
  padding: 16px;
}

.search-bar {
  margin-bottom: 24px;
}

.stops-list-header {
  margin-bottom: 16px;
}

.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.column-title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #101828;
  margin: 0;
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

.stops-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  flex-grow: 1;
  min-height: 300px;
}

.stop-item {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #344054;
  padding: 12px 16px;
  border-radius: 6px;
  border: 1px solid #EAECF0;
  background: #FFFFFF;
}

.stop-item:nth-child(odd) {
  background: #F9FAFB;
}

.no-results {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #667085;
  padding: 24px;
  text-align: center;
  border: 2px dashed #E4E7EB;
  border-radius: 8px;
  margin-top: 16px;
  background-color: #F9FAFB;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}
</style> 