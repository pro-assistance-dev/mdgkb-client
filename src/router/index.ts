import { createRouter, createWebHistory, RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import MainLayout from '@/views/main/MainLayout.vue';
import store from '../store/index';

import DivisionsRoutes from '@/router/DivisionsRoutes';
import MapRoutes from '@/router/MapRoutes';
import NewsRoutes from '@/router/NewsRoutes';
import NormativeDocumentsRoutes from '@/router/NormativeDocumentsRoutes';
import PaidServicesRoutes from '@/router/PaidServicesRoutes';
import ProfileRoutes from '@/router/ProfileRoutes';
import indexAdminRoutes from '@/router/indexAdminRoutes';

import AboutPage from '@/components/About/AboutPage.vue';
import DispanserizationPage from '@/components/Dispanserization/DispanserizationPage.vue';
import SideOrganizationsPage from '@/components/SideOrganizations/SideOrganizationsPage.vue';
import StopComaPage from '@/components/StopComa/StopComaPage.vue';

export const isAuthorized = (_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext): void => {
  const userId = localStorage.getItem('userId');
  if (userId) store.commit('auth/setIsAuth', true);
  next();
};

export const authGuard = (_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext): void => {
  const userId = localStorage.getItem('userId');
  if (!userId) router.push('/');
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

  ...DivisionsRoutes,
  ...MapRoutes,
  ...NewsRoutes,
  ...NormativeDocumentsRoutes,
  ...PaidServicesRoutes,
  ...ProfileRoutes,
  ...indexAdminRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach(isAuthorized);

export default router;
