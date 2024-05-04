import { Module } from 'vuex';

import FormStatus from '@/classes/FormStatus';
import RootState from '@/store/types';

import IBasicState from '@/services/store/baseModule/baseState';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export interface State extends IBasicState<FormStatus> {
  allLoaded: boolean;
}
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(FormStatus),
    formStatusToFormStatuses: [],
  };
};

const state = getDefaultState();
const namespaced = true;

export const formStatuses: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
