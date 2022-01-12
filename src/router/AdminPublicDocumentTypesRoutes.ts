import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminPublicDocumentTypePage from '@/components/admin/AdminPublicDocumentTypes/AdminPublicDocumentTypePage.vue';
import AdminPublicDocumentTypesList from '@/components/admin/AdminPublicDocumentTypes/AdminPublicDocumentTypesList.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/public-document-types',
    name: 'AdminPublicDocumentTypesList',
    component: AdminPublicDocumentTypesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/public-document-types/new',
    name: 'AdminPublicDocumentTypesPageCreate',
    component: AdminPublicDocumentTypePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/public-document-types/:id',
    name: 'AdminPublicDocumentTypesPageUpdate',
    component: AdminPublicDocumentTypePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
