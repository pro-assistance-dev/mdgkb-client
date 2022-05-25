import { ActionTree } from 'vuex';

import IFileInfo from '@/interfaces/files/IFileInfo';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IPostgraduateDocumentType from '@/interfaces/IPostgraduateDocumentType';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('postgraduate-document-types');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit, state }, filterQuery?: IFilterQuery): Promise<void> => {
    //{ query: filterQuery ? filterQuery.toUrl() : '' }
    const items = await httpClient.get<IPostgraduateDocumentType[]>();
    if (filterQuery) {
      filterQuery.setAllLoaded(items ? items.length : 0);
    }
    if (filterQuery && filterQuery.pagination.cursorMode) {
      commit('appendToAll', items);
      return;
    }
    commit('setAll', items);
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IPostgraduateDocumentType[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state }): Promise<void> => {
    await httpClient.post<IPostgraduateDocumentType[], IPostgraduateDocumentType[]>({
      payload: state.items,
      isFormData: true,
      fileInfos: state.item.getFileInfos(),
    });
  },
  update: async (
    { state, commit },
    { postgraduateDocumentTypes: postgraduateDocumentTypes, postgraduateDocumentTypesForDelete: postgraduateDocumentTypesForDelete }
  ): Promise<void> => {
    const fileInfos: IFileInfo[] = [];
    postgraduateDocumentTypes.forEach((docType: IPostgraduateDocumentType) => {
      fileInfos.push(...docType.getFileInfos());
    });
    const res = await httpClient.put<unknown, unknown>({
      payload: {
        postgraduateDocumentTypes: postgraduateDocumentTypes,
        postgraduateDocumentTypesForDelete: postgraduateDocumentTypesForDelete,
      },
      isFormData: true,
      fileInfos: fileInfos,
    });
    commit('set', res);
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  getBySlug: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<IPostgraduateDocumentType>({ query: `slug/${slug}` });
    commit('set', res);
  },
};

export default actions;
