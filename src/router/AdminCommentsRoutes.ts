import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminCommentList from '@/components/admin/AdminComments/AdminCommentList.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/comments/all',
    name: 'AdminAllCommentList',
    component: AdminCommentList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/comments/mod-checked',
    name: 'AdminModCheckedCommentList',
    component: AdminCommentList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/comments/not-mod-checked',
    name: 'AdminNotModCheckedCommentList',
    component: AdminCommentList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
