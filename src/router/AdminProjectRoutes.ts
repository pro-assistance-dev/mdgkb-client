import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminProjectList from '@/components/admin/AdminProjects/AdminProjectList.vue';
import AdminProjectPage from '@/components/admin/AdminProjects/AdminProjectPage.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/projects',
    name: 'AdminProjectList',
    component: AdminProjectList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/projects/new',
    name: 'AdminProjectPageCreate',
    component: AdminProjectPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/projects/:id',
    name: 'AdminProjectPageUpdate',
    component: AdminProjectPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
