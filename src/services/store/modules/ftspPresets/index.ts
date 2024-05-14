import { Module } from 'vuex';

import FTSPPreset from '@/services/classes/FTSPPreset';
import RootState from '@/services/interfaces/types';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<FTSPPreset>;

export const state = (): State => {
  return {
    ...getBaseDefaultState(FTSPPreset),
  };
};

const namespaced = true;

export const ftspPresets: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
