import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import CoursePage from '@/components/Educational/Dpo/CoursePage.vue';
import DpoCourses from '@/components/Educational/Dpo/DpoPage.vue';
import EducationalOrganizationAcademics from '@/components/Educational/EducationalOrganizationAcademics.vue';
import EducationalOrganizationDocuments from '@/components/Educational/EducationalOrganizationInfo/DocumentsPage.vue';
import EducationalOrganizationInfo from '@/components/Educational/EducationalOrganizationInfo/EducationalOrganizationInfo.vue';
import OrdinaturaPage from '@/components/Educational/Ordinatura/OrdinaturaPage.vue';
import PostgraduateCoursePage from '@/components/Educational/Postgraduate/PostgraduateCoursePage.vue';
import PostgraduatePage from '@/components/Educational/Postgraduate/PostgraduatePage.vue';
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
    path: '/postgraduate-courses',
    name: 'PostgraduatePage',
    component: PostgraduatePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/postgraduate-courses/:id',
    name: 'PostgraduateCoursePage',
    component: PostgraduateCoursePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/candidates-minimum',
    name: 'CandidatesMinimum',
    component: PostgraduatePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/dpo',
    name: 'DpoCourses',
    component: DpoCourses,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/nmo',
    name: 'NmoCourses',
    component: DpoCourses,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/courses/:id',
    name: 'CoursePage',
    component: CoursePage,
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
