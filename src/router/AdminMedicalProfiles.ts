import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminMedicalProfilePage from '@/components/admin/AdminMedicalProfiles/AdminMedicalProfilePage.vue';
import AdminMedicalProfilesList from '@/components/admin/AdminMedicalProfiles/AdminMedicalProfilesList.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/medical-profiles',
    name: 'AdminMedicalProfilesList',
    component: AdminMedicalProfilesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/medical-profiles/new',
    name: 'AdminMedicalProfilePageCreate',
    component: AdminMedicalProfilePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);

      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/medical-profiles/:id',
    name: 'AdminMedicalProfilePageEdit',
    component: AdminMedicalProfilePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
