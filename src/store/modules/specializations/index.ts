import { Module } from 'vuex';

import Specialization from '@/classes/Specialization';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Specialization>;

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Specialization),
  };
};

const state = getDefaultState();
const namespaced = true;

export const specializations: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
