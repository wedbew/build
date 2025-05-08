<template>
  <header>
    <div class="container">
      <h1 class="title">Timetable</h1>
      <nav>
        <router-link to="/" :class="{ active: $route.path === '/' }">Bus Lines</router-link>
        <router-link to="/stops" :class="{ active: $route.path === '/stops' }">Stops</router-link>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheHeader'
});
</script>

<style scoped>
header {
  padding: 24px 16px;
  border-bottom: 1px solid #E4E7EB;
  background-color: white;
}

.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}

.title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 28px;
  line-height: 38px;
  color: #101828;
  margin-bottom: 16px;
}

nav {
  display: flex;
  gap: 16px;
}

nav a {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #667085;
  text-decoration: none;
  padding: 8px 16px 8px 0;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  cursor: pointer;
  flex: 1;
  max-width: 120px;
  text-align: center;
}

nav a:hover {
  color: #101828;
}

nav a.active {
  color: #2563EB;
  border-bottom: 2px solid #2563EB;
}

@media (min-width: 640px) {
  header {
    padding: 24px 24px;
  }
  
  .title {
    font-size: 32px;
    line-height: 40px;
  }
  
  nav {
    gap: 32px;
  }
  
  nav a {
    font-size: 16px;
    max-width: 160px;
  }
}

@media (min-width: 1024px) {
  header {
    padding: 24px 32px;
  }
}
</style> 