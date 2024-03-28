import { Module } from 'vuex';

import Timetable from '@/classes/Timetable';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Timetable>;

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Timetable),
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
