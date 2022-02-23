import { Module } from 'vuex';

import Teacher from '@/classes/Teacher';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new Teacher(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const teachers: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
