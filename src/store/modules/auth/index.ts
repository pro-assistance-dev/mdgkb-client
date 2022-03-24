import { Module } from 'vuex';

import User from '@/classes/User';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import State from './state';

export const state: State = {
  user: new User(),
  token: '',
  isAuth: false,
  authModalVisible: false,
  loginStatus: 'login',
};

const namespaced = true;

const auth: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default auth;
