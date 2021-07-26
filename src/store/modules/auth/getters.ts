import { GetterTree } from 'vuex';
import RootState from '@/store/types';
import State from './state';
import IUser from '@/interfaces/users/IUser';

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
