import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const AdminSupportMessagePage = () => import('@/components/admin/AdminSupportMessages/AdminSupportMessagePage.vue');
const AdminSupportMessagesList = () => import('@/components/admin/AdminSupportMessages/AdminSupportMessagesList.vue');
import { authGuard,isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/support-messages',
    name: 'AdminSupportMessagesList',
    component: AdminSupportMessagesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/support-messages/:id',
    name: 'AdminSupportMessagePage',
    component: AdminSupportMessagePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
