const AdmissionCommittee = () => import('@/components/Educational/AdmissionCommittee/AdmissionCommittee.vue');
const AdmissionCoursePage = () => import('@/components/Educational/AdmissionCommittee/AdmissionCoursePage.vue');
const AdmissionForm = () => import('@/components/Educational/AdmissionCommittee/AdmissionForm.vue');
const DpoPage = () => import('@/components/Educational/Dpo/DpoPage.vue');
const NmoCoursePage = () => import('@/components/Educational/Dpo/NmoCoursePage.vue');
const EducationPage = () => import('@/components/Educational/Education/EducationPage.vue');
const PostgraduateCoursePage = () => import('@/components/Educational/Postgraduate/PostgraduateCoursePage.vue');
const PostgraduatePage = () => import('@/components/Educational/Postgraduate/PostgraduatePage.vue');
const EducationalOrganizationAcademics = () => import('@/components/Educational/Postgraduate/PostgraducateAcademics.vue');
const ResidencyCoursePage = () => import('@/components/Educational/Residency/ResidencyCoursePage.vue');
const ResidencyPage = () => import('@/components/Educational/Residency/ResidencyPage.vue');
const TeachersManagers = () => import('@/components/Educational/TeachersManagers/TeachersManagers.vue');

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
