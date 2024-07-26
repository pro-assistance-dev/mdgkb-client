import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const AdminProjectList = () => import('@/components/admin/AdminProjects/AdminProjectList.vue');
const AdminProjectPage = () => import('@/components/admin/AdminProjects/AdminProjectPage.vue');
import { authGuard,isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/projects',
    name: 'AdminProjectList',
    component: AdminProjectList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard(next);
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
      authGuard(next);
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
      authGuard(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
