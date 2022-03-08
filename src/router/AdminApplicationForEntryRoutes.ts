import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { authGuard, isAuthorized } from '@/router/index';
import AdminApplicationForEntry from '@/components/admin/AdminApplicationForEntry/AdminApplicationForEntryList.vue';

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
