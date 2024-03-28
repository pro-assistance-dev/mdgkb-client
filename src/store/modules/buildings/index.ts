import { Module } from 'vuex';

import Building from '@/classes/Building';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Building>;

export const state: State = {
  ...getBaseDefaultState(Building),
};

const namespaced = true;

export const buildings: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
