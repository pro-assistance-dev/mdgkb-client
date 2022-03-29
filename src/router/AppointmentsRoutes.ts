import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AppointmentsPage from '@/components/AppointmentsPage/AppointmentsPage.vue';
import { devGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/appointments/oms',
    name: 'AppointmentsPageOms',
    component: AppointmentsPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      devGuard();
    },
  },
  {
    path: '/appointments/dms',
    name: 'AppointmentsPageDms',
    component: AppointmentsPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      devGuard();
    },
  },
];
