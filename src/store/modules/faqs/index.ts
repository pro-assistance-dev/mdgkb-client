import { Module } from 'vuex';

import Faq from '@/classes/Faq';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Faq>;

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Faq),
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
