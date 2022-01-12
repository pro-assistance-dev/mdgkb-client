import { ActionTree } from 'vuex';

import IPublicDocumentType from '@/interfaces/document/IPublicDocumentType';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('public-document-types');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IPublicDocumentType[]>());
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IPublicDocumentType[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state }, item: IPublicDocumentType): Promise<void> => {
    await httpClient.post<IPublicDocumentType, IPublicDocumentType>({ payload: item, fileInfos: state.fileInfos, isFormData: true });
  },
  update: async ({ state }, item: IPublicDocumentType): Promise<void> => {
    await httpClient.put<IPublicDocumentType, IPublicDocumentType>({
      query: `${item.id}`,
      payload: item,
      fileInfos: state.fileInfos,
      isFormData: true,
    });
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
