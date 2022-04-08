import { Module } from 'vuex';

import FormStatus from '@/classes/FormStatus';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new FormStatus(),
    formStatusToFormStatuses: [],
  };
};

const state = getDefaultState();
const namespaced = true;

export const formStatuses: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
