import { Module } from 'vuex';

import MedicalProfile from '@/classes/MedicalProfile';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new MedicalProfile(),
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
