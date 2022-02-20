import { Module } from 'vuex';

import Appointment from '@/classes/Appointment';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new Appointment(),
  };
};

const state = getDefaultState();
console.log(state);
const namespaced = true;

export const appointments: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
