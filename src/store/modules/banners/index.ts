import { Module } from 'vuex';

import Banner from '@/classes/banners/Banner';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    banners: [],
    banner: new Banner(),
    fileList: [],
  };
};

const state = getDefaultState();
const namespaced = true;

export const banners: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
