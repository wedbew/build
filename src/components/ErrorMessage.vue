<template>
  <div class="error-message">
    <div class="icon">
      <ErrorIcon />
    </div>
    <p>{{ message || 'An error occurred. Please try again.' }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ErrorIcon from '@/components/ErrorIcon.vue';

export default defineComponent({
  name: 'ErrorMessage',
  components: {
    ErrorIcon
  },
  props: {
    message: {
      type: String,
      default: ''
    }
  }
});
</script>

<style scoped>
.error-message {
  display: flex;
  align-items: flex-start;
  background-color: #FEF3F2;
  border: 1px solid #FEE4E2;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1);
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  margin-right: 12px;
  margin-top: 2px;
}

p {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #B42318;
}
</style> 