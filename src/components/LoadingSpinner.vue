<template>
  <div class="loading-spinner">
    <div class="spinner"></div>
    <p>Loading...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoadingSpinner'
});
</script>

<style scoped>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1);
  min-height: 200px;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(37, 99, 235, 0.1);
  border-radius: 50%;
  border-top-color: #2563EB;
  animation: spin 1s cubic-bezier(0.76, 0.35, 0.2, 0.7) infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

p {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #667085;
}
</style> 