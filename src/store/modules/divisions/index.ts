import { Module } from 'vuex';

import Division from '@/classes/Division';
import DivisionComment from '@/classes/DivisionComment';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export interface State extends IBasicState<Division> {
  comment: DivisionComment;
  onlyShowed: boolean;
}

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Division),
    onlyShowed: false,
    comment: new DivisionComment(),
  };
};
const state = getDefaultState();
const namespaced = true;

export const divisions: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
