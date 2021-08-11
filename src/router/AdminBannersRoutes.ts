import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminBannerPage from '@/components/admin/AdminBanners/AdminBannerPage.vue';
import AdminBannersList from '@/components/admin/AdminBanners/AdminBannersList.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/banners',
    name: 'AdminBannersList',
    component: AdminBannersList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/banners/new',
    name: 'AdminBannersPageNew',
    component: AdminBannerPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/banners/:id',
    name: 'AdminBannersPageEdit',
    component: AdminBannerPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
