import { Module } from 'vuex';

import CertificatesWithDeleted from '@/classes/CertificatesWithDeleted';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: new CertificatesWithDeleted(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const certificates: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
