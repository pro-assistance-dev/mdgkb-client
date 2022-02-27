import VacanciesList from '@/components/Vacansies/VacanciesList.vue';
import VacancyPage from '@/components/Vacansies/VacancyPage.vue';

export default [
  {
    path: '/vacancies',
    name: 'VacanciesList',
    component: VacanciesList,
  },
  {
    path: '/vacancies/:slug',
    name: 'VacancyPage',
    component: VacancyPage,
  },
];
