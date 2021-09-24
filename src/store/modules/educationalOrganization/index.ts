import { Module } from 'vuex';

import EducationalOrganization from '@/classes/educationalOrganization/EducationalOrganization';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  educationalOrganization: new EducationalOrganization(),
};

const namespaced = true;

export const educationalOrganization: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
