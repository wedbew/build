<template>
  <SortButton 
    :title="title" 
    :sortable="sortable" 
    :ascending="ascending" 
    size="sm"
    @toggle="$emit('toggle-sort')" 
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SortButton from '@/components/SortButton.vue';

export default defineComponent({
  name: 'ListHeader',
  components: {
    SortButton
  },
  props: {
    title: {
      type: String,
      required: true
    },
    sortable: {
      type: Boolean,
      default: false
    },
    ascending: {
      type: Boolean,
      default: true
    }
  },
  emits: ['toggle-sort']
});
</script>

<style scoped>
.list-header {
  display: flex;
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
</style> 