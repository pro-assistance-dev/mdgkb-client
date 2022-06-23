import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminPartnerPage from '@/components/admin/AdminPartners/AdminPartnerPage.vue';
import AdminPartnersList from '@/components/admin/AdminPartners/AdminPartnersList.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/partners/new',
    name: 'AdminPartnerPageCreate',
    component: AdminPartnerPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/partners/:id',
    name: 'AdminPartnerPageUpdate',
    component: AdminPartnerPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/partners',
    name: 'AdminPartnersList',
    component: AdminPartnersList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
