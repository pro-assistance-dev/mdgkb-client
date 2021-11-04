import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminDocumentPage from '@/components/admin/AdminDocuments/AdminDocumentPage.vue';
import AdminDocumentsList from '@/components/admin/AdminDocuments/AdminDocumentsList.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/documents',
    name: 'AdminDocumentsList',
    component: AdminDocumentsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/documents/new',
    name: 'CreateAdminDocumentPage',
    component: AdminDocumentPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/documents/:id',
    name: 'EditAdminDocumentPage',
    component: AdminDocumentPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
