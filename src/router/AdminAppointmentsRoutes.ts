import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const AdminAppointmentPageContainer = () => import('@/components/admin/AdminAppointments/AdminAppointmentPageContainer.vue');
const AdminAppointmentsConstructor = () => import('@/components/admin/AdminAppointments/AdminAppointmentsConstructor.vue');
const AdminAppointmentsList = () => import('@/components/admin/AdminAppointments/AdminAppointmentsList.vue');
import { authGuard,isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/appointments/constructor',
    name: 'AdminAppointmentsConstructor',
    component: AdminAppointmentsConstructor,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/appointments',
    name: 'AdminAppointmentsList',
    component: AdminAppointmentsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/appointments/new',
    name: 'AdminNewAppointmentPage',
    component: AdminAppointmentPageContainer,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/appointments/:id',
    name: 'AdminEditAppointmentPage',
    component: AdminAppointmentPageContainer,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
