import { Module } from 'vuex';

import AdmissionCommitteeDocumentType from '@/classes/AdmissionCommitteeDocumentType';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    itemsForDelete: [],
    item: new AdmissionCommitteeDocumentType(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const admissionCommitteeDocumentTypes: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
