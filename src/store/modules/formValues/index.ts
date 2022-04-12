import { Module } from 'vuex';

import Form from '@/classes/Form';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new Form(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const formValues: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
