import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

import AboutPage from '@/components/About/AboutPage.vue';
import Contacts from '@/components/Contacts/Contacts.vue';
import CustomPage from '@/components/CustomPage.vue';
import DevPage from '@/components/DevPage.vue';
import DispanserizationPage from '@/components/Dispanserization/DispanserizationPage.vue';
import PublicDocumentsList from '@/components/Documents/PublicDocumentsList.vue';
import DonorRulesPage from '@/components/DonorRules/DonorRulesPage.vue';
import MainPage from '@/components/Main/MainPage.vue';
import MedicalOrganization from '@/components/MedicalOrganization/MedicalOrganization.vue';
import MedicalOrganizationStructure from '@/components/MedicalOrganization/MedicalOrganizationStructure.vue';
import MedicalProfilesList from '@/components/MedicalProfiles/MedicalProfilesList.vue';
import MedicalProfilesPage from '@/components/MedicalProfiles/MedicalProfilesPage.vue';
import MedicalWorkersList from '@/components/MedicalWorkers/MedicalWorkersList.vue';
import PageNotFound from '@/components/PageNotFound.vue';
import PartnersPage from '@/components/Partners/PartnersPage.vue';
import PreparationsPage from '@/components/Preparations/PreparationsPage.vue';
import QuestionsAnswersPage from '@/components/Questions/QuestionsAnswersPage.vue';
import RefreshPasswordPage from '@/components/RefreshPasswordPage.vue';
import SearchPage from '@/components/Search/SearchPage.vue';
import ServiceQualityAssessmentPage from '@/components/ServiceQualityAssessment/ServiceQualityAssessmentPage.vue';
import SideOrganizationsPage from '@/components/SideOrganizations/SideOrganizationsPage.vue';
import SiteMap from '@/components/SiteMap/SiteMap.vue';
import StopComaPage from '@/components/StopComa/StopComaPage.vue';
import AppointmentsRoutes from '@/router/AppointmentsRoutes';
import CommentsRoutes from '@/router/CommentsRoutes';
import DivisionsRoutes from '@/router/DivisionsRoutes';
import DoctorsRoutes from '@/router/DoctorsRoutes';
import EducationalOrganizationRoutes from '@/router/EducationalOrganizationRoutes';
import HospitalizationsRoutes from '@/router/HospitalizationsRoutes';
import indexAdminRoutes from '@/router/indexAdminRoutes';
import MapRoutes from '@/router/MapRoutes';
import NewsRoutes from '@/router/NewsRoutes';
import NormativeDocumentsRoutes from '@/router/NormativeDocumentsRoutes';
import PaidProgramsRoutes from '@/router/PaidProgramsRoutes';
import PaidServicesRoutes from '@/router/PaidServicesRoutes';
import ProfileRoutes from '@/router/ProfileRoutes';
import ProjectsRoutes from '@/router/ProjectsRoutes';
import VacanciesRoutes from '@/router/VacanciesRoutes';
import TokenService from '@/services/Token';
import UserService from '@/services/User';
import MainLayout from '@/views/main/MainLayout.vue';

import store from '../store/index';

export const isAuthorized = (next: NavigationGuardNext): void => {
  const user = localStorage.getItem('user');
  if (user) {
    store.commit('auth/setIsAuth', true);
  }
  next();
};

export const authGuard = (): void => {
  if (!TokenService.isAuth()) {
    router.push('/');
  }
};

export const devGuard = (): void => {
  if (!UserService.isAdmin()) {
    router.push('/dev');
  }
};

export const adminGuard = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): Promise<void> => {
  if (to.path != '/main') {
    try {
      await store.dispatch('auth/checkPathPermissions', to.path);
    } catch (e) {
      console.log(e);
    }
    // await router.push('/');
  }
  next();
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout,
    redirect: '/main',
    beforeEnter(to, from, next) {
      isAuthorized(next);
    },
  },
  {
    path: '/main',
    name: 'MainPage',
    component: MainPage,
    meta: { carousel: true, main: true },
    // beforeEnter: isAuthorized,
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: AboutPage,
    // beforeEnter: isAuthorized,
  },
  {
    path: '/stop-coma',
    name: 'StopComaPage',
    component: StopComaPage,
    beforeEnter(to, from, next) {
      isAuthorized(next);
    },
  },
  {
    path: '/dispanserization',
    name: 'DispanserizationPage',
    component: DispanserizationPage,
    beforeEnter(to, from, next) {
      isAuthorized(next);
    },
  },
  {
    path: '/side-organizations',
    name: 'SideOrganizationsPage',
    component: SideOrganizationsPage,
    beforeEnter(to, from, next) {
      isAuthorized(next);
    },
  },
  {
    path: '/partners',
    name: 'PartnersPage',
    component: PartnersPage,
  },
  {
    path: '/medical-organization-structure',
    name: 'MedicalOrganizationStructure',
    component: MedicalOrganizationStructure,
  },
  {
    path: '/medical-organization',
    name: 'MedicalOrganization',
    component: MedicalOrganization,
  },
  {
    path: '/questions',
    name: 'QuestionsAnswersPage',
    component: QuestionsAnswersPage,
    beforeEnter(to, from, next) {
      isAuthorized(next);
    },
  },
  {
    path: '/preparations',
    name: 'PreparationsPage',
    component: PreparationsPage,
    beforeEnter(to, from, next) {
      isAuthorized(next);
    },
  },
  {
    path: '/donor-rules',
    name: 'DonorRulesPage',
    component: DonorRulesPage,
    beforeEnter(to, from, next) {
      isAuthorized(next);
    },
  },
  {
    path: '/medical-profiles/:id',
    name: 'MedicalProfilesPage',
    component: MedicalProfilesPage,
    beforeEnter(to, from, next) {
      isAuthorized(next);
      devGuard();
    },
  },
  {
    path: '/medical-profiles',
    name: 'MedicalProfilesList',
    component: MedicalProfilesList,
    beforeEnter(to, from, next) {
      isAuthorized(next);
    },
  },
  {
    path: '/public-documents',
    name: 'PublicDocumentsList',
    component: PublicDocumentsList,
  },
  {
    path: '/heads',
    name: 'HeadsList',
    component: MedicalWorkersList,
  },
  {
    path: '/site-map',
    name: 'SiteMap',
    component: SiteMap,
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts,
  },
  {
    path: '/service-quality-assessment',
    name: 'ServiceQualityAssessmentPage',
    component: ServiceQualityAssessmentPage,
  },
  {
    path: '/search',
    name: 'SearchPage',
    component: SearchPage,
    beforeEnter(to, from, next) {
      isAuthorized(next);
      devGuard();
    },
  },
  {
    path: '/restore/password/:userId/:uniqueId',
    name: 'RefreshPasswordPage',
    component: RefreshPasswordPage,
  },
  {
    path: '/access-profile/:userId/:uniqueId',
    name: 'ProfilePasswordPage',
    component: RefreshPasswordPage,
  },
  ...HospitalizationsRoutes,
  ...DoctorsRoutes,
  ...DivisionsRoutes,
  ...MapRoutes,
  ...NewsRoutes,
  ...NormativeDocumentsRoutes,
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
    name: 'CustomPage',
    component: CustomPage,
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
  window.scrollTo(0, 0);
});

// router.beforeEach(isAuthorized);
router.beforeEach(adminGuard);
export default router;
