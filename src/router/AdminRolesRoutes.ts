import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const AdminRolePage = () => import('@/components/admin/AdminRoles/AdminRolePage.vue');
const AdminRolesList = () => import('@/components/admin/AdminRoles/AdminRolesList.vue');
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
