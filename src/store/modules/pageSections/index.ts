import { Module } from 'vuex';

import PageSection from '@/services/classes/page/PageSection';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
export type State = IBasicState<PageSection>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(PageSection),
  };
};

const state = getDefaultState();

const namespaced = true;

export const pageSections: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
