import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminVisitsApplicationPage from '@/components/admin/AdminVisitsApplication/AdminVisitsApplicationPage.vue';
import AdminVisitsApplicationList from '@/components/admin/AdminVisitsApplication/AdminVisitsApplicationsList.vue';
import { AdminLayout } from '@/interfaces/admin/AdminLayout';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/visits-applications',
    name: 'AdminVisitsApplicationList',
    component: AdminVisitsApplicationList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
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
      authGuard();
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
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
