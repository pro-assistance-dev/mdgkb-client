import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const ProjectPage = () => import('@/components/Projects/ProjectPage.vue');
const ProjectsList = () => import('@/components/Projects/ProjectsList.vue');
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/projects',
    name: 'ProjectsList',
    meta: { title: 'Наши проекты' },
    component: ProjectsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/projects/:slug',
    name: 'ProjectPage',
    meta: { title: 'Наши проекты - ' },
    component: ProjectPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
];
