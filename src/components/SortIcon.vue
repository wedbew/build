<template>
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    :class="{ 'flipped': flipped }"
    aria-hidden="true"
    role="img"
    focusable="false"
  >
    <path 
      d="M10.6668 8.66665L8.00004 11.3333M8.00004 11.3333L5.33337 8.66665M8.00004 11.3333L8.00004 4.66665M6.6667 14.6666H9.33337C11.2002 14.6666 12.1336 14.6666 12.8467 14.3033C13.4739 13.9838 13.9838 13.4738 14.3034 12.8466C14.6667 12.1336 14.6667 11.2002 14.6667 9.33332V6.66665C14.6667 4.7998 14.6667 3.86638 14.3034 3.15334C13.9838 2.52614 13.4739 2.0162 12.8467 1.69662C12.1336 1.33331 11.2002 1.33331 9.33338 1.33331H6.66671C4.79987 1.33331 3.86644 1.33331 3.15341 1.69662C2.5262 2.0162 2.01626 2.52614 1.69669 3.15334C1.33337 3.86638 1.33337 4.7998 1.33337 6.66664V9.33331C1.33337 11.2002 1.33337 12.1336 1.69669 12.8466C2.01626 13.4738 2.5262 13.9838 3.15341 14.3033C3.86644 14.6666 4.79986 14.6666 6.6667 14.6666Z" 
      stroke="var(--color-border)" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from 'vue';

withDefaults(defineProps<{
  flipped?: boolean
}>(), {
  flipped: false
});
</script>

<style scoped>
.flipped {
  transform: rotate(180deg);
}
</style> 