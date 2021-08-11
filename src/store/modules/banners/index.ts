import { Module } from 'vuex';

import Banner from '@/classes/banners/Banner';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  banners: [],
  banner: new Banner(),
};

const namespaced = true;

export const banners: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
