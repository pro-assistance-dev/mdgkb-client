import { ActionTree } from 'vuex';

import IFileInfo from '@/interfaces/files/IFileInfo';
import INormativeDocument from '@/interfaces/normativeDocument/INormativeDocument';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import State from './state';

const httpClient = new HttpClient('normative-documents');

const actions: ActionTree<State, RootState> = {
  create: async (_, document: INormativeDocument): Promise<void> => {
    const fileInfos: IFileInfo[] | undefined = document.fileInfo ? [document.fileInfo] : undefined;

    await httpClient.post<INormativeDocument, INormativeDocument>({ payload: document, fileInfos, isFormData: true });
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const type = await httpClient.get<INormativeDocument>({ query: id });

    if (!type) {
      return;
    }

    commit('set', type);
  },
  getAll: async ({ commit }): Promise<void> => {
    const documents = await httpClient.get<INormativeDocument[]>();

    if (!documents) {
      return;
    }

    commit('setAll', documents);
  },
  update: async (_, document: INormativeDocument): Promise<void> => {
    const fileInfos: IFileInfo[] | undefined = document.fileInfo ? [document.fileInfo] : undefined;

    await httpClient.put<INormativeDocument, undefined>({ query: document.id, payload: document, fileInfos, isFormData: true });
  },
  remove: async (_, id: string): Promise<void> => {
    await httpClient.delete<string, undefined>({ query: id });
  },
};

export default actions;
