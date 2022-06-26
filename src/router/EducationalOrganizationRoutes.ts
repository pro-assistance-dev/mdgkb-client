import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdmissionCommittee from '@/components/Educational/AdmissionCommittee/AdmissionCommittee.vue';
import AdmissionCoursePage from '@/components/Educational/AdmissionCommittee/AdmissionCoursePage.vue';
import CoursePage from '@/components/Educational/Dpo/CoursePage.vue';
import DpoCourses from '@/components/Educational/Dpo/DpoPage.vue';
import EducationPage from '@/components/Educational/Education/EducationPage.vue';
import PostgraduateCoursePage from '@/components/Educational/Postgraduate/PostgraduateCoursePage.vue';
import PostgraduatePage from '@/components/Educational/Postgraduate/PostgraduatePage.vue';
import EducationalOrganizationAcademics from '@/components/Educational/Postgraduate/PostgraducateAcademics.vue';
import ResidencyCoursePage from '@/components/Educational/Residency/ResidencyCoursePage.vue';
import ResidencyPage from '@/components/Educational/Residency/ResidencyPage.vue';
import TeachersManagers from '@/components/Educational/TeachersManagers/TeachersManagers.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/educational-info',
    name: 'EducationPage',
    meta: { title: 'Сведения об образовательной организации' },
    component: EducationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/admission-committee',
    name: 'AdmissionCommittee',
    meta: { title: 'Приёмная кампания' },
    component: AdmissionCommittee,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/academics',
    name: 'EducationalOrganizationAcademics',
    meta: { title: 'Учёный совет' },
    component: EducationalOrganizationAcademics,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/postgraduate',
    name: 'PostgraduatePage',
    meta: { title: 'Аспирантура' },
    component: PostgraduatePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/postgraduate-courses/:id',
    name: 'PostgraduateCoursePage',
    meta: { title: 'Аспирантура - курс' },
    component: PostgraduateCoursePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/residency',
    name: 'ResidencyPage',
    meta: { title: 'Ординатура' },
    component: ResidencyPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/residency-courses/:id',
    name: 'ResidencyCoursePage',
    meta: { title: 'Ординатура - курс' },
    component: ResidencyCoursePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/admission-courses/:id',
    name: 'AdmissionCoursePage',
    meta: { title: 'Ординатура - курс' },
    component: AdmissionCoursePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/candidates-minimum',
    name: 'CandidatesMinimum',
    meta: { title: 'Кандидатский минимум' },
    component: PostgraduatePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/dpo',
    name: 'DpoCourses',
    meta: { title: 'ДПО' },
    component: DpoCourses,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/nmo',
    name: 'NmoCourses',
    meta: { title: 'НМО' },
    component: DpoCourses,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/courses/:id',
    name: 'CoursePage',
    meta: { title: 'ДПО - курс' },
    component: CoursePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/teachers',
    name: 'Teachers',
    meta: { title: 'Преподаватели' },
    component: TeachersManagers,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/educational-managers',
    name: 'EducationalManagers',
    meta: { title: 'Руководство' },
    component: TeachersManagers,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
];
