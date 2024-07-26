import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const AdminEmployeePage = () => import('@/components/admin/AdminEmployees/AdminEmployeePage.vue');
const AdminEmployeesList = () => import('@/components/admin/AdminEmployees/AdminEmployeesList.vue');

import { authGuard,isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/employees',
    name: 'AdminEmployeesList',
    component: AdminEmployeesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard(next);
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
      authGuard(next);
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
      authGuard(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
