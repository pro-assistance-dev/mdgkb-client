import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminCertificates from '@/components/admin/AdminCertificates/AdminCertificates.vue';
import AdminCommonVisitingRulesList from '@/components/admin/AdminCommonVisitingRules/AdminCommonVisitingRulesList.vue';
import AdminDonorRules from '@/components/admin/AdminDonorRules/AdminDonorRules.vue';
import AdminApplicationForEntryRoutes from '@/router/AdminApplicationForEntryRoutes';
import AdminAppointmentsRoutes from '@/router/AdminAppointmentsRoutes';
import AdminBannersRoutes from '@/router/AdminBannersRoutes';
import AdminCommentsRoutes from '@/router/AdminCommentsRoutes';
import AdminDictionaryRoutes from '@/router/AdminDictionaryRoutes';
import AdminDoctorsRoutes from '@/router/AdminDoctorsRoutes';
import AdminDocumentsTypeRoutes from '@/router/AdminDocumentsTypeRoutes';
import AdminEducationalOrganizationRoutes from '@/router/AdminEducationalOrganizationRoutes';
import AdminFaqsRoutes from '@/router/AdminFaqsRoutes';
import AdminFormPatternRoutes from '@/router/AdminFormPatternRoutes';
import AdminFormStatusesRoutes from '@/router/AdminFormStatusesRoutes';
import AdminHeadsRoutes from '@/router/AdminHeadsRoutes';
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
import AdminPublicDocumentTypesRoutes from '@/router/AdminPublicDocumentTypesRoutes';
import AdminQuestionsRoutes from '@/router/AdminQuestionsRoutes';
import AdminRolesRoutes from '@/router/AdminRolesRoutes';
import AdminTimetablePatternRoutes from '@/router/AdminTimetablePatternRoutes';
import AdminUsersRoutes from '@/router/AdminUsersRoutes';
import AdminVacanciesRoutes from '@/router/AdminVacanciesRoutes';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/common-visiting-rules',
    name: 'AdminCommonVisitingRulesList',
    component: AdminCommonVisitingRulesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
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
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/certificates',
    name: 'AdminCertificates',
    component: AdminCertificates,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  // {
  //   path: '/admin/application-for-entry',
  //   name: 'AdminApplicationForEntry',
  //   component: AdminApplicationForEntry,
  //   beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
  //     isAuthorized(next);
  //     authGuard();
  //   },
  //   meta: {
  //     layout: 'AdminLayout',
  //   },
  // },
  ...AdminDoctorsRoutes,
  ...AdminDictionaryRoutes,
  ...AdminNewsRoutes,
  ...AdminBannersRoutes,
  ...AdminEducationalOrganizationRoutes,
  ...AdminMenusRoutes,
  ...AdminPagesRoutes,
  ...AdminVacanciesRoutes,
  ...AdminDocumentsTypeRoutes,
  ...AdminCommentsRoutes,
  ...AdminFaqsRoutes,
  ...AdminNewsSlideRoutes,
  ...AdminQuestionsRoutes,
  ...AdminTimetablePatternRoutes,
  ...AdminHeadsRoutes,
  ...AdminPaidServicesGroupsRoutes,
  ...AdminProjectRoutes,
  ...AdminPartnersRoutes,
  ...AdminPreparations,
  ...AdminPublicDocumentTypesRoutes,
  ...AdminMedicalProfiles,
  ...AdminAppointmentsRoutes,
  ...AdminApplicationForEntryRoutes,
  ...AdminFormPatternRoutes,
  ...AdminFormStatusesRoutes,
  ...AdminPermissionsRoutes,
  ...AdminRolesRoutes,
  ...AdminUsersRoutes,
];
