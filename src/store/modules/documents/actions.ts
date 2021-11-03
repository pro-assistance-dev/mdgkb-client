import { ActionTree } from 'vuex';

import IDocument from '@/interfaces/document/IDocument';
import IFileInfo from '@/interfaces/files/IFileInfo';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import State from './state';

const httpClient = new HttpClient('documents');

const actions: ActionTree<State, RootState> = {
  create: async (_, item: IDocument): Promise<void> => {
    const fileInfos: IFileInfo[] | undefined = item.fileInfo ? [item.fileInfo] : undefined;

    await httpClient.post<IDocument, IDocument>({ payload: item, fileInfos, isFormData: true });
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const type = await httpClient.get<IDocument>({ query: id });

    if (!type) {
      return;
    }

    commit('set', type);
  },
  getAll: async ({ commit }): Promise<void> => {
    const documents = await httpClient.get<IDocument[]>();

    if (!documents) {
      return;
    }

    commit('setAll', documents);
  },
  update: async (_, document: IDocument): Promise<void> => {
    const fileInfos: IFileInfo[] | undefined = document.fileInfo ? [document.fileInfo] : undefined;

    await httpClient.put<IDocument, undefined>({ query: document.id, payload: document, fileInfos, isFormData: true });
  },
  remove: async (_, id: string): Promise<void> => {
    await httpClient.delete<string, undefined>({ query: id });
  },
};

export default actions;
