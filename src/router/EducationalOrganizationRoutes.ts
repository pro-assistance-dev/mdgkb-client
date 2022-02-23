import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AspiranturaPage from '@/components/EducationalOrganization/Aspirantura/AspiranturaPage.vue';
import DpoCoursePage from '@/components/EducationalOrganization/Dpo/DpoCoursePage.vue';
import DpoCourses from '@/components/EducationalOrganization/Dpo/DpoCourses.vue';
import AdditionalEducation from '@/components/EducationalOrganization/Dpo/DpoPage.vue';
import EducationalOrganizationAcademics from '@/components/EducationalOrganization/EducationalOrganizationAcademics.vue';
import EducationalOrganizationDocuments from '@/components/EducationalOrganization/EducationalOrganizationInfo/DocumentsPage.vue';
import EducationalOrganizationInfo from '@/components/EducationalOrganization/EducationalOrganizationInfo/EducationalOrganizationInfo.vue';
import EducationalOrganizationStructure from '@/components/EducationalOrganization/EducationalOrganizationInfo/StructurePage.vue';
import EducationalOrganizationTeachers from '@/components/EducationalOrganization/EducationalOrganizationTeachers.vue';
import OrdinaturaPage from '@/components/EducationalOrganization/Ordinatura/OrdinaturaPage.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/educational-organization/info',
    name: 'EducationalOrganizationInfo',
    component: EducationalOrganizationInfo,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/educational-organization/structure',
    name: 'EducationalOrganizationStructure',
    component: EducationalOrganizationStructure,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/educational-organization/teachers',
    name: 'EducationalOrganizationTeachers',
    component: EducationalOrganizationTeachers,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/educational-organization/academics',
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
    path: '/educational-organization/ordinatura',
    name: 'OrdinaturaPage',
    component: OrdinaturaPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/educational-organization/aspirantura',
    name: 'AspiranturaPage',
    component: AspiranturaPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/educational-organization/additional-education',
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
];
