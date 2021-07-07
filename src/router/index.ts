import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainLayout from '@/views/main/MainLayout.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout
  },
]

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  routes
})

export default router
