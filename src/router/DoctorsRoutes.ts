import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import DoctorPage from '@/components/Doctors/DoctorPage.vue';
import MedicalWorkersList from '@/components/MedicalWorkers/MedicalWorkersList.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/doctors/:slug',
    name: 'DoctorPage',
    component: DoctorPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/doctors',
    name: 'DoctorsList',
    component: MedicalWorkersList,
  },
  // {
  //   path: '/doctors/',
  //   name: 'DoctorsList',
  //   component: DoctorsList,
  //   beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
  //     isAuthorized(next);
  //   },
  // },
];
