import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminEducationalOrganizationPage from '@/components/admin/AdminEducationalOrganization/AdminEducationalOrganizationPage.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/educational-organization',
    name: 'AdminEducationalOrganizationPage',
    component: AdminEducationalOrganizationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
