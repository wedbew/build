<template>
  <div class="sort-header">
    <h2 :class="['title', headerSize]">{{ title }}</h2>
    <button v-if="sortable" class="sort-button" @click="$emit('toggle-sort')" :aria-label="`Sort ${title.toLowerCase()}`">
      <SortIcon :flipped="!ascending" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, withDefaults, defineEmits } from 'vue';
import SortIcon from '@/components/SortIcon.vue';

interface Props {
  title: string
  ascending?: boolean
  sortable?: boolean
  size?: 'sm' | 'base' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  ascending: true,
  sortable: false,
  size: 'lg'
});

defineEmits<{
  (e: 'toggle-sort'): void
}>();

const headerSize = computed(() => `size-${props.size}`);
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
  background-color: var(--color-button-hover-bg);
}
</style> 