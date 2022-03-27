import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminApplicationForEntry from '@/components/admin/AdminApplicationForEntry/AdminApplicationForEntryList.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/application-for-entry',
    name: 'AdminApplicationForEntry',
    component: AdminApplicationForEntry,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
