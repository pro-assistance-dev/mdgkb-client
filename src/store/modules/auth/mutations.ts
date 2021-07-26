import { MutationTree } from 'vuex';

import State from './state';
import IUser from '@/interfaces/users/IUser';

const mutations: MutationTree<State> = {
  setUser(state, user: IUser) {
    state.user = user;
  },
  setToken(state, token: string) {
    state.token = token;
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
