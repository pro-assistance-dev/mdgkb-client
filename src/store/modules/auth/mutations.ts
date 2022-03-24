import { MutationTree } from 'vuex';

import User from '@/classes/User';
import IChild from '@/interfaces/IChild';
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
  addChild(state, child: IChild) {
    if (!state.user) {
      return;
    }
    state.user.children.push(child);
    localStorage.setItem('user', JSON.stringify(state.user));
  },
  clearUser(state) {
    localStorage.removeItem('user');
    state.user = new User();
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
  openModal(state, loginStatus: 'login' | 'register' | 'forgotPassword' | 'passwordChange') {
    state.loginStatus = loginStatus;
    state.authModalVisible = true;
  },
  closeModal(state) {
    state.authModalVisible = false;
  },
  setLogin(state) {
    state.loginStatus = 'login';
  },
  setRegister(state) {
    state.loginStatus = 'register';
  },
  setForgotPassword(state) {
    state.loginStatus = 'forgotPassword';
  },
  setChangePassword(state) {
    state.loginStatus = 'passwordChange';
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
