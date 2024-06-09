import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const AdminFormStatusesList = () => import('@/components/admin/AdminFormStatuses/AdminFormStatusesList.vue');
const AdminFormStatusGroupsList = () => import('@/components/admin/AdminFormStatuses/AdminFormStatusGroupsList.vue');
const AdminFormStatusPage = () => import('@/components/admin/AdminFormStatuses/AdminFormStatusPage.vue');
import { authGuard, isAuthorized } from '@/router/index';
import { AdminLayout } from '@/services/interfaces/AdminLayout';

export default [
  {
    path: '/admin/form-status-groups',
    name: 'AdminFormStatusGroupsList',
    component: AdminFormStatusGroupsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
      adminLayout: AdminLayout.TableList,
    },
  },
  {
    path: '/admin/form-statuses/:groupId?',
    name: 'AdminFormStatusesList',
    component: AdminFormStatusesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/form-status/:groupId?/new',
    name: 'AdminFormStatusPageCreate',
    component: AdminFormStatusPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/form-status/:groupId?/:id',
    name: 'AdminFormStatusPageUpdate',
    component: AdminFormStatusPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
