import { Module } from 'vuex';

import Timetable from '@/classes/timetable/Timetable';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new Timetable(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const timetablePatterns: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
