import { ActionTree } from 'vuex';

import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IPublicDocumentType from '@/interfaces/IPublicDocumentType';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('public-document-types');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: IFilterQuery): Promise<void> => {
    const items = await httpClient.get<IPublicDocumentType[]>({ query: filterQuery ? filterQuery.toUrl() : '' });
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
      fileInfos: [...state.fileInfos, ...item.getFileInfos()],
      isFormData: true,
    });
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  updateOrder: async ({ state }): Promise<void> => {
    await httpClient.put<IPublicDocumentType[], IPublicDocumentType[]>({
      query: 'order',
      payload: state.items,
      isFormData: true,
    });
  },
};

export default actions;
