import { Module } from 'vuex';

import PostgraduateCourse from '@/classes/PostgraduateCourse';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<PostgraduateCourse>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(PostgraduateCourse),
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
