import { Module } from 'vuex';

import Banner from '@/classes/Banner';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Banner>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Banner),
  };
};

const state = getDefaultState();
const namespaced = true;

export const banners: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
