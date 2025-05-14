<template>
  <div class="loading-spinner" role="status" aria-live="polite">
    <div class="spinner" aria-hidden="true"></div>
    <p>Loading...</p>
  </div>
</template>

<style scoped>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
  background-color: var(--color-white);
  border-radius: var(--radius-md);
  min-height: 200px;
  transition: var(--transition-base);
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--color-spinner-border);
  border-radius: 50%;
  border-top-color: var(--color-spinner);
  animation: spin 1s cubic-bezier(0.76, 0.35, 0.2, 0.7) infinite;
  margin-bottom: var(--spacing-base);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

p {
  font-family: 'Inter', sans-serif;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}
</style> 