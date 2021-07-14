import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainLayout from '@/views/main/MainLayout.vue';
import AboutPage from '@/components/About/AboutPage.vue';
import StopComaPage from '@/components/StopComa/StopComaPage.vue';
import NewsRoutes from "@/router/NewsRoutes";
import NormativeDocumentsRoutes from "@/router/NormativeDocumentsRoutes"
import DispanserizationPage from '@/components/Dispanserization/DispanserizationPage.vue';

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
  {
    path: '/about',
    name: 'AboutPage',
    component: AboutPage
  },
  {
    path: '/stop-coma',
    name: 'StopComaPage',
    component: StopComaPage,
  },
  {
    path: '/dispanserization',
    name: 'DispanserizationPage',
    component: DispanserizationPage,
  },

    ...NewsRoutes,
    ...NormativeDocumentsRoutes
]

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  routes
})

export default router
