import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const AdminAppointmentsConstructor = () => import('@/components/admin/AdminAppointments/AdminAppointmentsConstructor.vue');
const AdminDailyMenuOrderPage = () => import('@/components/admin/AdminDailyMenuOrders/AdminDailyMenuOrderPage.vue');
const AdminDailyMenuOrdersList = () => import('@/components/admin/AdminDailyMenuOrders/AdminDailyMenuOrdersList.vue');
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
