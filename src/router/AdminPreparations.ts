import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminPreparations from '@/components/admin/AdminPreparations/AdminPreparations.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/preparations',
    name: 'AdminPreparations',
    component: AdminPreparations,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
