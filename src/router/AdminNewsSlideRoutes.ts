import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const AdminNewsSlideList = () => import('@/components/admin/AdminNewsSlides/AdminNewsSlideList.vue');
const AdminNewsSlidePage = () => import('@/components/admin/AdminNewsSlides/AdminNewsSlidePage.vue');

import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/news-slides',
    name: 'AdminNewsSlideList',
    component: AdminNewsSlideList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/news-slides/new',
    name: 'AdminNewsSlidePageCreate',
    component: AdminNewsSlidePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/news-slides/:id',
    name: 'AdminNewsSlidePageUpdate',
    component: AdminNewsSlidePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
