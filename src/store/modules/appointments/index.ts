import { Module } from 'vuex';

import Appointment from '@/classes/Appointment';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Appointment>;

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Appointment),
  };
};

const state = getDefaultState();
const namespaced = true;

export const appointments: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
