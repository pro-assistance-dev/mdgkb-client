import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const AdminBuildingPage = () => import('@/components/admin/AdminBuildings/AdminBuildingPage.vue');
const AdminBuildingsList = () => import('@/components/admin/AdminBuildings/AdminBuildingsList.vue');
const AdminDivisionPage = () => import('@/components/admin/AdminDivisions/AdminDivisionPage.vue');
const AdminDivisionsList = () => import('@/components/admin/AdminDivisions/AdminDivisionsList.vue');
const AdminSideOrganizationPage = () => import('@/components/admin/AdminSideOrganizations/AdminSideOrganizationPage.vue');
const AdminSideOrganizationsList = () => import('@/components/admin/AdminSideOrganizations/AdminSideOrganizationsList.vue');
import { authGuard,isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/buildings',
    name: 'AdminBuildingsList',
    component: AdminBuildingsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard(next);
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
      authGuard(next);
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
      authGuard(next);
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
      authGuard(next);
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
      authGuard(next);
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
      authGuard(next);
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
      authGuard(next);
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
      authGuard(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
