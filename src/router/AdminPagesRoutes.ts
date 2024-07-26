import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const AdminPagesList = () => import('@/components/admin/AdminPages/AdminPagesList.vue');
const AdminPagesPage = () => import('@/components/admin/AdminPages/AdminPagesPage.vue');
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/pages',
    name: 'AdminPagesList',
    component: AdminPagesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/pages/:slug',
    name: 'AdminPagesPage',
    component: AdminPagesPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/pages/:slug',
    name: 'AdminPagesPageEdit',
    component: AdminPagesPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
