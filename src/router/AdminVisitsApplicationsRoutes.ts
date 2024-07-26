import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const AdminVisitsApplicationPage = () => import('@/components/admin/AdminVisitsApplication/AdminVisitsApplicationPage.vue');
const AdminVisitsApplicationList = () => import('@/components/admin/AdminVisitsApplication/AdminVisitsApplicationsList.vue');

import { authGuard,isAuthorized } from '@/router/index';
import { AdminLayout } from '@/services/interfaces/AdminLayout';

export default [
  {
    path: '/admin/visits-applications',
    name: 'AdminVisitsApplicationList',
    component: AdminVisitsApplicationList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard(next);
    },
    meta: {
      layout: 'AdminLayout',
      adminLayout: AdminLayout.TableList,
    },
  },
  {
    path: '/admin/visits-applications/new',
    name: 'AdminVisitsApplicationPageNew',
    component: AdminVisitsApplicationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/visits-applications/:id',
    name: 'AdminVisitsApplicationPage',
    component: AdminVisitsApplicationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
