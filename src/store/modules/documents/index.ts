import { Module } from 'vuex';

import Document from '@/classes/document/Document';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import State from './state';

export const state: State = {
  items: [],
  item: new Document(),
};

const namespaced = true;

export const documents: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
