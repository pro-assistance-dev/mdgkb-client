import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainLayout from '@/views/main/MainLayout.vue';
import NewsRoutes from "@/router/NewsRoutes";

export const isNotAuthorized = async (to: any, from: any, next: any) => {
    next('/news');
};


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout,
    beforeEnter: isNotAuthorized
  },
    ...NewsRoutes
]

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  routes
})

export default router
