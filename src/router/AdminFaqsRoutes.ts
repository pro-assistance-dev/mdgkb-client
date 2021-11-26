import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminFaqPage from '@/components/admin/AdminFaq/AdminFaqPage.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/faqs',
    name: 'AdminFaqPage',
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
