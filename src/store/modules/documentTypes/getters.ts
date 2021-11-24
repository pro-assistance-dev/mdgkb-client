import { GetterTree } from 'vuex';

import DocumentsTypesForTablesNames from '@/classes/schema/DocumentsTypesForTablesNames';
import IDocumentType from '@/interfaces/document/IDocumentType';
import RootState from '@/store/types';

import State from './state';

const getters: GetterTree<State, RootState> = {
  item(state): IDocumentType {
    return state.item;
  },
  items(state): IDocumentType[] {
    return state.items;
  },
  getDocumentsTypesForTables(state): DocumentsTypesForTablesNames {
    return state.documentsForTablesNames;
  },
};

export default getters;
