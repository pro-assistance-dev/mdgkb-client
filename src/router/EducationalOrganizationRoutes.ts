import AdmissionCommittee from '@/components/Educational/AdmissionCommittee/AdmissionCommittee.vue';
import AdmissionCoursePage from '@/components/Educational/AdmissionCommittee/AdmissionCoursePage.vue';
import DpoPage from '@/components/Educational/Dpo/DpoPage.vue';
import NmoCoursePage from '@/components/Educational/Dpo/NmoCoursePage.vue';
import EducationPage from '@/components/Educational/Education/EducationPage.vue';
import PostgraduateCoursePage from '@/components/Educational/Postgraduate/PostgraduateCoursePage.vue';
import PostgraduatePage from '@/components/Educational/Postgraduate/PostgraduatePage.vue';
import EducationalOrganizationAcademics from '@/components/Educational/Postgraduate/PostgraducateAcademics.vue';
import ResidencyCoursePage from '@/components/Educational/Residency/ResidencyCoursePage.vue';
import ResidencyPage from '@/components/Educational/Residency/ResidencyPage.vue';
import TeachersManagers from '@/components/Educational/TeachersManagers/TeachersManagers.vue';

export default [
  {
    path: '/educational-info',
    name: 'EducationPage',
    meta: { title: 'Сведения об образовательной организации' },
    component: EducationPage,
  },
  {
    path: '/admission-committee',
    name: 'AdmissionCommittee',
    meta: { title: 'Приёмная кампания' },
    component: AdmissionCommittee,
  },
  {
    path: '/academics',
    name: 'EducationalOrganizationAcademics',
    meta: { title: 'Учёный совет' },
    component: EducationalOrganizationAcademics,
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
    path: '/candidates-minimum',
    name: 'CandidatesMinimum',
    meta: { title: 'Кандидатский минимум' },
    component: PostgraduatePage,
  },
  {
    path: '/dpo',
    name: 'DpoCourses',
    meta: { title: 'ДПО' },
    component: DpoPage,
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
