import { Module } from 'vuex';

import PostgraduateCourse from '@/classes/PostgraduateCourse';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new PostgraduateCourse(),
    count: 0,
  };
};

const state = getDefaultState();
const namespaced = true;

export const postgraduateCourses: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
