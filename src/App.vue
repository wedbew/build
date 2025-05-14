<template>
  <div class="app">
    <TheHeader />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue';
</script>

<style>
body, html {
  transition: background-color 0.3s ease, color 0.3s ease;
  background-color: var(--color-main-bg);
  color: var(--color-text-primary);
}

.app {
  min-height: 100vh;
  transition: background-color 0.3s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>