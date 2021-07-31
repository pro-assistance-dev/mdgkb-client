import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { authGuard, isAuthorized } from '@/router/index';

import AdminBuildingPage from '@/components/admin/AdminBuildings/AdminBuildingPage.vue';
import AdminBuildingsList from '@/components/admin/AdminBuildings/AdminBuildingsList.vue';
import AdminDivisionPage from '@/components/admin/AdminDivisions/AdminDivisionPage.vue';
import AdminDivisionsList from '@/components/admin/AdminDivisions/AdminDivisionsList.vue';
import AdminNormativeDocumentPage from '@/components/admin/NormativeDocuments/AdminNormativeDocumentPage.vue';
import AdminNormativeDocumentTypePage from '@/components/admin/NormativeDocuments/AdminNormativeDocumentTypePage.vue';
import AdminNormativeDocumentTypesList from '@/components/admin/NormativeDocuments/AdminNormativeDocumentTypesList.vue';
import AdminNormativeDocumentsList from '@/components/admin/NormativeDocuments/AdminNormativeDocumentsList.vue';
import AdminSideOrganizationPage from '@/components/admin/AdminSideOrganizations/AdminSideOrganizationPage.vue';
import AdminSideOrganizationsList from '@/components/admin/AdminSideOrganizations/AdminSideOrganizationsList.vue';

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
  {
    path: '/admin/side-organizations',
    name: 'AdminSideOrganizationsList',
    component: AdminSideOrganizationsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(to, from, next);
      authGuard(to, from, next);
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
      isAuthorized(to, from, next);
      authGuard(to, from, next);
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
      isAuthorized(to, from, next);
      authGuard(to, from, next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/normative-documents',
    name: 'AdminNormativeDocuments',
    component: AdminNormativeDocumentsList,
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/normative-documents/new',
    name: 'AdminNormativeDocumentNewPage',
    component: AdminNormativeDocumentPage,
    props: { isEdit: false },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/normative-documents/:id',
    name: 'AdminNormativeDocumentPage',
    component: AdminNormativeDocumentPage,
    props: { isEdit: true },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/normative-document-types',
    name: 'AdminNormativeDocumentTypes',
    component: AdminNormativeDocumentTypesList,
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/normative-document-types/new',
    name: 'AdminNormativeDocumentTypeNewPage',
    component: AdminNormativeDocumentTypePage,
    props: { isEdit: false },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/normative-document-types/:id',
    name: 'AdminNormativeDocumentTypePage',
    component: AdminNormativeDocumentTypePage,
    props: { isEdit: true },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
