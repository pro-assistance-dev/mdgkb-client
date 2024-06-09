import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const VacanciesList = () => import('@/components/Vacansies/VacanciesList.vue');
const VacancyPage = () => import('@/components/Vacansies/VacancyPage.vue');
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/vacancies',
    name: 'VacanciesList',
    component: VacanciesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/vacancies/:id',
    name: 'VacancyPage',
    component: VacancyPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
];
