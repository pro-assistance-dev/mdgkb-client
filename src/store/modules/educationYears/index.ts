import { Module } from 'vuex';

import EducationYear from '@/classes/EducationYear';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<EducationYear>;

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(EducationYear),
  };
};

const state = getDefaultState();
const namespaced = true;

export const educationYears: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
