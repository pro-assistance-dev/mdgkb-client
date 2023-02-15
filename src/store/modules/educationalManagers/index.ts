import { Module } from 'vuex';

import EducationalManager from '@/classes/EducationalManager';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<EducationalManager>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(EducationalManager),
  };
};

const state = getDefaultState();
const namespaced = true;

export const educationalManagers: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
