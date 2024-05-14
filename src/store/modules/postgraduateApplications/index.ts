import { Module } from 'vuex';

import PostgraduateApplication from '@/classes/PostgraduateApplication';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export interface State extends IBasicState<PostgraduateApplication> {
  emailExists: boolean;
}
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(PostgraduateApplication),
    emailExists: false,
  };
};
const state = getDefaultState();
const namespaced = true;

export const postgraduateApplications: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
