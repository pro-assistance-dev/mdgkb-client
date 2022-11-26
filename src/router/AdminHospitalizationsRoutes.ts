import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminHospitalizationPageContainer from '@/components/admin/AdminHospitalizations/AdminHospitalizationPageContainer.vue';
import AdminHospitalizationsList from '@/components/admin/AdminHospitalizations/AdminHospitalizationsList.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/hospitalizations',
    name: 'AdminHospitalizationsList',
    component: AdminHospitalizationsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/hospitalizations/new',
    name: 'AdminNewHospitalizationPage',
    component: AdminHospitalizationPageContainer,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/hospitalizations/:id',
    name: 'AdminEditHospitalizationPage',
    component: AdminHospitalizationPageContainer,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
