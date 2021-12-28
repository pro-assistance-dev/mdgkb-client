import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminPaidProgramPage from '@/components/admin/AdminPaidProgramsGroups/AdminPaidProgramPage.vue';
import AdminPaidProgramsGroupsList from '@/components/admin/AdminPaidProgramsGroups/AdminPaidProgramsGroupsList.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/paid-programs-groups',
    name: 'AdminPaidProgramsGroupsList',
    component: AdminPaidProgramsGroupsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/paid-programs/:id',
    name: 'AdminPaidProgramPage',
    component: AdminPaidProgramPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
