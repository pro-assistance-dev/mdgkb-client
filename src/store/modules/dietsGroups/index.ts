import { Module } from 'vuex';

import DietGroup from '@/classes/DietGroup';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<DietGroup>;

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(DietGroup),
  };
};

const state = getDefaultState();
const namespaced = true;

export const dietsGroups: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
