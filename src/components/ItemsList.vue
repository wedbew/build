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
  /* Extend beyond container padding */
  margin: 0 calc(var(--spacing-base) * -1);
  width: calc(100% + var(--spacing-base) * 2);
}

/* Apply these styles to immediate children of our list */
:deep(.list-item) {
  /* Typography */
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  color: var(--color-text-secondary);
  
  /* Layout */
  padding: 20px 24px 19px 24px;
  text-align: left;
  background: var(--color-white);
  cursor: pointer;
  transition: var(--transition-base);
  position: relative;
  border: none;
  width: 100%;
  border-bottom: 1px solid var(--color-list-item-border);
}

:deep(.list-item:hover) {
  background: var(--color-list-hover-bg);
}

:deep(.list-item.active) {
  color: var(--color-primary-focus);
  background: var(--color-white);
}

:deep(.time-item) {
  cursor: default;
}
</style> 