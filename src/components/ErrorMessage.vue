<template>
  <div class="error-message" role="alert" aria-live="assertive">
    <div class="icon" aria-hidden="true">
      <ErrorIcon />
    </div>
    <p>{{ message || 'An error occurred. Please try again.' }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import ErrorIcon from '@/components/ErrorIcon.vue';

defineProps<{
  message?: string
}>();
</script>

<style scoped>
.error-message {
  display: flex;
  align-items: flex-start;
  background-color: var(--color-error-bg);
  border: 1px solid var(--color-error-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-base);
  margin-bottom: var(--spacing-lg);
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  margin-right: var(--spacing-md);
  margin-top: var(--spacing-xs);
}

p {
  font-family: 'Inter', sans-serif;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-base);
  line-height: 24px;
  color: var(--color-error-text);
}
</style> 