import { ActionTree } from 'vuex';

import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IPostgraduateApplication from '@/interfaces/IPostgraduateApplication';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('postgraduate-applications');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: IFilterQuery): Promise<void> => {
    const items = await httpClient.get<IPostgraduateApplication[]>({ query: filterQuery ? filterQuery.toUrl() : '' });
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
    const res = await httpClient.get<IPostgraduateApplication[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state }): Promise<void> => {
    // const fileInfos: IFileInfo[] = [];
    // for (const key in state.item) {
    //   if (Object.prototype.hasOwnProperty.call(state.item, key)) {
    //     const property = state.item[key as keyof IPostgraduateApplication];
    //     const prorertyClassName = property?.constructor.name;
    //     if (prorertyClassName === 'FileInfo' && (property as IFileInfo).originalName) {
    //       fileInfos.push(property as IFileInfo);
    //     }
    //   }
    // }
    await httpClient.post<IPostgraduateApplication, IPostgraduateApplication>({
      payload: state.item,
      isFormData: true,
      fileInfos: state.item.getFileInfos(),
    });
  },
  update: async ({ commit }, item: IPostgraduateApplication): Promise<void> => {
    const res = await httpClient.put<IPostgraduateApplication, IPostgraduateApplication>({ query: `${item.id}`, payload: item, isFormData: true });
    commit('set', res);
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  getBySlug: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<IPostgraduateApplication>({ query: `slug/${slug}` });
    commit('set', res);
  },
};

export default actions;
