import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const AdminHospitalizationsTypesList = () => import('@/components/admin/AdminHospitalizationsTypes/AdminHospitalizationsTypesList.vue');
const AdminHospitalizationTypePage = () => import('@/components/admin/AdminHospitalizationsTypes/AdminHospitalizationTypePage.vue');
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/hospitalizations-types',
    name: 'AdminHospitalizationsTypesList',
    component: AdminHospitalizationsTypesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/hospitalizations-types/new',
    name: 'AdminNewHospitalizationTypePage',
    component: AdminHospitalizationTypePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/hospitalizations-types/:id',
    name: 'AdminEditHospitalizationTypePage',
    component: AdminHospitalizationTypePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
