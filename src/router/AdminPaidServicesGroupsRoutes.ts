import AdminPaidProgramPage from '@/components/admin/AdminPaidProgramsGroups/AdminPaidProgramPage.vue';
import AdminPaidProgramsGroupsList from '@/components/admin/AdminPaidProgramsGroups/AdminPaidProgramsGroupsList.vue';

export default [
  {
    path: '/admin/paid-programs-groups',
    name: 'AdminPaidProgramsGroupsList',
    component: AdminPaidProgramsGroupsList,
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/paid-programs/:id',
    name: 'AdminPaidProgramPage',
    component: AdminPaidProgramPage,
    meta: {
      layout: 'AdminLayout',
    },
  },
];
