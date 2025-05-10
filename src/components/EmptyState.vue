<template>
  <div class="empty-state">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EmptyState',
  props: {
    message: {
      type: String,
      required: true
    }
  }
});
</script>

<style scoped>
.empty-state {
  /* Full size */
  width: 100%;
  height: 100%;
  
  /* Layout */
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Typography */
  font-family: 'Inter', sans-serif;
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  text-align: center;
  
  /* Appearance */
  background-color: var(--color-white);
  padding: var(--spacing-xl);
  box-sizing: border-box;
  
  /* Border with clear dashed style */
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-base);
  
}
</style> 