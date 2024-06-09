const PaidProgramPage = () => import('@/components/PaidPrograms/PaidProgramPage.vue');
const PaidPrograms = () => import('@/components/PaidPrograms/PaidPrograms.vue');

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
