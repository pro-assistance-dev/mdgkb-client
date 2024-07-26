import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const AdminCommonVisitingRulesList = () => import('@/components/admin/AdminCommonVisitingRules/AdminCommonVisitingRulesList.vue');
const AdminDishes = () => import('@/components/admin/AdminDishes/AdminDishes.vue');
const AdminDonorRules = () => import('@/components/admin/AdminDonorRules/AdminDonorRules.vue');
const AdminGatesList = () => import('@/components/admin/AdminGates/AdminGatesList.vue');
import AdminAcademicsRoutes from '@/router/AdminAcademicsRoutes';
import AdminAppointmentsRoutes from '@/router/AdminAppointmentsRoutes';
import AdminBannersRoutes from '@/router/AdminBannersRoutes';
import AdminCommentsRoutes from '@/router/AdminCommentsRoutes';
import AdminDailyMenuOrdersRoutes from '@/router/AdminDailyMenuOrdersRoutes';
import AdminDictionaryRoutes from '@/router/AdminDictionaryRoutes';
import AdminEducationalOrganizationRoutes from '@/router/AdminEducationalOrganizationRoutes';
import AdminEmployeesRoutes from '@/router/AdminEmployeesRoutes';
import AdminFaqsRoutes from '@/router/AdminFaqsRoutes';
import AdminFormPatternRoutes from '@/router/AdminFormPatternRoutes';
import AdminFormStatusesRoutes from '@/router/AdminFormStatusesRoutes';
import AdminHospitalizationsRoutes from '@/router/AdminHospitalizationsRoutes';
import AdminHospitalizationsTypeRoutes from '@/router/AdminHospitalizationsTypeRoutes';
import AdminMedicalProfiles from '@/router/AdminMedicalProfiles';
import AdminMenusRoutes from '@/router/AdminMenusRoutes';
import AdminNewsRoutes from '@/router/AdminNewsRoutes';
import AdminNewsSlideRoutes from '@/router/AdminNewsSlideRoutes';
import AdminPagesRoutes from '@/router/AdminPagesRoutes';
import AdminPaidServicesGroupsRoutes from '@/router/AdminPaidServicesGroupsRoutes';
import AdminPartnersRoutes from '@/router/AdminPartnersRoutes';
import AdminPermissionsRoutes from '@/router/AdminPermissionsRoutes';
import AdminPreparations from '@/router/AdminPreparations';
import AdminProjectRoutes from '@/router/AdminProjectRoutes';
import AdminQuestionsRoutes from '@/router/AdminQuestionsRoutes';
import AdminRolesRoutes from '@/router/AdminRolesRoutes';
import AdminSupportMessagesRoutes from '@/router/AdminSupportMessagesRoutes';
import AdminTimetablePatternRoutes from '@/router/AdminTimetablePatternRoutes';
import AdminUsersRoutes from '@/router/AdminUsersRoutes';
import AdminVacanciesRoutes from '@/router/AdminVacanciesRoutes';
import AdminVisitsApplicationsRoutes from '@/router/AdminVisitsApplicationsRoutes';
import { authGuard,isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/common-visiting-rules',
    name: 'AdminCommonVisitingRulesList',
    component: AdminCommonVisitingRulesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/donor-rules',
    name: 'AdminDonorRules',
    component: AdminDonorRules,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/gates',
    name: 'AdminGatesList',
    component: AdminGatesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/dishes',
    name: 'AdminDishes',
    component: AdminDishes,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  ...AdminDictionaryRoutes,
  ...AdminNewsRoutes,
  ...AdminBannersRoutes,
  ...AdminEducationalOrganizationRoutes,
  ...AdminMenusRoutes,
  ...AdminPagesRoutes,
  ...AdminVacanciesRoutes,
  ...AdminCommentsRoutes,
  ...AdminFaqsRoutes,
  ...AdminNewsSlideRoutes,
  ...AdminQuestionsRoutes,
  ...AdminTimetablePatternRoutes,
  ...AdminPaidServicesGroupsRoutes,
  ...AdminProjectRoutes,
  ...AdminPartnersRoutes,
  ...AdminPreparations,
  ...AdminMedicalProfiles,
  ...AdminAppointmentsRoutes,
  ...AdminFormPatternRoutes,
  ...AdminFormStatusesRoutes,
  ...AdminPermissionsRoutes,
  ...AdminRolesRoutes,
  ...AdminUsersRoutes,
  ...AdminVisitsApplicationsRoutes,
  ...AdminEmployeesRoutes,
  ...AdminHospitalizationsRoutes,
  ...AdminSupportMessagesRoutes,
  ...AdminHospitalizationsTypeRoutes,
  ...AdminDailyMenuOrdersRoutes,
  ...AdminAcademicsRoutes,
];
