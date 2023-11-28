import { MutationTree } from 'vuex';

import Child from '@/classes/Child';
import DoctorUser from '@/classes/DoctorUser';
import PathPermission from '@/classes/PathPermission';
import User from '@/classes/User';
import IPathPermission from '@/interfaces/IPathPermission';
import IPathPermissionsWithCount from '@/interfaces/IPathPermissionsWithCount';
import FavouriteService from '@/services/Favourite';
import ITokens from '@/services/interfaces/ITokens';
import TokenService from '@/services/Token';

import State from './state';

const mutations: MutationTree<State> = {
  setUser(state, user: User) {
    state.user = new User(user);
    localStorage.setItem('user', JSON.stringify(user));
  },
  addChild(state, child: Child) {
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

  setFavourite(state, user: User) {
    if (user.doctorsUsers) {
      const doctorsFavourite = user.doctorsUsers.map((i: DoctorUser) => i.doctorId);
      FavouriteService.setFavourite('doctor', doctorsFavourite);
    }
  },
  clearFavourite(state) {
    FavouriteService.clearFavourite();
  },
  setPathPermissions(state, items: IPathPermission[]) {
    state.pathPermissions = items.map((i: IPathPermission) => new PathPermission(i));
  },
  setPathPermissionsAdmin(state, items: IPathPermissionsWithCount) {
    state.pathPermissions = items.pathPermissions.map((i: IPathPermission) => new PathPermission(i));
    state.count = items.count;
  },
  setUserPathPermissions(state, items: IPathPermission[]) {
    state.userPathPermissions = items.map((i: IPathPermission) => new PathPermission(i));
  },
  showWarning(state, value: boolean) {
    state.showWarning = value;
  },
  authOnly(state, value: boolean) {
    state.authOnly = value;
  },
};

export default mutations;
