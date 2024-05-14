import { Module } from 'vuex';

import HolidayForm from '@/classes/HolidayForm';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<HolidayForm>;

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(HolidayForm),
  };
};

const state = getDefaultState();
const namespaced = true;

export const holidayForms: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
