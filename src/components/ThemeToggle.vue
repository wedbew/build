<template>
  <button 
    class="theme-toggle" 
    @click="toggleTheme" 
    :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <SunIcon v-if="isDarkMode" />
    <MoonIcon v-else />
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import SunIcon from './SunIcon.vue';
import MoonIcon from './MoonIcon.vue';

const isDarkMode = ref(false);

// Check for saved theme preference or system preference
onMounted(() => {
  // Check for saved preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    isDarkMode.value = true;
    document.documentElement.classList.add('dark-theme');
  } else if (savedTheme === 'light') {
    isDarkMode.value = false;
    document.documentElement.classList.remove('dark-theme');
  } else {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDarkMode.value = true;
      document.documentElement.classList.add('dark-theme');
    }
  }

  // Listen for system changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      isDarkMode.value = e.matches;
      document.documentElement.classList.toggle('dark-theme', e.matches);
    }
  });
});

// Toggle theme
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
  }
};

// Watch for theme changes and update UI
watch(isDarkMode, (newVal) => {
  document.documentElement.classList.toggle('dark-theme', newVal);
});
</script>

<style scoped>
.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: var(--color-text-primary);
  transition: var(--transition-base);
  background-color: var(--color-white);
  box-shadow: var(--shadow-sm);
}

.theme-toggle:hover {
  background-color: var(--color-list-hover-bg);
}

.theme-toggle:focus {
  outline: none;
  box-shadow: var(--shadow-focus);
}
</style> 