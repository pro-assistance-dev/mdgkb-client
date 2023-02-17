import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminAcademicsList from '@/components/admin/AdminEducationalOrganization/AdminAcademicsList.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/academics',
    name: 'AdminAcademicsList',
    component: AdminAcademicsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
