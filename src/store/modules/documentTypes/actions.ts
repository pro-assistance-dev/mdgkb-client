import { ActionTree } from 'vuex';

import DocumentsTypesForTablesNames from '@/classes/schema/DocumentsTypesForTablesNames';
import IDocumentType from '@/interfaces/document/IDocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import State from './state';

const httpClient = new HttpClient('document-types');

const actions: ActionTree<State, RootState> = {
  create: async (_, item: IDocumentType): Promise<void> => {
    const fileInfos: IFileInfo[] | undefined = item.scan ? [item.scan] : undefined;

    await httpClient.post<IDocumentType, IDocumentType>({ payload: item, fileInfos, isFormData: true });
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const type = await httpClient.get<IDocumentType>({ query: id });

    if (!type) {
      return;
    }

    commit('set', type);
  },
  getAll: async ({ commit, state }): Promise<void> => {
    const query = state.documentsForTablesNames.createQueryParam();
    const documents = await httpClient.get<IDocumentType[]>({ query: query });

    if (!documents) {
      return;
    }

    commit('setAll', documents);
  },
  update: async (_, document: IDocumentType): Promise<void> => {
    const fileInfos: IFileInfo[] | undefined = document.scan ? [document.scan] : undefined;

    await httpClient.put<IDocumentType, undefined>({ query: document.id, payload: document, fileInfos, isFormData: true });
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete<string, undefined>({ query: id });
    commit('remove', id);
  },
  getDocumentsTypesForTables: async ({ commit }): Promise<void> => {
    commit('setDocumentsForTablesNames', await httpClient.get<DocumentsTypesForTablesNames[]>({ query: 'for/tables-names' }));
  },
};

export default actions;
