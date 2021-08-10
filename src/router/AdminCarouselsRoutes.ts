import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminCarouselList from '@/components/admin/AdminCarousel/AdminCarouselList.vue';
import AdminCarouselPage from '@/components/admin/AdminCarousel/AdminCarouselPage.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/carousels',
    name: 'AdminCarouselList',
    component: AdminCarouselList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/carousels/new',
    name: 'AdminCarouselPageCreate',
    component: AdminCarouselPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/carousels/:id',
    name: 'AdminCarouselPageEdit',
    component: AdminCarouselPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
