import { Module } from 'vuex';

import Preparation from '@/classes/Preparation';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Preparation>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Preparation),
  };
};

const state = getDefaultState();
const namespaced = true;

export const preparations: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
