import { RouteRecordRaw } from 'vue-router';
import AuthPage from '@/components/Auth/AuthPage.vue';

const AuthRouter: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: AuthPage,
    props: { isLogin: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: AuthPage,
    props: { isLogin: false },
  },
];

export default AuthRouter;
