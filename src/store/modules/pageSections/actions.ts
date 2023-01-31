import { ActionTree } from 'vuex';

import IFileInfo from '@/interfaces/files/IFileInfo';
import IPageSection from '@/interfaces/IPageSection';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import State from './state';

const httpClient = new HttpClient('document-types');

const actions: ActionTree<State, RootState> = {
  create: async (_, item: IPageSection): Promise<void> => {
    const fileInfos: IFileInfo[] | undefined = item.scan ? [item.scan] : undefined;

    await httpClient.post<IPageSection, IPageSection>({ payload: item, fileInfos, isFormData: true });
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const type = await httpClient.get<IPageSection>({ query: id });

    if (!type) {
      return;
    }

    commit('set', type);
  },
  getAll: async ({ commit, state }): Promise<void> => {
    const documents = await httpClient.get<IPageSection[]>();
    if (!documents) {
      return;
    }
    commit('setAll', documents);
  },
  update: async (_, document: IPageSection): Promise<void> => {
    const fileInfos: IFileInfo[] | undefined = document.scan ? [document.scan] : undefined;
    await httpClient.put<IPageSection, undefined>({ query: document.id, payload: document, fileInfos, isFormData: true });
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete<string, undefined>({ query: id });
    commit('remove', id);
  },
};

export default actions;
