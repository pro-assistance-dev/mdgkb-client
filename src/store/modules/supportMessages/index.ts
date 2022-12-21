import { Module } from 'vuex';

import SupportMessage from '@/classes/SupportMessage';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new SupportMessage(),
    question: new SupportMessage(),
    allLoaded: false,
    count: 0,
  };
};

const state = getDefaultState();
const namespaced = true;

export const supportMessages: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
