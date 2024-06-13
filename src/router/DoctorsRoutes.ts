import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const DoctorPage = () => import('@/components/Doctors/DoctorPage.vue');
const MedicalWorkersList = () => import('@/components/MedicalWorkers/MedicalWorkersList.vue');
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/doctors/:slug',
    name: 'DoctorPage',
    meta: { title: 'Врачи - ' },
    component: DoctorPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/doctors',
    name: 'DoctorsList',
    meta: { title: 'Врачи' },
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
