import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminPagesList from '@/components/admin/AdminPages/AdminPagesList.vue';
import AdminPagesPageV2 from '@/components/admin/AdminPages/AdminPagesPageV2.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/pages',
    name: 'AdminPagesList',
    component: AdminPagesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/pages/new',
    name: 'AdminPagesPageCreate',
    component: AdminPagesPageV2,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/pages/:slug',
    name: 'AdminPagesPageEdit',
    component: AdminPagesPageV2,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
