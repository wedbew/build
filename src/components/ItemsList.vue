<template>
  <div class="items-list">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ItemsList'
});
</script>

<style scoped>
.items-list {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex-grow: 1;
  max-height: calc(100% - 100px);
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
}

:deep(.list-item::after) {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #EAEAED; /* Lighter gray color for the border */
}

:deep(.list-item:hover) {
  background: #F8F8FB;
}

:deep(.list-item.active) {
  color: #1952E1;
  background: var(--color-white);
}

:deep(.time-item) {
  cursor: default;
}
</style> 