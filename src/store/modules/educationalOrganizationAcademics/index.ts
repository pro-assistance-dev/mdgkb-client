import { Module } from 'vuex';

import EducationalOrganizationAcademic from '@/classes/EducationalOrganizationAcademic';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new EducationalOrganizationAcademic(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const educationalOrganizationAcademics: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
