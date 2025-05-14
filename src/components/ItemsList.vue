<template>
  <div class="items-list" role="list" aria-label="Items List">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from 'vue';

interface Props {
  maxHeight?: number | null
}

const props = withDefaults(defineProps<Props>(), {
  maxHeight: null
});
</script>

<style scoped>
.items-list {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex-grow: 1;
  max-height: v-bind('props.maxHeight ? `${props.maxHeight}px` : "calc(100% - 100px)"');
  margin: 0 calc(var(--spacing-base) * -1);
  width: calc(100% + var(--spacing-base) * 2);
  position: relative;
  min-height: 400px;
}

:deep(.list-item) {
  font-family: 'Inter', sans-serif;
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-xs);
  line-height: 1.33;
  letter-spacing: 0;
  color: var(--color-text-secondary);
  
  padding: var(--spacing-base) var(--spacing-lg) calc(var(--spacing-base) - 1px) var(--spacing-lg);
  text-align: left;
  background-color: var(--color-white);
  cursor: pointer;
  transition: var(--transition-base);
  position: relative;
  border: none;
  width: 100%;
  border-bottom: 1px solid var(--color-list-item-border);
  display: flex;
  align-items: center;
}

:deep(.list-item:hover) {
  background-color: var(--color-list-hover-bg);
}

:deep(.list-item.active) {
  color: var(--color-primary-focus);
  background-color: var(--color-white);
}

:deep(.time-item) {
  cursor: default;
}

:deep(.empty-state) {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: auto;
  min-height: 100%;
  background-color: var(--color-white);
  transition: var(--transition-base);
}

/* Responsive adjustments for list items */
@media (min-width: 640px) {
  :deep(.list-item) {
    font-size: var(--font-size-sm);
  }
}

/* Adjust for different font sizes */
html.font-size-medium :deep(.list-item),
html.font-size-large :deep(.list-item),
html.font-size-xl :deep(.list-item) {
  padding-top: calc(var(--spacing-base) - 0.25rem);
  padding-bottom: calc(var(--spacing-base) - 0.25rem - 1px);
}

@media (max-width: 640px) {
  .items-list {
    min-height: 500px;
  }
}
</style> 