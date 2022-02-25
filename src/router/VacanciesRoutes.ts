import VacanciesList from '@/components/Vacansies/VacanciesList.vue';
import VacancyPage from '@/components/Vacansies/VacancyPage.vue';

export default [
  {
    path: '/vacancies',
    name: 'VacanciesList',
    component: VacanciesList,
  },
  {
    path: '/vacancies/:id',
    name: 'VacancyPage',
    component: VacancyPage,
  },
];
