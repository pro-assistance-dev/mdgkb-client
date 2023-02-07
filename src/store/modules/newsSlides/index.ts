import { Module } from 'vuex';

import NewsSlide from '@/classes/newsSlides/NewsSlide';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state = (): State => {
  return {
    ...getBaseDefaultState(NewsSlide),
  };
};

const namespaced = true;

export const newsSlides: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
