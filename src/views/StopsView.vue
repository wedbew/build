<template>
  <div class="stops-view">
    <LoadingSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :message="error" />
    <div v-else class="container">
      <div class="stops-content card">
        <div class="search-bar">
          <TextInput 
            v-model="searchTerm" 
            placeholder="Search for stops..."
            label="Search"
            variant="small"
          >
            <template #icon>
              <SearchIcon />
            </template>
          </TextInput>
        </div>
        
        <ListHeader
          title="Bus Stops"
          sortable
          :ascending="stopsAscending"
          @toggle-sort="toggleStopsOrder"
        />
        
        <ItemsList :max-height="500">
          <div 
            v-for="stop in filteredStops" 
            :key="stop" 
            class="list-item"
          >
            {{ stop }}
          </div>
          <EmptyState v-if="filteredStops.length === 0" message="No stops found matching your search." />
        </ItemsList>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import TextInput from '@/components/TextInput.vue';
import SearchIcon from '@/components/SearchIcon.vue';
import ListHeader from '@/components/ListHeader.vue';
import ItemsList from '@/components/ItemsList.vue';
import EmptyState from '@/components/EmptyState.vue';

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
</script>

<style scoped>
.stops-view {
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.stops-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-base);
  flex: 1;
  min-height: 0;
}

.search-bar {
  margin-bottom: var(--spacing-lg);
}
</style> 