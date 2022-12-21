import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminSupportMessagePage from '@/components/admin/AdminSupportMessages/AdminSupportMessagePage.vue';
import AdminSupportMessagesList from '@/components/admin/AdminSupportMessages/AdminSupportMessagesList.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/support-messages',
    name: 'AdminSupportMessagesList',
    component: AdminSupportMessagesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/support-messages/:id',
    name: 'AdminSupportMessagePage',
    component: AdminSupportMessagePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
