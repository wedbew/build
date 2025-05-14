<template>
  <header class="header"> 
    <div class="container">
      <h1 class="title">Timetable</h1>
      <nav class="nav" aria-label="Main Navigation">
        <router-link to="/" :class="{ active: $route.path === '/' }" aria-current="$route.path === '/' ? 'page' : undefined">Bus Lines</router-link>
        <router-link to="/stops" :class="{ active: $route.path === '/stops' }" aria-current="$route.path === '/stops' ? 'page' : undefined">Stops</router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  padding: var(--spacing-lg) 0;
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
  margin-bottom: var(--spacing-base);
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
</style> 