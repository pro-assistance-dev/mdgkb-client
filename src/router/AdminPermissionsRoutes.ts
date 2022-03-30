import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminPathPermissions from '@/components/admin/AdminPathPermissions.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/path-permissions',
    name: 'AdminPathPermissions',
    component: AdminPathPermissions,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
