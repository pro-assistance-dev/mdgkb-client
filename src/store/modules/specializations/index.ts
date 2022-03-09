import { Module } from 'vuex';

import Specialization from '@/classes/Specialization';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new Specialization(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const specializations: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
