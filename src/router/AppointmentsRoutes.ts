const AppointmentsPage = () => import('@/components/AppointmentsPage/AppointmentsPage.vue');

export default [
  {
    path: '/appointments/oms',
    name: 'AppointmentsPageOms',
    component: AppointmentsPage,
  },
  {
    path: '/appointments/dms',
    name: 'AppointmentsPageDms',
    component: AppointmentsPage,
  },
];
