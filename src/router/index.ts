import { createRouter, createWebHistory, RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import MainLayout from '@/views/main/MainLayout.vue';

import AuthRouter from '@/router/AuthRouter';
import AdminRoutes from '@/router/AdminRoutes';
import DivisionsRoutes from '@/router/DivisionsRoutes';
import MapRoutes from '@/router/MapRoutes';
import NewsRoutes from '@/router/NewsRoutes';
import NormativeDocumentsRoutes from '@/router/NormativeDocumentsRoutes';

import AboutPage from '@/components/About/AboutPage.vue';
import DispanserizationPage from '@/components/Dispanserization/DispanserizationPage.vue';
import HealthOrganizationsPage from '@/components/HealthOrganizations/HealthOrganizationsPage.vue';
import StopComaPage from '@/components/StopComa/StopComaPage.vue';

import IUser from '@/interfaces/users/IUser';
import HttpClient from '@/services/HttpClient';

export const isAuthorized = async (_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const httpClient = new HttpClient('users/authorize');
  const user = await httpClient.get<IUser>();
  if (user.email.length >= 1) {
    next();
    return;
  }

  next('/login');
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout,
    beforeEnter: isAuthorized,
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: AboutPage,
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
  {
    path: '/health_organizations',
    name: 'HealthOrganizationsPage',
    component: HealthOrganizationsPage,
  },

  ...AuthRouter,
  ...AdminRoutes,
  ...NewsRoutes,
  ...NormativeDocumentsRoutes,
  ...MapRoutes,
  ...DivisionsRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
