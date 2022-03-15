import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminAppointmentsConstructor from '@/components/admin/AdminAppointments/AdminAppointmentsConstructor.vue';
import AdminAppointmentsList from '@/components/admin/AdminAppointments/AdminAppointmentsList.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/appointments/constructor',
    name: 'AdminAppointmentsConstructor',
    component: AdminAppointmentsConstructor,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/appointments/list',
    name: 'AdminAppointmentsList',
    component: AdminAppointmentsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
