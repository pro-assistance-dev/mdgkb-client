import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const AdminPagesList = () => import('@/components/admin/AdminPages/AdminPagesList.vue');
const AdminPagesPageV2 = () => import('@/components/admin/AdminPages/AdminPagesPageV2.vue');

const AdminPagesList2 = () => import('@/components/admin/AdminPages2/AdminPagesList2.vue');
const AdminPagesPage2 = () => import('@/components/admin/AdminPages2/AdminPagesPage2.vue');
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/pages-2',
    name: 'AdminPagesList2',
    component: AdminPagesList2,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/pages-2/:slug',
    name: 'AdminPagesPage2',
    component: AdminPagesPage2,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
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
