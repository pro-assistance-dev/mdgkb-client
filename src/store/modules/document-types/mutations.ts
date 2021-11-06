import { MutationTree } from 'vuex';

import DocumentType from '@/classes/document/DocumentType';
import DocumentsTypesForTablesNames from '@/classes/schema/DocumentsTypesForTablesNames';
import IDocumentType from '@/interfaces/document/IDocumentType';
import { getDefaultState } from '@/store/modules/document-types/index';

import State from './state';

const mutations: MutationTree<State> = {
  set(state, item: IDocumentType) {
    state.item = new DocumentType(item);
  },
  setAll(state, documents: IDocumentType[]) {
    state.items = documents.map((document: IDocumentType) => new DocumentType(document));
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IDocumentType) => i.id === id);
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
