import { MutationTree } from 'vuex';

import User from '@/classes/User';
import IDoctorUser from '@/interfaces/IDoctorUser';
import ITokens from '@/interfaces/ITokens';
import IUser from '@/interfaces/IUser';
import FavouriteService from '@/services/Favourite';
import TokenService from '@/services/Token';

import State from './state';

const mutations: MutationTree<State> = {
  setUser(state, user: IUser) {
    state.user = new User(user);
    localStorage.setItem('user', JSON.stringify(user));
  },
  clearUser(state) {
    localStorage.removeItem('user');
  },
  setTokens(state, tokens: ITokens) {
    TokenService.setTokens(tokens);
  },
  clearTokens(state) {
    TokenService.clearTokens();
  },
  setIsAuth(state, isAuth: boolean) {
    state.isAuth = isAuth;
  },
  openModal(state, login?: boolean) {
    state.isLoginModal = !!login;
    state.authModalVisible = true;
  },
  closeModal(state) {
    state.authModalVisible = false;
  },
  toggleIsLoginModal(state) {
    state.isLoginModal = !state.isLoginModal;
  },
  setFavourite(state, user: IUser) {
    if (user.doctorsUsers) {
      const doctorsFavourite = user.doctorsUsers.map((i: IDoctorUser) => i.doctorId);
      FavouriteService.setFavourite('doctor', doctorsFavourite);
    }
  },
  clearFavourite(state) {
    FavouriteService.clearFavourite();
  },
};

export default mutations;
