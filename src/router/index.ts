import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

import Contacts from '@/components/Contacts/Contacts.vue';
import DevPage from '@/components/DevPage.vue';
import BufetWrapper from '@/components/Diets/BufetWrapper.vue';
import DietsSelect from '@/components/Diets/DietsSelect.vue';
import DispanserizationPage from '@/components/Dispanserization/DispanserizationPage.vue';
import DonorRulesPage from '@/components/DonorRules/DonorRulesPage.vue';
import MainPage from '@/components/Main/MainPage.vue';
import MedicalOrganization from '@/components/MedicalOrganization/MedicalOrganization.vue';
import MedicalOrganizationStructure from '@/components/MedicalOrganization/MedicalOrganizationStructure.vue';
import MedicalProfilesList from '@/components/MedicalProfiles/MedicalProfilesList.vue';
import MedicalProfilesPage from '@/components/MedicalProfiles/MedicalProfilesPage.vue';
import MedicalWorkersList from '@/components/MedicalWorkers/MedicalWorkersList.vue';
import PageComponent from '@/components/Page/PageComponent.vue';
import PageNotFound from '@/components/PageNotFound.vue';
import PartnersPage from '@/components/Partners/PartnersPage.vue';
import PreparationsPage from '@/components/Preparations/PreparationsPage.vue';
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
import scroll from '@/services/Scroll';
import TokenService from '@/services/Token';
import UserService from '@/services/User';

import store from '../store/index';

export const isAuthorized = (next: NavigationGuardNext): void => {
  const user = localStorage.getItem('user');
  if (user) {
    store.commit('auth/setIsAuth', true);
  }
  next();
};

export const authGuard = (next?: NavigationGuardNext): void => {
  if (next) {
    const isAuth: boolean = store.getters['auth/isAuth'];
    store.commit('auth/showWarning', true);
    store.commit('auth/authOnly', true);
    if (!isAuth) {
      store.commit('auth/openModal', 'login');
    }
    next();
    return;
  }

  if (!TokenService.isAuth()) {
    router.push('/');
  }
};

export const devGuard = (): void => {
  if (!UserService.isAdmin()) {
    router.push('/dev');
  }
};

export const adminGuard = async (to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext): Promise<void> => {
  if (to.path != '/main') {
    try {
      await store.dispatch('auth/checkPathPermissions', to.matched[0].path);
    } catch (e) {
      await router.push('/');
    }
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
    component: BufetWrapper,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard(next);
    },
  },
  {
    path: '/bufet/cart',
    name: 'BufetCart',
    component: BufetWrapper,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard(next);
    },
  },
  {
    path: '/bufet/order',
    name: 'BufetOrder',
    component: BufetWrapper,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard(next);
    },
  },
  {
    path: '/screening',
    name: 'ScreeningPage',
    component: ScreeningPage,
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

router.beforeEach(() => {
  document.body.scrollTo({ top: 0 });
});

router.beforeEach(adminGuard);
export default router;
