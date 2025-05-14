<template>
  <div class="font-size-toggle">
    <span class="font-title" v-show="expanded || hovered">Font Size:</span>
    <div class="size-options" :class="{ 'visible': expanded || hovered }">
      <button 
        class="font-size-btn" 
        :class="{ active: currentFontSize === 'default' }"
        @click="setFontSize('default')" 
        aria-label="Default text size"
        title="Default text size"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
      >
        A
      </button>
      <button 
        class="font-size-btn" 
        :class="{ active: currentFontSize === 'medium' }"
        @click="setFontSize('medium')" 
        aria-label="Medium text size"
        title="Medium text size"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
      >
        A+
      </button>
      <button 
        class="font-size-btn" 
        :class="{ active: currentFontSize === 'large' }"
        @click="setFontSize('large')" 
        aria-label="Large text size"
        title="Large text size"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
      >
        A++
      </button>
      <button 
        class="font-size-btn" 
        :class="{ active: currentFontSize === 'xl' }"
        @click="setFontSize('xl')" 
        aria-label="Extra large text size"
        title="Extra large text size"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
      >
        A+++
      </button>
    </div>
    <button 
      class="main-btn"
      aria-label="Toggle font size"
      title="Toggle font size"
      aria-haspopup="true"
      :aria-expanded="expanded"
      @focus="expanded = true"
      @blur="handleBlur"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      A
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const currentFontSize = ref('default');
const expanded = ref(false);
const hovered = ref(false);
onMounted(() => {
  const savedFontSize = localStorage.getItem('font-size');
  if (savedFontSize) {
    setFontSize(savedFontSize);
  }
});

const handleBlur = () => {
  if (!hovered.value) {
    expanded.value = false;
  }
};

const setFontSize = (size: string) => {
  document.documentElement.classList.remove(
    'font-size-medium',
    'font-size-large',
    'font-size-xl'
  );
  
  if (size !== 'default') {
    document.documentElement.classList.add(`font-size-${size}`);
  }
  localStorage.setItem('font-size', size);
  currentFontSize.value = size;
  expanded.value = false;
};
</script>

<style scoped>
.font-size-toggle {
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 8px;
}

.font-title {
  font-size: 14px;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  margin-right: 8px;
  opacity: 0;
  transform: translateX(8px);
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
}

.size-options.visible + .main-btn + .font-title,
.size-options.visible ~ .font-title {
  opacity: 1;
  transform: translateX(0);
}

.main-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-white);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  height: 40px;
  width: 40px;
  font-weight: 500;
  font-size: 16px;
  transition: var(--transition-base);
  color: var(--color-text-primary);
  z-index: 10;
  position: relative;
  box-shadow: var(--shadow-sm);
}

.main-btn:hover, .main-btn:focus {
  background-color: var(--color-list-hover-bg);
}

.main-btn:focus {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.size-options {
  position: absolute;
  display: flex;
  height: 40px;
  right: 34px;
  padding-right: 8px;
  background: transparent;
  visibility: hidden;
  opacity: 0;
  transform: translateX(8px);
  transition: all 0.2s ease-in-out;
  z-index: 5;
}

.size-options.visible {
  visibility: visible;
  opacity: 1;
  transform: translateX(0);
}

.font-size-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-white);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  height: 40px;
  width: 40px;
  font-weight: 500;
  font-size: 14px;
  transition: var(--transition-base);
  color: var(--color-text-secondary);
  margin-right: 6px;
  box-shadow: var(--shadow-sm);
}

.font-size-btn:hover {
  background-color: var(--color-list-hover-bg);
}

.font-size-btn:focus {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.font-size-btn.active {
  background-color: var(--color-primary-focus);
  color: var(--color-white);
  border-color: var(--color-primary-focus);
}
</style> 