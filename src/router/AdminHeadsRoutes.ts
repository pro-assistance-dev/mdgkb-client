import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminHeadPage from '@/components/admin/AdminHeads/AdminHeadPage.vue';
import AdminHeadsList from '@/components/admin/AdminHeads/AdminHeadsList.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/heads',
    name: 'AdminHeadsList',
    component: AdminHeadsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/heads/new',
    name: 'AdminDoctorPageCreate',
    component: AdminHeadPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/heads/:id',
    name: 'AdminDoctorPageEdit',
    component: AdminHeadPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
