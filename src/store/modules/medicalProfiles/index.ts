import { Module } from 'vuex';

import MedicalProfile from '@/classes/MedicalProfile';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<MedicalProfile>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(MedicalProfile),
  };
};

const state = getDefaultState();
const namespaced = true;

export const medicalProfiles: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
