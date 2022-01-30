import { Module } from 'vuex';

import CallbackRequest from '@/classes/CallbackRequest';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new CallbackRequest(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const callbackRequests: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
