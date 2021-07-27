import AdminDivisionsList from '@/components/admin/AdminDivisions/AdminDivisionsList.vue';
import AdminBuildingsList from '@/components/admin/AdminBuildings/AdminBuildingsList.vue';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/dictionary/buildings',
    name: 'AdminBuildingsList',
    component: AdminBuildingsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(to, from, next);
      authGuard(to, from, next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/dictionary/divisions',
    name: 'AdminDivisionsList',
    component: AdminDivisionsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(to, from, next);
      authGuard(to, from, next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
