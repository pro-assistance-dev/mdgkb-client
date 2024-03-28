import { Module } from 'vuex';

import HospitalizationType from '@/classes/HospitalizationType';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<HospitalizationType>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(HospitalizationType),
  };
};

const state = getDefaultState();
const namespaced = true;

export const hospitalizationsTypes: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
