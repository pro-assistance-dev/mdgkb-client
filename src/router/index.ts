import { createRouter, createWebHistory, NavigationGuardNext, RouteRecordRaw } from 'vue-router';

import AboutPage from '@/components/About/AboutPage.vue';
import DispanserizationPage from '@/components/Dispanserization/DispanserizationPage.vue';
import MainPage from '@/components/Main/MainPage.vue';
import SideOrganizationsPage from '@/components/SideOrganizations/SideOrganizationsPage.vue';
import StopComaPage from '@/components/StopComa/StopComaPage.vue';
import DivisionsRoutes from '@/router/DivisionsRoutes';
import DoctorsRoutes from '@/router/DoctorsRoutes';
import EducationalOrganizationRoutes from '@/router/EducationalOrganizationRoutes';
import indexAdminRoutes from '@/router/indexAdminRoutes';
import MapRoutes from '@/router/MapRoutes';
import NewsRoutes from '@/router/NewsRoutes';
import NormativeDocumentsRoutes from '@/router/NormativeDocumentsRoutes';
import PaidServicesRoutes from '@/router/PaidServicesRoutes';
import ProfileRoutes from '@/router/ProfileRoutes';
import MainLayout from '@/views/main/MainLayout.vue';

import store from '../store/index';

export const isAuthorized = (next: NavigationGuardNext): void => {
  const userId = localStorage.getItem('userId');
  if (userId) store.commit('auth/setIsAuth', true);
  next();
};

export const authGuard = (): void => {
  const userId = localStorage.getItem('userId');
  if (!userId) router.push('/');
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout,
    redirect: '/main',
    beforeEnter(to, from, next) {
      isAuthorized(next);
    },
  },
  {
    path: '/main',
    name: 'MainPage',
    component: MainPage,
    // beforeEnter: isAuthorized,
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
    beforeEnter(to, from, next) {
      isAuthorized(next);
    },
  },
  {
    path: '/dispanserization',
    name: 'DispanserizationPage',
    component: DispanserizationPage,
    beforeEnter(to, from, next) {
      isAuthorized(next);
    },
  },
  {
    path: '/side-organizations',
    name: 'SideOrganizationsPage',
    component: SideOrganizationsPage,
    beforeEnter(to, from, next) {
      isAuthorized(next);
    },
  },
  ...DoctorsRoutes,
  ...DivisionsRoutes,
  ...MapRoutes,
  ...NewsRoutes,
  ...NormativeDocumentsRoutes,
  ...PaidServicesRoutes,
  ...ProfileRoutes,
  ...EducationalOrganizationRoutes,
  ...indexAdminRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach(isAuthorized);

export default router;
