import DivisionPage from '@/components/Divisions/DivisionPage.vue';
import DivisionsCentersList from '@/components/Divisions/DivisionsCentersList.vue';

export default [
  {
    path: '/divisions',
    name: 'DivisionsList',
    component: DivisionsCentersList,
  },
  {
    path: '/centers',
    name: 'CentersList',
    component: DivisionsCentersList,
  },
  {
    path: '/divisions/:id',
    name: 'DivisionPage',
    component: DivisionPage,
  },
];
