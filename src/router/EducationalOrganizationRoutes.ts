import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import CoursePage from '@/components/Educational/Dpo/CoursePage.vue';
import DpoCourses from '@/components/Educational/Dpo/DpoPage.vue';
import EducationPage from '@/components/Educational/Education/EducationPage.vue';
import EducationalOrganizationAcademics from '@/components/Educational/EducationalOrganizationAcademics.vue';
import PostgraduateCoursePage from '@/components/Educational/Postgraduate/PostgraduateCoursePage.vue';
import PostgraduatePage from '@/components/Educational/Postgraduate/PostgraduatePage.vue';
import ResidencyCoursePage from '@/components/Educational/Residency/ResidencyCoursePage.vue';
import ResidencyPage from '@/components/Educational/Residency/ResidencyPage.vue';
import TeachersManagers from '@/components/Educational/TeachersManagers/TeachersManagers.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/educational-info',
    name: 'EducationPage',
    component: EducationPage,
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
    path: '/postgraduate',
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
    path: '/residency',
    name: 'ResidencyPage',
    component: ResidencyPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/residency-courses/:id',
    name: 'ResidencyCoursePage',
    component: ResidencyCoursePage,
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
