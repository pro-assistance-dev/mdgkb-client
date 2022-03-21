import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminFormPatternList from '@/components/admin/AdminFormPatterns/AdminFormPatternList.vue';
import AdminFormPatternPage from '@/components/admin/AdminFormPatterns/AdminFormPatternPage.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/form-patterns',
    name: 'AdminFormPatternList',
    component: AdminFormPatternList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/form-patterns/new',
    name: 'AdminFormPatternPageCreate',
    component: AdminFormPatternPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/form-patterns/:id',
    name: 'AdminFormPatternPageUpdate',
    component: AdminFormPatternPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
