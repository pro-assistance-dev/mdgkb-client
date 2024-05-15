import { Module } from 'vuex';

import RootState from '@/store/types';
import Comment from '@/classes/Comment'
import IBasicState from '@/services/store/baseModule/baseState';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export interface State extends IBasicState<Comment> {
  positiveMode: boolean;
}

export const state: State = {
  ...getBaseDefaultState(Comment),
  positiveMode: true,
};

const namespaced = true;

const comments: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default comments;
