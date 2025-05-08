import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'lines',
    component: () => import('../views/BusLinesView.vue')
  },
  {
    path: '/stops',
    name: 'stops',
    component: () => import('../views/StopsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
