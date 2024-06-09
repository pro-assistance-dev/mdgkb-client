import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const AdminNewsList = () => import('@/components/admin/AdminNews/AdminNewsList.vue');
const AdminNewsPage = () => import('@/components/admin/AdminNews/AdminNewsPage.vue');

import { authGuard, isAuthorized } from '@/router/index';
import { AdminLayout } from '@/services/interfaces/AdminLayout';

export default [
  {
    path: '/admin/news',
    name: 'AdminNewsList',
    component: AdminNewsList,
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
    path: '/admin/news/new',
    name: 'AdminNewsPageNew',
    component: AdminNewsPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/news/:slug',
    name: 'AdminNewsPageEdit',
    component: AdminNewsPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
