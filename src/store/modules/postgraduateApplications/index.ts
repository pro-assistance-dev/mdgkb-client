import { Module } from 'vuex';

import PostgraduateApplication from '@/classes/PostgraduateApplication';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new PostgraduateApplication(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const postgraduateApplications: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
