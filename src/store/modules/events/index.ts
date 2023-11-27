import { Module } from 'vuex';

import Event from '@/classes/Event';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    event: new Event(),
    items: [],
  };
};

const state = getDefaultState();
const namespaced = true;

export const events: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
