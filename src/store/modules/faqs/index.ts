import { Module } from 'vuex';

import Faq from '@/classes/Faq';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new Faq(),
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
