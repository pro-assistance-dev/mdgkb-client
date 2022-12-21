import { MutationTree } from 'vuex';

import PageSection from '@/classes/PageSection';
import DocumentsTypesForTablesNames from '@/classes/schema/DocumentsTypesForTablesNames';
import IPageSection from '@/interfaces/IPageSection';
import { getDefaultState } from '@/store/modules/documentTypes/index';

import State from './state';

const mutations: MutationTree<State> = {
  set(state, item: IPageSection) {
    state.item = new PageSection(item);
  },
  setAll(state, documents: IPageSection[]) {
    state.items = documents.map((document: IPageSection) => new PageSection(document));
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IPageSection) => i.id === id);
    state.items.splice(index, 1);
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  setDocumentsForTablesNames(state, item: DocumentsTypesForTablesNames) {
    state.documentsForTablesNames = new DocumentsTypesForTablesNames(item);
  },
};

export default mutations;
