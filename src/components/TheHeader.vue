<template>
  <header class="header"> 
    <div class="container">
      <div class="header-top">
        <h1 class="title">Timetable</h1>
        <div class="controls">
          <FontSizeToggle />
          <ThemeToggle class="theme-toggle" />
        </div>
      </div>
      <nav class="nav" aria-label="Main Navigation">
        <router-link to="/" :class="{ active: $route.path === '/' }" aria-current="$route.path === '/' ? 'page' : undefined">Bus Lines</router-link>
        <router-link to="/stops" :class="{ active: $route.path === '/stops' }" aria-current="$route.path === '/stops' ? 'page' : undefined">Stops</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue';
import FontSizeToggle from './FontSizeToggle.vue';
</script>

<style scoped>
.header {
  padding: var(--spacing-lg) 0;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-base);
}

.controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.theme-toggle {
  margin-left: 0;
}

.nav {
  background-color: var(--color-white);
  display: flex;
  gap: var(--spacing-base);
  margin-bottom: var(--spacing-xs);
  position: relative;
  border-radius: var(--radius-md);
}

.title {
  font-family: 'Inter', sans-serif;
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-2xl);
  line-height: 38px;
  color: var(--color-text-primary);
  margin: 0;
}

.nav a {
  font-family: 'Inter', sans-serif;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  line-height: 20px;
  color: var(--color-nav-text);
  text-decoration: none;
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 2px solid transparent;
  transition: var(--transition-slow);
  cursor: pointer;
  text-align: center;
}

.nav a:hover {
  color: var(--color-text-primary);
}

.nav a.active {
  color: var(--color-nav-active);
  border-bottom: 2px solid var(--color-nav-active);
}

@media (min-width: 640px) {
  .title {
    font-size: var(--font-size-3xl);
    line-height: 40px;
  }
  
  .nav {
    gap: var(--spacing-xl);
  }
  
  .nav a {
    font-size: var(--font-size-base);
    padding: var(--spacing-md) var(--spacing-xl);
  }
}

@media (max-width: 639px) {
  .header-top {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-base);
  }
  
  .controls {
    width: 100%;
    justify-content: flex-end;
  }
}
</style> 