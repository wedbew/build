<template>
  <div class="sort-header">
    <h2 :class="['title', headerSize]">{{ title }}</h2>
    <button v-if="sortable" class="sort-button" @click="$emit('toggle-sort')" :aria-label="`Sort ${title.toLowerCase()}`">
      <SortIcon :flipped="!ascending" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SortIcon from '@/components/SortIcon.vue';

export default defineComponent({
  name: 'ListHeader',
  components: {
    SortIcon
  },
  props: {
    title: {
      type: String,
      required: true
    },
    ascending: {
      type: Boolean,
      default: true
    },
    sortable: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'lg',
      validator: (value: string) => ['sm', 'base', 'lg'].includes(value)
    }
  },
  computed: {
    headerSize() {
      return `size-${this.size}`;
    }
  },
  emits: ['toggle-sort']
});
</script>

<style scoped>
.sort-header {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-base);
}

.title {
  font-family: 'Inter', sans-serif;
  color: var(--color-text-primary);
  margin: 0;
}

.size-sm {
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-base);
}

.size-base {
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-md);
}

.size-lg {
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-lg);
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