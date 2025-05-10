<template>
  <div class="app">
    <TheHeader />
    <main>
        <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheHeader from '@/components/TheHeader.vue';

export default defineComponent({
  name: 'App',
  components: {
    TheHeader
  }
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  color: var(--color-text-primary);
  line-height: 1.5;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-main-bg);
}

main {
  flex: 1;
}
</style>