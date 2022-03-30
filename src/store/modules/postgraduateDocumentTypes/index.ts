import { Module } from 'vuex';

import PostgraduateDocumentType from '@/classes/PostgraduateDocumentType';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new PostgraduateDocumentType(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const postgraduateDocumentTypes: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
