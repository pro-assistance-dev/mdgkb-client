import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const AdminPreparationPage = () => import('@/components/admin/AdminPreparations/AdminPreparationPage.vue');
const AdminPreparationsList = () => import('@/components/admin/AdminPreparations/AdminPreparationsList.vue');
import { authGuard,isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/preparations',
    name: 'AdminPreparationsList',
    component: AdminPreparationsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/preparations/new',
    name: 'AdminNewPreparationPage',
    component: AdminPreparationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/preparations/:id',
    name: 'AdminEditPreparationPage',
    component: AdminPreparationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
