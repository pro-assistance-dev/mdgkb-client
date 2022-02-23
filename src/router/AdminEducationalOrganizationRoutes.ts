import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminDpoCoursePage from '@/components/admin/AdminEducationalOrganization/AdminDpoCourses/AdminDpoCoursePage.vue';
import AdminDpoCoursesList from '@/components/admin/AdminEducationalOrganization/AdminDpoCourses/AdminDpoCoursesList.vue';
import AdminEducationalOrganizationPage from '@/components/admin/AdminEducationalOrganization/AdminEducationalOrganizationPage.vue';
import { authGuard, isAuthorized } from '@/router/index';

// import AdminDpoCoursePage from '@/components/admin/AdminEducationalOrganization/AdminDpoCourses/AdminDpoCoursePage.vue';

export default [
  {
    path: '/admin/educational-organization',
    name: 'AdminEducationalOrganizationPage',
    component: AdminEducationalOrganizationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/educational-organization/dpo/courses',
    name: 'AdminDpoCoursesList',
    component: AdminDpoCoursesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/educational-organization/dpo/courses/new',
    name: 'AdminDpoCoursePageCreate',
    component: AdminDpoCoursePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/educational-organization/dpo/courses/:id',
    name: 'AdminDpoCoursePageEdit',
    component: AdminDpoCoursePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
