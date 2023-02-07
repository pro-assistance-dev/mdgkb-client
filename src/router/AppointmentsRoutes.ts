import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AppointmentsPage from '@/components/AppointmentsPage/AppointmentsPage.vue';
import { devGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/appointments/oms',
    name: 'AppointmentsPageOms',
    component: AppointmentsPage,
  },
  {
    path: '/appointments/dms',
    name: 'AppointmentsPageDms',
    component: AppointmentsPage,
  },
];
