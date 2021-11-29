import { GetterTree } from 'vuex';

import IUser from '@/interfaces/IUser';
import RootState from '@/store/types';

import State from './state';

const getters: GetterTree<State, RootState> = {
  building(state): string {
    return state.token;
  },
  user(state): IUser | undefined {
    return state.user;
  },
  isAuth(state): boolean {
    return state.isAuth;
  },
  authModalVisible(state): boolean {
    return state.authModalVisible;
  },
  isLoginModal(state): boolean {
    return state.isLoginModal;
  },
};

export default getters;
