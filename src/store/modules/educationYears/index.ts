import { Module } from 'vuex';

import EducationYear from '@/classes/EducationYear';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new EducationYear(),
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
