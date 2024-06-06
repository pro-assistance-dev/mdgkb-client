import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

import Contacts from '@/components/Contacts/Contacts.vue';
import DevPage from '@/components/DevPage.vue';
import BufetPage from '@/components/Diets/BufetPage.vue';
import DietsSelect from '@/components/Diets/DietsSelect.vue';
import DispanserizationPage from '@/components/Dispanserization/DispanserizationPage.vue';
import DonorRulesPage from '@/components/DonorRules/DonorRulesPage.vue';
import HolidayPage from '@/components/HolidayPage.vue';
import IsometricMap from '@/components/IsometricMap/IsometricMap.vue';
import MainPage from '@/components/Main/MainPage.vue';
import MedicalOrganization from '@/components/MedicalOrganization/MedicalOrganization.vue';
import MedicalOrganizationStructure from '@/components/MedicalOrganization/MedicalOrganizationStructure.vue';
import MedicalProfilesList from '@/components/MedicalProfiles/MedicalProfilesList.vue';
import MedicalProfilesPage from '@/components/MedicalProfiles/MedicalProfilesPage.vue';
import MedicalWorkersList from '@/components/MedicalWorkers/MedicalWorkersList.vue';
import PageComponent from '@/components/Page/PageComponent.vue';
import PageNotFound from '@/services/components/PageNotFound.vue';
import PartnersPage from '@/components/Partners/PartnersPage.vue';
import PreparationsPage from '@/components/Preparations/PreparationsPage.vue';
import ChoiceListPage from '@/components/Profile/ChoiceListPage.vue';
import QuestionsAnswersPage from '@/components/Questions/QuestionsAnswersPage.vue';
import RefreshPasswordPage from '@/components/RefreshPasswordPage.vue';
import RejectEmailPage from '@/components/RejectEmailPage.vue';
import ScreeningPage from '@/components/ScreeningPage.vue';
import SearchPage from '@/components/Search/SearchPage.vue';
import ServiceQualityAssessmentPage from '@/components/ServiceQualityAssessment/ServiceQualityAssessmentPage.vue';
import SideOrganizationsPage from '@/components/SideOrganizations/SideOrganizationsPage.vue';
import SiteMap from '@/components/SiteMap/SiteMap.vue';
import StopComaPage from '@/components/StopComa/StopComaPage.vue';
import VisitsApplicationPage from '@/components/VisitsApplicationPage.vue';
import AppointmentsRoutes from '@/router/AppointmentsRoutes';
import CommentsRoutes from '@/router/CommentsRoutes';
import DivisionsRoutes from '@/router/DivisionsRoutes';
import DoctorsRoutes from '@/router/DoctorsRoutes';
import EducationalOrganizationRoutes from '@/router/EducationalOrganizationRoutes';
import HospitalizationsRoutes from '@/router/HospitalizationsRoutes';
import indexAdminRoutes from '@/router/indexAdminRoutes';
import MapRoutes from '@/router/MapRoutes';
import NewsRoutes from '@/router/NewsRoutes';
import PaidProgramsRoutes from '@/router/PaidProgramsRoutes';
import PaidServicesRoutes from '@/router/PaidServicesRoutes';
import ProfileRoutes from '@/router/ProfileRoutes';
import ProjectsRoutes from '@/router/ProjectsRoutes';
import VacanciesRoutes from '@/router/VacanciesRoutes';
import UserService from '@/services/User';

import Store from '@/services/Store';

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
  if (!UserService.isAdmin()) {
    router.push('/dev');
  }
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
    path: '/holiday',
    name: 'HolidayPage',
    component: HolidayPage,
    meta: { title: 'День редких болезней' },
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
  ...MapRoutes,
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
