import AdminDivisionsList from '@/components/admin/AdminDivisions/AdminDivisionsList.vue';
import AdminDivisionPage from '@/components/admin/AdminDivisions/AdminDivisionPage.vue';
import AdminBuildingsList from '@/components/admin/AdminBuildings/AdminBuildingsList.vue';
import AdminBuildingPage from '@/components/admin/AdminBuildings/AdminBuildingPage.vue';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/buildings',
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
    path: '/admin/buildings/:id',
    name: 'AdminBuildingPage',
    component: AdminBuildingPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(to, from, next);
      authGuard(to, from, next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/divisions',
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
  {
    path: '/admin/divisions/new',
    name: 'AdminNewDivisionPage',
    component: AdminDivisionPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(to, from, next);
      authGuard(to, from, next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/divisions/:id',
    name: 'AdminEditDivisionPage',
    component: AdminDivisionPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(to, from, next);
      authGuard(to, from, next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
