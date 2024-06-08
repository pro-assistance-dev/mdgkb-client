import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdmissionCommittee from '@/components/Educational/AdmissionCommittee/AdmissionCommittee.vue';
import AdmissionCoursePage from '@/components/Educational/AdmissionCommittee/AdmissionCoursePage.vue';
const AdmissionForm = () => import('@/components/Educational/AdmissionCommittee/AdmissionForm.vue');
import DpoPage from '@/components/Educational/Dpo/DpoPage.vue';
import NmoCoursePage from '@/components/Educational/Dpo/NmoCoursePage.vue';
import EducationPage from '@/components/Educational/Education/EducationPage.vue';
import PostgraduateCoursePage from '@/components/Educational/Postgraduate/PostgraduateCoursePage.vue';
import PostgraduatePage from '@/components/Educational/Postgraduate/PostgraduatePage.vue';
import EducationalOrganizationAcademics from '@/components/Educational/Postgraduate/PostgraducateAcademics.vue';
import ResidencyCoursePage from '@/components/Educational/Residency/ResidencyCoursePage.vue';
import ResidencyPage from '@/components/Educational/Residency/ResidencyPage.vue';
import TeachersManagers from '@/components/Educational/TeachersManagers/TeachersManagers.vue';

import { authGuard } from '.';

export default [
  {
    component: EducationPage,
    meta: { title: 'Сведения об образовательной организации' },
    name: 'EducationPage',
    path: '/educational-info',
  },
  {
    component: AdmissionCommittee,
    meta: { title: 'Приёмная кампания' },
    name: 'AdmissionCommittee',
    path: '/admission-committee',
  },
  {
    component: EducationalOrganizationAcademics,
    meta: { title: 'Учёный совет' },
    path: '/academics',
    name: 'EducationalOrganizationAcademics',
  },
  {
    path: '/postgraduate',
    name: 'PostgraduatePage',
    meta: { title: 'Аспирантура' },
    component: PostgraduatePage,
  },
  {
    path: '/postgraduate-courses/:id',
    name: 'PostgraduateCoursePage',
    meta: { title: 'Аспирантура - курс' },
    component: PostgraduateCoursePage,
  },
  {
    path: '/residency',
    name: 'ResidencyPage',
    meta: { title: 'Ординатура' },
    component: ResidencyPage,
  },
  {
    path: '/residency-courses/:id',
    name: 'ResidencyCoursePage',
    meta: { title: 'Ординатура - курс' },
    component: ResidencyCoursePage,
  },
  {
    path: '/admission-courses/:id',
    name: 'AdmissionCoursePage',
    meta: { title: 'Ординатура - курс' },
    component: AdmissionCoursePage,
  },
  {
    component: AdmissionForm,
    meta: { title: 'Форма' },
    name: 'AdmissionForm',
    path: '/admission-form',
    // beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
    //   authGuard(next);
    // },
  },
  {
    path: '/candidates-minimum',
    name: 'CandidatesMinimum',
    meta: { title: 'Кандидатский минимум' },
    component: PostgraduatePage,
  },
  {
    component: DpoPage,
    path: '/dpo',
    name: 'DpoCourses',
    meta: { title: 'ДПО' },
  },
  {
    path: '/nmo-courses/:id',
    name: 'NmoCoursePage',
    meta: { title: 'ДПО - курс' },
    component: NmoCoursePage,
  },
  {
    path: '/teachers',
    name: 'Teachers',
    meta: { title: 'Преподаватели' },
    component: TeachersManagers,
  },
  {
    path: '/educational-managers',
    name: 'EducationalManagers',
    meta: { title: 'Руководство' },
    component: TeachersManagers,
  },
];
