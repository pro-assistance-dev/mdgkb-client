import { MutationTree } from 'vuex';

import IUser from '@/interfaces/IUser';

import State from './state';

const mutations: MutationTree<State> = {
  setUser(state, user: IUser) {
    state.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  },
  setToken(state, token: string) {
    state.token = token;
    localStorage.setItem('token', token);
  },
  setIsAuth(state, isAuth: boolean) {
    state.isAuth = isAuth;
  },
  openModal(state, login?: boolean) {
    if (login) {
      state.isLoginModal = true;
    } else {
      state.isLoginModal = false;
    }
    state.authModalVisible = true;
  },
  closeModal(state) {
    state.authModalVisible = false;
  },
  toggleIsLoginModal(state) {
    state.isLoginModal = !state.isLoginModal;
  },
};

export default mutations;
