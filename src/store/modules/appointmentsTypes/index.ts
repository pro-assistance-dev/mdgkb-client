import { Module } from 'vuex';

import AppointmentType from '@/classes/AppointmentType';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<AppointmentType>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(AppointmentType),
  };
};

const state = getDefaultState();
const namespaced = true;

export const appointmentsTypes: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
