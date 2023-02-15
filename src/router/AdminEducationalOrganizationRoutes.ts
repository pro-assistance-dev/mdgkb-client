import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminDpoApplicationPage from '@/components/admin/AdminEducationalOrganization/AdminDpoCourses/AdminDpoApplicationPage.vue';
import AdminDpoApplicationsListContainer from '@/components/admin/AdminEducationalOrganization/AdminDpoCourses/AdminDpoApplicationsListContainer.vue';
import AdminDpoCoursePage from '@/components/admin/AdminEducationalOrganization/AdminDpoCourses/AdminDpoCoursePage.vue';
import AdminDpoCoursesListContainer from '@/components/admin/AdminEducationalOrganization/AdminDpoCourses/AdminDpoCoursesListContainer.vue';
import AdminCandidateApplicationPage from '@/components/admin/AdminEducationalOrganization/AdminPostgraduate/AdminCandidateApplicationPage.vue';
import AdminCandidateApplicationsList from '@/components/admin/AdminEducationalOrganization/AdminPostgraduate/AdminCandidateApplicationsList.vue';
import AdminPostgraduateApplicationPage from '@/components/admin/AdminEducationalOrganization/AdminPostgraduate/AdminPostgraduateApplicationPage.vue';
import AdminPostgraduateApplicationsList from '@/components/admin/AdminEducationalOrganization/AdminPostgraduate/AdminPostgraduateApplicationsList.vue';
import AdminPostgraduateCoursePage from '@/components/admin/AdminEducationalOrganization/AdminPostgraduate/AdminPostgraduateCoursePage.vue';
import AdminPostgraduateCoursesList from '@/components/admin/AdminEducationalOrganization/AdminPostgraduate/AdminPostgraduateCoursesList.vue';
import AdminResidencyApplicationPage from '@/components/admin/AdminEducationalOrganization/AdminResidency/AdminResidencyApplicationPage.vue';
import AdminResidencyApplicationsList from '@/components/admin/AdminEducationalOrganization/AdminResidency/AdminResidencyApplicationsList.vue';
import AdminResidencyCoursePage from '@/components/admin/AdminEducationalOrganization/AdminResidency/AdminResidencyCoursePage.vue';
import AdminResidencyCoursesList from '@/components/admin/AdminEducationalOrganization/AdminResidency/AdminResidencyCoursesList.vue';
import AdminSpecializationPage from '@/components/admin/AdminEducationalOrganization/AdminSpecializations/AdminSpecializationPage.vue';
import AdminSpecializationsList from '@/components/admin/AdminEducationalOrganization/AdminSpecializations/AdminSpecializationsList.vue';
import { AdminLayout } from '@/interfaces/admin/AdminLayout';
import { authGuard, isAuthorized } from '@/router/index';

// import AdminDpoCoursePage from '@/components/admin/AdminEducationalOrganization/AdminDpoCourses/AdminPostgraduateCoursePage.vue';

export default [
  {
    path: '/admin/dpo/courses',
    name: 'AdminDpoCoursesList',
    component: AdminDpoCoursesListContainer,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
      adminLayout: AdminLayout.TableList,
    },
  },
  {
    path: '/admin/dpo/courses/new',
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
    path: '/admin/dpo/courses/:id',
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
  {
    path: '/admin/nmo/courses',
    name: 'AdminNmoCoursesList',
    component: AdminDpoCoursesListContainer,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
      adminLayout: AdminLayout.TableList,
    },
  },
  {
    path: '/admin/nmo/courses/new',
    name: 'AdminNmoCoursePageCreate',
    component: AdminDpoCoursePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
      isNmo: true,
    },
  },
  {
    path: '/admin/nmo/courses/:id',
    name: 'AdminNmoCoursePageEdit',
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
    path: '/admin/dpo/applications',
    name: 'AdminDpoApplicationsList',
    component: AdminDpoApplicationsListContainer,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
      adminLayout: AdminLayout.TableList,
    },
  },
  {
    path: '/admin/nmo/applications',
    name: 'AdminNmoApplicationsList',
    component: AdminDpoApplicationsListContainer,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
      adminLayout: AdminLayout.TableList,
    },
  },
  {
    path: '/admin/dpo/applications/new',
    name: 'AdminDpoApplicationPageNew',
    component: AdminDpoApplicationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
      isNmo: false,
    },
  },
  {
    path: '/admin/dpo/applications/:id',
    name: 'AdminDpoApplicationPage',
    component: AdminDpoApplicationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
      isNmo: false,
    },
  },
  {
    path: '/admin/nmo/applications/new',
    name: 'AdminNmoApplicationPageNew',
    component: AdminDpoApplicationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
      isNmo: true,
    },
  },
  {
    path: '/admin/nmo/applications/:id',
    name: 'AdminNmoApplicationPage',
    component: AdminDpoApplicationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
      isNmo: true,
    },
  },
  {
    path: '/admin/postgraduate-courses',
    name: 'AdminPostgraduateCoursesList',
    component: AdminPostgraduateCoursesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
      adminLayout: AdminLayout.TableList,
    },
  },
  {
    path: '/admin/postgraduate-courses/new',
    name: 'AdminPostgraduateCoursePageNew',
    component: AdminPostgraduateCoursePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/postgraduate-courses/:id',
    name: 'AdminPostgraduateCoursePage',
    component: AdminPostgraduateCoursePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/postgraduate-applications',
    name: 'AdminPostgraduateApplicationsList',
    component: AdminPostgraduateApplicationsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
      adminLayout: AdminLayout.TableList,
    },
  },
  {
    path: '/admin/postgraduate-applications/new',
    name: 'AdminPostgraduateApplicationPageNew',
    component: AdminPostgraduateApplicationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/postgraduate-applications/:id',
    name: 'AdminPostgraduateApplicationPage',
    component: AdminPostgraduateApplicationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/candidate-applications',
    name: 'AdminCandidateApplicationsList',
    component: AdminCandidateApplicationsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
      adminLayout: AdminLayout.TableList,
    },
  },
  {
    path: '/admin/candidate-applications/new',
    name: 'AdminCandidateApplicationPageNew',
    component: AdminCandidateApplicationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/candidate-applications/:id',
    name: 'AdminCandidateApplicationPage',
    component: AdminCandidateApplicationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/residency-courses',
    name: 'AdminResidencyCoursesList',
    component: AdminResidencyCoursesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
      adminLayout: AdminLayout.TableList,
    },
  },
  {
    path: '/admin/residency-courses/new',
    name: 'AdminResidencyCoursePageCreate',
    component: AdminResidencyCoursePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/residency-courses/:id',
    name: 'AdminResidencyCoursePageEdit',
    component: AdminResidencyCoursePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/residency-applications',
    name: 'AdminResidencyApplicationsList',
    component: AdminResidencyApplicationsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
      adminLayout: AdminLayout.TableList,
    },
  },
  {
    path: '/admin/residency-applications/new',
    name: 'AdminResidencyApplicationPageNew',
    component: AdminResidencyApplicationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/residency-applications/:id',
    name: 'AdminResidencyApplicationPage',
    component: AdminResidencyApplicationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/educational/specializations',
    name: 'AdminSpecializationsList',
    component: AdminSpecializationsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/educational/specializations/new',
    name: 'AdminSpecializationPageCreate',
    component: AdminSpecializationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/educational/specializations/:id',
    name: 'AdminSpecializationPageUpdate',
    component: AdminSpecializationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
