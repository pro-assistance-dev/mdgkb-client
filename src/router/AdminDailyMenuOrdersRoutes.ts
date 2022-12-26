import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminAppointmentsConstructor from '@/components/admin/AdminAppointments/AdminAppointmentsConstructor.vue';
import AdminDailyMenuOrderPage from '@/components/admin/AdminDailyMenuOrders/AdminDailyMenuOrderPage.vue';
import AdminDailyMenuOrdersList from '@/components/admin/AdminDailyMenuOrders/AdminDailyMenuOrdersList.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/daily-menu-orders/constructor',
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
    path: '/admin/daily-menu-orders',
    name: 'AdminDailyMenuOrdersList',
    component: AdminDailyMenuOrdersList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/daily-menu-orders/:id',
    name: 'AdminDailyMenuOrderPage',
    component: AdminDailyMenuOrderPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
