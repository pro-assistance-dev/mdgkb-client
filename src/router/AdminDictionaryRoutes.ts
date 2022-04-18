import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminBuildingPage from '@/components/admin/AdminBuildings/AdminBuildingPage.vue';
import AdminBuildingsList from '@/components/admin/AdminBuildings/AdminBuildingsList.vue';
import AdminDivisionPage from '@/components/admin/AdminDivisions/AdminDivisionPage.vue';
import AdminDivisionsList from '@/components/admin/AdminDivisions/AdminDivisionsList.vue';
import AdminSideOrganizationPage from '@/components/admin/AdminSideOrganizations/AdminSideOrganizationPage.vue';
import AdminSideOrganizationsList from '@/components/admin/AdminSideOrganizations/AdminSideOrganizationsList.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/buildings',
    name: 'AdminBuildingsList',
    component: AdminBuildingsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
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
      isAuthorized(next);
      authGuard();
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
      isAuthorized(next);
      authGuard();
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
      isAuthorized(next);
      authGuard();
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
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/side-organizations',
    name: 'AdminSideOrganizationsList',
    component: AdminSideOrganizationsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/side-organizations/new',
    name: 'AdminSideNewOrganizationPage',
    component: AdminSideOrganizationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/side-organizations/:id',
    name: 'AdminEditSideOrganizationPage',
    component: AdminSideOrganizationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
