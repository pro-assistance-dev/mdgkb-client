import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminDoctorPage from '@/components/admin/AdminDoctors/AdminDoctorPage.vue';
import AdminDoctorsList from '@/components/admin/AdminDoctors/AdminDoctorsList.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/doctors',
    name: 'AdminDoctorsList',
    component: AdminDoctorsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/doctors/new',
    name: 'AdminDoctorPageCreate',
    component: AdminDoctorPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/doctors/:id',
    name: 'AdminDoctorPageEdit',
    component: AdminDoctorPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
