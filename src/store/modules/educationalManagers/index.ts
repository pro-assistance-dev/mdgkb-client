import { Module } from 'vuex';

import EducationalManager from '@/classes/EducationalManager';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new EducationalManager(),
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
