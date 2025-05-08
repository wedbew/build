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
  font-size: 16px;
  color: #101828;
  border: 1px solid #D0D5DD;
  border-radius: 8px;
  outline: none;
  height: 44px;
  transition: all 0.15s ease;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #667085;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-input::placeholder {
  color: #667085;
}

.search-input:focus {
  border-color: #84CAFF;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}
</style> 