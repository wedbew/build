<template>
  <div class="stops-view">
    <LoadingSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :message="error" />
    <div v-else class="container">
      <div class="stops-content card">
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
          <SortButton
            title="Bus Stops"
            :ascending="stopsAscending"
            @toggle="toggleStopsOrder"
          />
        </div>
        
        <ItemsList>
          <div 
            v-for="stop in filteredStops" 
            :key="stop" 
            class="list-item"
          >
            {{ stop }}
          </div>
          <div v-if="filteredStops.length === 0" class="no-results">
            No stops found matching your search.
          </div>
        </ItemsList>
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
import SortButton from '@/components/SortButton.vue';
import ItemsList from '@/components/ItemsList.vue';

export default defineComponent({
  name: 'StopsView',
  components: {
    LoadingSpinner,
    ErrorMessage,
    SearchInput,
    SearchIcon,
    SortButton,
    ItemsList
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

.stops-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-base);
}

.search-bar {
  margin: var(--spacing-lg) 0;
}

.stops-list-header {
  margin-bottom: var(--spacing-base);
}

.no-results {
  font-family: 'Inter', sans-serif;
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  padding: var(--spacing-lg);
  text-align: center;
  border: 3px dashed var(--color-border);
  border-radius: var(--radius-base);
  margin-top: var(--spacing-base);
  background-color: var(--color-placeholder-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}
</style> 