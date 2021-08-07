import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { authGuard, isAuthorized } from '@/router/index';
import AdminDoctorsList from '@/components/admin/AdminDoctors/AdminDoctorsList.vue';
import AdminDoctorPage from '@/components/admin/AdminDoctors/AdminDoctorPage.vue';

export default [
  {
    path: '/admin/doctors',
    name: 'AdminDoctorsList',
    component: AdminDoctorsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(to, from, next);
      authGuard(to, from, next);
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
      isAuthorized(to, from, next);
      authGuard(to, from, next);
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
      isAuthorized(to, from, next);
      authGuard(to, from, next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
