import PaidProgramPage from '@/components/PaidPrograms/PaidProgramPage.vue';
import PaidPrograms from '@/components/PaidPrograms/PaidPrograms.vue';

export default [
  {
    path: '/paid-programs',
    name: 'PaidPrograms',
    component: PaidPrograms,
  },
  {
    path: '/paid-programs/:id',
    name: 'PaidProgramPage',
    component: PaidProgramPage,
  },
];
