import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import State from './state';
import INormativeDocumentType from '@/interfaces/normativeDocument/INormativeDocumentType';

const httpClient = new HttpClient('normative-document-types');

const actions: ActionTree<State, RootState> = {
  create: async ({ commit }, type: INormativeDocumentType): Promise<void> => {
    await httpClient.post<INormativeDocumentType, INormativeDocumentType>({ payload: type });
  },
  get: async ({ commit }, id: string): Promise<void> => {
    commit('set', await httpClient.get<INormativeDocumentType>({ query: id }));
  },
  getAll: async ({ commit }): Promise<void> => {
    const types = await httpClient.get<INormativeDocumentType[]>();

    if (!types) {
      return;
    }

    commit(
      'setAll',
      types.sort((a: INormativeDocumentType, b: INormativeDocumentType) => a.name.localeCompare(b.name))
    );
  },
  update: async ({ commit }, type: INormativeDocumentType): Promise<void> => {
    await httpClient.put<INormativeDocumentType, undefined>({ query: type.id, payload: type });
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete<string, undefined>({ query: id });
  },
};

export default actions;
