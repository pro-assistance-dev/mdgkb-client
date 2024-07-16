import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

const Contacts = () => import('@/components/Contacts/Contacts.vue');
const DevPage = () => import('@/components/DevPage.vue');
const BufetPage = () => import('@/components/Diets/BufetPage.vue');
const DietsSelect = () => import('@/components/Diets/DietsSelect.vue');
const DispanserizationPage = () => import('@/components/Dispanserization/DispanserizationPage.vue');
const DonorRulesPage = () => import('@/components/DonorRules/DonorRulesPage.vue');
const IsometricMap = () => import('@/components/IsometricMap/IsometricMap.vue');
const MainPage = () => import('@/components/Main/MainPage.vue');
const MedicalOrganization = () => import('@/components/MedicalOrganization/MedicalOrganization.vue');
const MedicalOrganizationStructure = () => import('@/components/MedicalOrganization/MedicalOrganizationStructure.vue');
const MedicalProfilesList = () => import('@/components/MedicalProfiles/MedicalProfilesList.vue');
const MedicalProfilesPage = () => import('@/components/MedicalProfiles/MedicalProfilesPage.vue');
const MedicalWorkersList = () => import('@/components/MedicalWorkers/MedicalWorkersList.vue');
const PageComponent = () => import('@/components/Page/PageComponent.vue');
const PageNotFound = () => import('@/services/components/PageNotFound.vue');
const PartnersPage = () => import('@/components/Partners/PartnersPage.vue');
const PreparationsPage = () => import('@/components/Preparations/PreparationsPage.vue');
const ChoiceListPage = () => import('@/components/Profile/ChoiceListPage.vue');
const QuestionsAnswersPage = () => import('@/components/Questions/QuestionsAnswersPage.vue');
const RefreshPasswordPage = () => import('@/components/RefreshPasswordPage.vue');
const RejectEmailPage = () => import('@/components/RejectEmailPage.vue');
const ScreeningPage = () => import('@/components/ScreeningPage.vue');
const SearchPage = () => import('@/components/Search/SearchPage.vue');
const ServiceQualityAssessmentPage = () => import('@/components/ServiceQualityAssessment/ServiceQualityAssessmentPage.vue');
const SideOrganizationsPage = () => import('@/components/SideOrganizations/SideOrganizationsPage.vue');
const SiteMap = () => import('@/components/SiteMap/SiteMap.vue');
const StopComaPage = () => import('@/components/StopComa/StopComaPage.vue');
const VisitsApplicationPage = () => import('@/components/VisitsApplicationPage.vue');
import AppointmentsRoutes from '@/router/AppointmentsRoutes';
import CommentsRoutes from '@/router/CommentsRoutes';
import DivisionsRoutes from '@/router/DivisionsRoutes';
import DoctorsRoutes from '@/router/DoctorsRoutes';
import EducationalOrganizationRoutes from '@/router/EducationalOrganizationRoutes';
import HospitalizationsRoutes from '@/router/HospitalizationsRoutes';
import indexAdminRoutes from '@/router/indexAdminRoutes';
import NewsRoutes from '@/router/NewsRoutes';
import PaidProgramsRoutes from '@/router/PaidProgramsRoutes';
import PaidServicesRoutes from '@/router/PaidServicesRoutes';
import ProfileRoutes from '@/router/ProfileRoutes';
import ProjectsRoutes from '@/router/ProjectsRoutes';
import VacanciesRoutes from '@/router/VacanciesRoutes';
import Store from '@/store/Store';

export const isAuthorized = (next: NavigationGuardNext): void => {
  const auth = Store.Getters('auth/auth');
  auth.value.actualize();
  next();
};

export const authGuard = async (next?: NavigationGuardNext): Promise<void> => {
  const auth = Store.Getters('auth/auth');
  auth.value.actualize();
  console.log(auth.value);
  if (!auth.value.isAuth) {
    const modal = Store.Getters('auth/modal');
    modal.value.open();
    router.push('/');
  }
  if (next) {
    next();
  }
};

export const devGuard = (): void => {
  // if (!UserService.isAdmin()) {
  //   router.push('/dev');
  // }
};

