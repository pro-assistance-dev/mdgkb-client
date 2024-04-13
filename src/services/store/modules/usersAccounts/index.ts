import { Module } from 'vuex';

import UserAccount from '@/services/classes/UserAccount';
import RootState from '@/services/interfaces/types';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<UserAccount>;

export const state = (): State => {
  return {
    ...getBaseDefaultState(UserAccount),
  };
};

const namespaced = true;

export const usersAccounts: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
