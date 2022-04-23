import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminUserPage from '@/components/admin/AdminUsers/AdminUserPage.vue';
import AdminUsersList from '@/components/admin/AdminUsers/AdminUsersList.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/users',
    name: 'AdminUsersList',
    component: AdminUsersList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/users/new',
    name: 'AdminUserPageCreate',
    component: AdminUserPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/users/:id',
    name: 'AdminUserPageUpdate',
    component: AdminUserPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
