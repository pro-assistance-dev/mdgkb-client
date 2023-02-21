import { Module } from 'vuex';

import Calendar from '@/classes/Calendar';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export interface State {
  calendar: Calendar;
}
export const getDefaultState = (): State => {
  return {
    calendar: Calendar.InitFull(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const calendar: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
