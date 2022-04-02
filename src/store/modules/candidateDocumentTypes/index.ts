import { Module } from 'vuex';

import CandidateDocumentType from '@/classes/CandidateDocumentType';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new CandidateDocumentType(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const candidateDocumentTypes: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
