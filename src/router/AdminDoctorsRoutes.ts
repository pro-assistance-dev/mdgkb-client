import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminDoctorPageContainer from '@/components/admin/AdminDoctors/AdminDoctorPageContainer.vue';
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
    name: 'AdminNewDoctorPage',
    component: AdminDoctorPageContainer,
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
    name: 'AdminEditDoctorPage',
    component: AdminDoctorPageContainer,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
