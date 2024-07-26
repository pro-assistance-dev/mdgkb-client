import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const AdminUserPage = () => import('@/components/admin/AdminUsers/AdminUserPage.vue');
const AdminUsersList = () => import('@/components/admin/AdminUsers/AdminUsersList.vue');
import { authGuard,isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/users',
    name: 'AdminUsersList',
    component: AdminUsersList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard(next);
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
      authGuard(next);
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
      authGuard(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
