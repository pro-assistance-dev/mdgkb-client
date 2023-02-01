import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminTeacherPageContainer from '@/components/admin/AdminEducationalOrganization/AdminTeachers/AdminTeacherPageContainer.vue';
import AdminTeachersList from '@/components/admin/AdminEducationalOrganization/AdminTeachers/AdminTeachersList.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/teachers',
    name: 'AdminTeachersList',
    component: AdminTeachersList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/teachers/new',
    name: 'AdminNewTeachersPage',
    component: AdminTeacherPageContainer,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/teachers/:id',
    name: 'AdminEditTeacherPage',
    component: AdminTeacherPageContainer,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
