import { Module } from 'vuex';

import EducationalAcademic from '@/classes/EducationalAcademic';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<EducationalAcademic>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(EducationalAcademic),
  };
};

const state = getDefaultState();
const namespaced = true;

export const educationalAcademics: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
