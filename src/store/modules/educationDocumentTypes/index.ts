import { Module } from 'vuex';

import EducationDocumentType from '@/classes/EducationDocumentType';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    itemsForDelete: [],
    item: new EducationDocumentType(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const educationDocumentTypes: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
