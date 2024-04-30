import { Module } from 'vuex';

import KladrApi from '@/classes/KladrApi';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  count: 0,
  socialMedia: [],
  addresses: [],
  kladrAPI: new KladrApi(),
};

const namespaced = true;

export const meta: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
