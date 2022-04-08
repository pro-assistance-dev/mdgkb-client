import { Module } from 'vuex';

import ResidencyDocumentType from '@/classes/ResidencyDocumentType';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new ResidencyDocumentType(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const residencyDocumentTypes: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
