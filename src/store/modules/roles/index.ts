import { Module } from 'vuex';

import Role from '@/services/classes/Role';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new Role(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const roles: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
