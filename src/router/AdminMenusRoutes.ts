import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminMenusList from '@/components/admin/AdminMenus/AdminMenusList.vue';
import AdminMenusPage from '@/components/admin/AdminMenus/AdminMenusPage.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/menus',
    name: 'AdminMenusList',
    component: AdminMenusList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/menus/new',
    name: 'AdminMenusPageCreate',
    component: AdminMenusPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/menus/:id',
    name: 'AdminMenusPageEdit',
    component: AdminMenusPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
