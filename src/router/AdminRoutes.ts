import { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import AdminNewsList from '@/components/admin/AdminNews/AdminNewsList.vue';
import AdminNewsPage from '@/components/admin/AdminNews/AdminNewsPage.vue';
import AdminCarouselList from '@/components/admin/AdminCarousel/AdminCarouselList.vue';
import AdminCarouselPage from '@/components/admin/AdminCarousel/AdminCarouselPage.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/news',
    name: 'AdminNewsList',
    component: AdminNewsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
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
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
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
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
      isAuthorized(to, from, next);
      authGuard(to, from, next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/carousels',
    name: 'AdminCarouselList',
    component: AdminCarouselList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
      isAuthorized(to, from, next);
      authGuard(to, from, next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/carousels/new',
    name: 'AdminCarouselPageCreate',
    component: AdminCarouselPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
      isAuthorized(to, from, next);
      authGuard(to, from, next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/carousels/:id',
    name: 'AdminCarouselPageEdit',
    component: AdminCarouselPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
      isAuthorized(to, from, next);
      authGuard(to, from, next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
