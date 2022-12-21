import { Module } from 'vuex';

import DishSample from '@/classes/DishSample';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new DishSample(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const dishesSamples: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
