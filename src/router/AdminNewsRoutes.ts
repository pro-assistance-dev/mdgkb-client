import AdminNewsList from '@/components/admin/AdminNews/AdminNewsList.vue';
import AdminNewsPage from '@/components/admin/AdminNews/AdminNewsPage.vue';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/news',
    name: 'AdminNewsList',
    component: AdminNewsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(to, from, next);
      authGuard(to, from, next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/news/new',
    name: 'AdminNewsPageNew',
    component: AdminNewsPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(to, from, next);
      authGuard(to, from, next);
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
      isAuthorized(to, from, next);
      authGuard(to, from, next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