export const adminGuard = async (to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext): Promise<void> => {
  if (to.path != '/main') {
    // try {
    //   await store.dispatch('auth/checkPathPermissions', to.matched[0].path);
    // } catch (e) {
    //   await router.push('/');
    // }
  }
  next();
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/main',
    name: 'MainPage',
    component: MainPage,
    meta: { carousel: true, main: true, title: 'Главная' },
  },
  {
    path: '/stop-coma',
    name: 'StopComaPage',
    component: StopComaPage,
    meta: { title: 'Стоп-кома' },
  },
  {
    path: '/dispanserization',
    name: 'DispanserizationPage',
    component: DispanserizationPage,
    meta: { title: 'Диспансеризация' },
  },
  {
    path: '/side-organizations',
    name: 'SideOrganizationsPage',
    component: SideOrganizationsPage,
    meta: { title: 'Сведения об организации' },
  },
  {
    path: '/partners',
    name: 'PartnersPage',
    meta: { title: 'Наши партнеры' },
    component: PartnersPage,
  },
  {
    path: '/medical-organization-structure',
    name: 'MedicalOrganizationStructure',
    meta: { title: 'Структура и органы управления' },
    component: MedicalOrganizationStructure,
  },
  {
    path: '/medical-organization',
    name: 'MedicalOrganization',
    meta: { title: 'Данные о медицинской организации' },
    component: MedicalOrganization,
  },
  {
    path: '/questions',
    name: 'QuestionsAnswersPage',
    meta: { title: 'Вопросы и ответы' },
    component: QuestionsAnswersPage,
  },
  {
    path: '/preparations',
    name: 'PreparationsPage',
    meta: { title: 'Подготовки к исследованиям' },
    component: PreparationsPage,
  },
  {
    path: '/donor-rules',
    name: 'DonorRulesPage',
    meta: { title: 'Правила для доноров' },
    component: DonorRulesPage,
  },
  {
    path: '/medical-profiles/:id',
    name: 'MedicalProfilesPage',
    meta: { title: 'Профиль помощи' },
    component: MedicalProfilesPage,
  },
  {
    path: '/medical-profiles',
    name: 'MedicalProfilesList',
    meta: { title: 'Профили помощи' },
    component: MedicalProfilesList,
  },
  {
    path: '/heads',
    name: 'HeadsList',
    meta: { title: 'Руководство' },
    component: MedicalWorkersList,
  },
  {
    path: '/site-map',
    name: 'SiteMap',
    meta: { title: 'Карта сайта' },
    component: SiteMap,
  },
  {
    path: '/isometric-map/:id',
    name: 'IsometricMapDivision',
    meta: { layout: 'EmptyLayout', title: 'Изометрическая карта больницы' },
    component: IsometricMap,
  },
  {
    path: '/isometric-map',
    name: 'IsometricMap',
    meta: { layout: 'EmptyLayout', title: 'Изометрическая карта больницы' },
    component: IsometricMap,
  },
  {
    path: '/contacts',
    name: 'Contacts',
    meta: { title: 'Контакты' },
    component: Contacts,
  },
  {
    path: '/service-quality-assessment',
    name: 'ServiceQualityAssessmentPage',
    meta: { title: 'Независимая оценка качества оказания услуг' },
    component: ServiceQualityAssessmentPage,
  },
  {
    path: '/search',
    name: 'SearchPage',
    meta: { title: 'Поиск' },
    component: SearchPage,
  },
  {
    path: '/restore/password/:userId/:uniqueId',
    name: 'RefreshPasswordPage',
    meta: { title: 'Сброс пароля' },
    component: RefreshPasswordPage,
  },
  {
    path: '/reject-email/:userId/:uniqueId',
    name: 'RejectEmailPage',
    meta: { title: 'Сброс пароля' },
    component: RejectEmailPage,
  },
  {
    path: '/access-profile/:userId/:uniqueId',
    name: 'ProfilePasswordPage',
    component: RefreshPasswordPage,
  },
  {
    path: '/visits-application/:gateId',
    name: 'VisitsApplicationPage',
    component: VisitsApplicationPage,
  },
  {
    path: '/diets',
    name: 'DietsSelect',
    meta: { title: 'Выбор питания' },
    component: DietsSelect,
  },
  {
    path: '/bufet',
    name: 'BufetPage',
    component: BufetPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard(next);
    },
  },
  {
    path: '/screening',
    name: 'ScreeningPage',
    component: ScreeningPage,
  },
  {
    path: '/choice-list',
    name: 'ChoiceListPage',
    // meta: { title: 'Вопросы и ответы' },
    component: ChoiceListPage,
  },
  ...HospitalizationsRoutes,
  ...DoctorsRoutes,
  ...DivisionsRoutes,
  ...NewsRoutes,
  ...PaidServicesRoutes,
  ...CommentsRoutes,
  ...ProfileRoutes,
  ...EducationalOrganizationRoutes,
  ...ProjectsRoutes,
  ...PaidProgramsRoutes,
  ...AppointmentsRoutes,
  ...indexAdminRoutes,
  ...VacanciesRoutes,
  {
    path: '/pages/:slug',
    name: 'PageComponent',
    component: PageComponent,
  },
  {
    path: '/dev',
    name: 'DevPage',
    component: DevPage,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach(() => {
  document.body.scrollTo({ top: 0 });
});

router.beforeEach(adminGuard);
export default router;
