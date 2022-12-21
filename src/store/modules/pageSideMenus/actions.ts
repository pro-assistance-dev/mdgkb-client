import { ActionTree } from 'vuex';

import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IPageSideMenu from '@/interfaces/IPageSideMenu';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('page-side-menu');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: IFilterQuery): Promise<void> => {
    const items = await httpClient.get<IPageSideMenu[]>({ query: filterQuery ? filterQuery.toUrl() : '' });
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
    const res = await httpClient.get<IPageSideMenu[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state }, item: IPageSideMenu): Promise<void> => {
    await httpClient.post<IPageSideMenu, IPageSideMenu>({ payload: item, fileInfos: state.fileInfos, isFormData: true });
  },
  update: async ({ state }, item: IPageSideMenu): Promise<void> => {
    await httpClient.put<IPageSideMenu, IPageSideMenu>({
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
    await httpClient.put<IPageSideMenu[], IPageSideMenu[]>({
      query: 'order',
      payload: state.items,
      isFormData: true,
    });
  },
};

export default actions;
