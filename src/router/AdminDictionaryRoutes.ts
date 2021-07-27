import AdminDivisionsList from '@/components/admin/AdminDivisions/AdminDivisionsList.vue';
import AdminBuildingsList from '@/components/admin/AdminBuildings/AdminBuildingsList.vue';

export default [
  {
    path: '/admin/dictionary/buildings',
    name: 'AdminBuildingsList',
    component: AdminBuildingsList,
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/dictionary/divisions',
    name: 'AdminDivisionsList',
    component: AdminDivisionsList,
    meta: {
      layout: 'AdminLayout',
    },
  },
];
