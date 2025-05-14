<template>
  <div :class="['text-container', variant === 'small' ? 'text-container-small' : '']">
    <div class="input-wrapper">
      <input 
        type="text" 
        :value="modelValue"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        :placeholder="placeholder"
        class="text-input" 
        :id="inputId"
      />
      <label :class="['text-label', (modelValue || focused) ? 'text-label-active' : '']" :for="inputId">{{ label }}</label>
      <div v-if="!modelValue" class="text-icon">
        <slot name="icon"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps, defineEmits } from 'vue';

interface Props {
  modelValue?: string
  placeholder?: string
  label?: string
  variant?: 'full' | 'small'
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  label: '',
  variant: 'full'
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>();

const focused = ref(false);
const inputId = ref(`text-input-${Math.random().toString(36).substring(2, 9)}`);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const handleFocus = () => {
  focused.value = true;
};

const handleBlur = () => {
  focused.value = false;
};
</script>

<style scoped>
.text-container {
  position: relative;
  width: 100%;
}

.text-container-small {
  width: 300px;
}

.input-wrapper {
  position: relative;
  margin-top: 10px;
}

.text-label {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  padding: 0 4px;
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  transition: var(--transition-base);
  z-index: 1;
  pointer-events: none;
  background-color: var(--color-white);
  color: var(--color-text-secondary);
}

.text-label-active {
  top: 0px;
  transform: translateY(-50%) scale(0.85);
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
}

.text-input {
  width: 100%;
  padding: 10px 14px;
  padding-right: 42px;
  font-family: 'Inter', sans-serif;
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  border: 1px solid var(--color-input-border);
  border-radius: var(--radius-md);
  outline: none;
  height: 44px;
  transition: var(--transition-base);
}

.text-icon {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-input::placeholder {
  color: var(--color-text-secondary);
  opacity: 0.7;
}

.text-input:focus {
  border-color: var(--color-primary-focus);
  box-shadow: var(--shadow-focus);
}

.text-input:focus ~ .text-label {
  top: 0px;
  transform: translateY(-50%) scale(0.85);
  color: var(--color-primary-focus);
}

.text-input:not(:placeholder-shown) ~ .text-label {
  top: 0px;
  transform: translateY(-50%) scale(0.85);
  color: var(--color-text-secondary);
}
</style> 