import { Module } from 'vuex';

import PublicDocumentType from '@/classes/document/PublicDocumentType';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new PublicDocumentType(),
    fileInfos: [],
  };
};

const state = getDefaultState();
const namespaced = true;

export const publicDocumentTypes: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
