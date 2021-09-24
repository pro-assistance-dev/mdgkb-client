import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

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
];
