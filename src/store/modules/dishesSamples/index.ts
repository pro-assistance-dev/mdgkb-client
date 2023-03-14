import { Module } from 'vuex';

import DishSample from '@/classes/DishSample';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<DishSample>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(DishSample),
  };
};

const state = getDefaultState();
const namespaced = true;

export const dishesSamples: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
