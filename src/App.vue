<template>
  <div class="app">
    <TheHeader />
    <main>
      <div class="container">
        <router-view />
      </div>
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
  background-color: #F9FAFB;
  color: #101828;
  line-height: 1.5;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1;
  padding: 32px 16px;
}

.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}

@media (min-width: 640px) {
  main {
    padding: 32px 24px;
  }
}

@media (min-width: 1024px) {
  main {
    padding: 32px;
  }
}
</style>