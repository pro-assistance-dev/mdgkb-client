import { Module } from 'vuex';

import NewsSlide from '@/classes/newsSlides/NewsSlide';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new NewsSlide(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const newsSlides: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
