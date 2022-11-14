import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminEmployeePage from '@/components/admin/AdminEmployees/AdminEmployeePage.vue';
import AdminEmployeesList from '@/components/admin/AdminEmployees/AdminEmployeesList.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/employees',
    name: 'AdminEmployeesList',
    component: AdminEmployeesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/employees/new',
    name: 'AdminNewEmployeePage',
    component: AdminEmployeePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/employees/:id',
    name: 'AdminEditEmployeePage',
    component: AdminEmployeePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
