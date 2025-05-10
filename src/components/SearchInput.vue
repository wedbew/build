<template>
  <div class="search-container">
    <input 
      type="text" 
      :value="modelValue"
      @input="handleInput"
      :placeholder="placeholder"
      class="search-input" 
    />
    <div class="search-icon">
      <slot name="icon"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchInput',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Search...'
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit('update:modelValue', target.value);
    };

    return {
      handleInput
    };
  }
});
</script>

<style scoped>
.search-container {
  position: relative;
}

.search-input {
  width: 100%;
  padding: 10px 14px 10px 42px;
  font-family: 'Inter', sans-serif;
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  border: 1px solid var(--color-input-border);
  border-radius: var(--radius-md);
  outline: none;
  height: 44px;
  transition: var(--transition-base);
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-input::placeholder {
  color: var(--color-text-secondary);
}

.search-input:focus {
  border-color: var(--color-active-border);
  box-shadow: var(--shadow-focus);
}
</style> 