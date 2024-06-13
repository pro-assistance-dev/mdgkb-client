const DivisionPage = () => import('@/components/Divisions/DivisionPage.vue');
const DivisionsCentersList = () => import('@/components/Divisions/DivisionsCentersList.vue');

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
