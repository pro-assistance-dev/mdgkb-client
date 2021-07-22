import { RouteRecordRaw } from 'vue-router';
import AuthPage from '@/components/Auth/AuthPage.vue';
import { isAuthorized } from '@/router/index';

const AuthRouter: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: AuthPage,
    props: { isLogin: true },
    beforeEnter: isAuthorized,
  },
  {
    path: '/register',
    name: 'Register',
    component: AuthPage,
    props: { isLogin: false },
    beforeEnter: isAuthorized,
  },
];

export default AuthRouter;
