import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminMenus from '@/components/admin/AdminMenus/AdminMenus.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/menus',
    name: 'AdminMenus',
    component: AdminMenus,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
