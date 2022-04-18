import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminRolePage from '@/components/admin/AdminRoles/AdminRolePage.vue';
import AdminRolesList from '@/components/admin/AdminRoles/AdminRolesList.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/roles',
    name: 'AdminRolesList',
    component: AdminRolesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/roles/new',
    name: 'AdminRolesPageCreate',
    component: AdminRolePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/roles/:id',
    name: 'AdminRolesPageUpdate',
    component: AdminRolePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
