import { Module } from 'vuex';

import AppointmentType from '@/classes/AppointmentType';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new AppointmentType(),
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
