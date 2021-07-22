import DivisionPage from '@/components/Divisions/DivisionPage.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/divisions/:id',
    name: 'DivisionPage',
    component: DivisionPage,
    beforeEnter: isAuthorized,
  },
];
