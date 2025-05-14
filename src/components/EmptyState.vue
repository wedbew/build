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
  /* Full size */
  width: 100%;
  height: 100%;
  min-height: 400px; /* Increased minimum height */
  flex: 1 1 auto; /* Grow and shrink as needed, but take up all available space */
  
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
  
  /* Border with SVG dashed pattern */
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%239A9DA4' stroke-width='2' stroke-dasharray='10%2c 10' stroke-dashoffset='25' stroke-linecap='butt'/%3e%3c/svg%3e");
  border: none;
  border-radius: var(--radius-base);
  
  /* Create a pseudo-element with the SVG background to use the CSS variable */
  position: relative;
}

.empty-state::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; /* Make it fill the entire container */
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%239A9DA4' stroke-width='2' stroke-dasharray='10%2c 10' stroke-dashoffset='25' stroke-linecap='butt'/%3e%3c/svg%3e");
  border-radius: var(--radius-base);
  pointer-events: none;
  z-index: 1;
}

/* Add specific styles for mobile view */
@media (max-width: 640px) {
  .empty-state {
    min-height: 500px; /* Significantly increase minimum height on smaller screens */
  }
}
</style> 