<template>
  <div class="empty-state" role="status" aria-live="polite">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  message: string
}>();
</script>

<style scoped>
.empty-state {
  width: 100%;
  height: 100%;
  min-height: 400px;
  flex: 1 1 auto;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  font-family: 'Inter', sans-serif;
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  text-align: center;
  
  background-color: var(--color-white);
  padding: var(--spacing-xl);
  box-sizing: border-box;
  
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%239A9DA4' stroke-width='2' stroke-dasharray='10%2c 10' stroke-dashoffset='25' stroke-linecap='butt'/%3e%3c/svg%3e");
  border: none;
  border-radius: var(--radius-base);
  
  position: relative;
}

@media (max-width: 640px) {
  .empty-state {
    min-height: 500px;
  }
}
</style> 