import { Module } from 'vuex';

import Preparation from '@/classes/Preparation';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    itemsForDelete: [],
    item: new Preparation(),
    tags: [],
  };
};

const state = getDefaultState();
const namespaced = true;

export const preparations: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
