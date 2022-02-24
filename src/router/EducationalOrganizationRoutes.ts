import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AspiranturaPage from '@/components/Educational/Aspirantura/AspiranturaPage.vue';
import DpoCoursePage from '@/components/Educational/Dpo/DpoCoursePage.vue';
import DpoCourses from '@/components/Educational/Dpo/DpoCourses.vue';
import AdditionalEducation from '@/components/Educational/Dpo/DpoPage.vue';
import EducationalOrganizationAcademics from '@/components/Educational/EducationalOrganizationAcademics.vue';
import EducationalOrganizationDocuments from '@/components/Educational/EducationalOrganizationInfo/DocumentsPage.vue';
import EducationalOrganizationInfo from '@/components/Educational/EducationalOrganizationInfo/EducationalOrganizationInfo.vue';
import OrdinaturaPage from '@/components/Educational/Ordinatura/OrdinaturaPage.vue';
import TeachersManagers from '@/components/Educational/TeachersManagers/TeachersManagers.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/educational-info',
    name: 'EducationalOrganizationInfo',
    component: EducationalOrganizationInfo,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/academics',
    name: 'EducationalOrganizationAcademics',
    component: EducationalOrganizationAcademics,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/educational-organization/document-types',
    name: 'EducationalOrganizationDocuments',
    component: EducationalOrganizationDocuments,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/ordinatura',
    name: 'OrdinaturaPage',
    component: OrdinaturaPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/aspirantura',
    name: 'AspiranturaPage',
    component: AspiranturaPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/additional-education',
    name: 'AdditionalEducation',
    component: AdditionalEducation,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/dpo/courses',
    name: 'DpoCourses',
    component: DpoCourses,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/dpo/base-courses',
    name: 'DpoBaseCourses',
    component: DpoCourses,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/dpo/courses/:id',
    name: 'DpoCoursePage',
    component: DpoCoursePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/teachers',
    name: 'Teachers',
    component: TeachersManagers,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/educational-managers',
    name: 'EducationalManagers',
    component: TeachersManagers,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
];
