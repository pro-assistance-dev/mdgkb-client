import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { authGuard, isAuthorized } from '@/router/index';

import AdminBuildingsList from '@/components/admin/AdminBuildings/AdminBuildingsList.vue';
import AdminDivisionsList from '@/components/admin/AdminDivisions/AdminDivisionsList.vue';
import AdminNormativeDocumentTypePage from '@/components/admin/NormativeDocuments/AdminNormativeDocumentTypePage.vue';
import AdminNormativeDocumentTypesList from '@/components/admin/NormativeDocuments/AdminNormativeDocumentTypesList.vue';
import AdminNormativeDocumentsList from '@/components/admin/NormativeDocuments/AdminNormativeDocumentsList.vue';

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
  {
    path: '/admin/normative-documents',
    name: 'AdminNormativeDocuments',
    component: AdminNormativeDocumentsList,
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
