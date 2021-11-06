import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import EducationalOrganizationDocuments from '@/components/EducationalOrganization/EducationalOrganizationDocuments.vue';
import EducationalOrganizationInfo from '@/components/EducationalOrganization/EducationalOrganizationInfo.vue';
import EducationalOrganizationStructure from '@/components/EducationalOrganization/EducationalOrganizationStructure.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/educational-organization/info',
    name: 'EducationalOrganizationInfo',
    component: EducationalOrganizationInfo,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/educational-organization/structure',
    name: 'EducationalOrganizationStructure',
    component: EducationalOrganizationStructure,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/educational-organization/document-types',
    name: 'EducationalOrganizationDocuments',
    component: EducationalOrganizationDocuments,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
];
