import { Module } from 'vuex';

import PageSection from '@/classes/PageSection';
import DocumentsTypesForTablesNames from '@/classes/schema/DocumentsTypesForTablesNames';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import State from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new PageSection(),
    documentsForTablesNames: new DocumentsTypesForTablesNames(),
  };
};

const state = getDefaultState();

const namespaced = true;

export const documentTypes: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
