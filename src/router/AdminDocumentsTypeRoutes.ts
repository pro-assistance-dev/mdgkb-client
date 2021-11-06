import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminDocumentsList from '@/components/admin/AdminDocumentsTypes/AdminDocumentsTypesList.vue';
import AdminDocumentTypePage from '@/components/admin/AdminDocumentsTypes/AdminDocumentTypePage.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/documents-types',
    name: 'AdminDocumentsTypesList',
    component: AdminDocumentsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/documents-types/new',
    name: 'CreateAdminDocumentTypePage',
    component: AdminDocumentTypePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/documents-types/:id',
    name: 'EditAdminDocumentTypePage',
    component: AdminDocumentTypePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
