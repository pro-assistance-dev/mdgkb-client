import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminFaqList from '@/components/admin/AdminFaq/AdminFaqList.vue';
import AdminFaqPage from '@/components/admin/AdminFaq/AdminFaqPage.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/faqs',
    name: 'AdminFaqList',
    component: AdminFaqList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/faqs/new',
    name: 'AdminFaqPageCreate',
    component: AdminFaqPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/faqs/:id',
    name: 'AdminFaqPageUpdate',
    component: AdminFaqPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
