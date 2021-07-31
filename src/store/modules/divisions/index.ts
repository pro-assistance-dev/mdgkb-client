import { Module } from 'vuex';

import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';
import Division from '@/classes/buildings/Division';

export const state: State = {
  divisions: [],
  division: new Division(),
};

const namespaced = true;

export const divisions: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
