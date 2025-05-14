import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../App.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../app/product-management/components/main-dashboard.component.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 