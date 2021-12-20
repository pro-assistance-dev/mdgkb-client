import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import ProjectPage from '@/components/Projects/ProjectPage.vue';
import ProjectsList from '@/components/Projects/ProjectsList.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/projects',
    name: 'ProjectsList',
    component: ProjectsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/projects/:slug',
    name: 'ProjectPage',
    component: ProjectPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
];
