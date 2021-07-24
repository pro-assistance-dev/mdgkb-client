import { createRouter, createWebHistory, RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import MainLayout from '@/views/main/MainLayout.vue';

import AuthRouter from '@/router/AuthRouter';
import AdminRoutes from '@/router/AdminRoutes';
import DivisionsRoutes from '@/router/DivisionsRoutes';
import MapRoutes from '@/router/MapRoutes';
import NewsRoutes from '@/router/NewsRoutes';
import NormativeDocumentsRoutes from '@/router/NormativeDocumentsRoutes';
import store from '../store/index';

import AboutPage from '@/components/About/AboutPage.vue';
import DispanserizationPage from '@/components/Dispanserization/DispanserizationPage.vue';
import SideOrganizationsPage from '@/components/SideOrganizations/SideOrganizationsPage.vue';
import StopComaPage from '@/components/StopComa/StopComaPage.vue';

import ProfileRoutes from '@/router/ProfileRoutes';
import PaidServicesRoutes from '@/router/PaidServicesRoutes';

export const isAuthorized = (_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const userId = localStorage.getItem('userId');
  console.log('userId', userId);
  if (userId) store.commit('auth/setIsAuth', true);
  next();
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout,
    redirect: '/news',
    beforeEnter(to, from, next) {
      isAuthorized(to, from, next);
    },
  },

  {
    path: '/about',
    name: 'AboutPage',
    component: AboutPage,
    // beforeEnter: isAuthorized,
  },
  {
    path: '/stop-coma',
    name: 'StopComaPage',
    component: StopComaPage,
    beforeEnter: isAuthorized,
  },
  {
    path: '/dispanserization',
    name: 'DispanserizationPage',
    component: DispanserizationPage,
    beforeEnter: isAuthorized,
  },
  {
    path: '/health_organizations',
    name: 'SideOrganizationsPage',
    component: SideOrganizationsPage,
    beforeEnter: isAuthorized,
  },

  ...AuthRouter,
  ...AdminRoutes,
  ...NewsRoutes,
  ...NormativeDocumentsRoutes,
  ...MapRoutes,
  ...DivisionsRoutes,
  ...ProfileRoutes,
  ...PaidServicesRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach(isAuthorized);

export default router;
