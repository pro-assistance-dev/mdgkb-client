import { Module } from 'vuex';

import HospitalizationType from '@/classes/hospitalizations/HospitalizationType';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new HospitalizationType(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const hospitalizationsTypes: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
