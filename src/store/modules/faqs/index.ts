import { Module } from 'vuex';

import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    faqs: [],
    faqsForDelete: [],
  };
};

const state = getDefaultState();
const namespaced = true;

export const faqs: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
