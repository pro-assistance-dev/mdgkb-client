import { ActionTree } from 'vuex';

import FilterQuery from '@/classes/filters/FilterQuery';
import { IBodyfulParams } from '@/interfaces/fetchApi/IHTTPTypes';
import IFileInfosGetter from '@/interfaces/IFileInfosGetter';
import ItemsWithCount from '@/interfaces/ItemsWithCount';
import IWithId from '@/interfaces/IWithId';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

export default function getBaseActions<T extends IWithId & IFileInfosGetter, StateType>(
  endPoint: string
): ActionTree<StateType, RootState> {
  const httpClient = new HttpClient(endPoint);
  return {
    getAll: async ({ commit }, filterQuery?: FilterQuery): Promise<void> => {
      const items = await httpClient.get<T[]>({ query: filterQuery ? filterQuery.toUrl() : '' });
      if (filterQuery && filterQuery.pagination.append) {
        commit('appendToAll', items);
        filterQuery.pagination.setAllLoaded(items ? items.length : 0);
        return;
      }
      commit('setAll', items);
    },
    getAllWithCount: async ({ commit }, filterQuery?: FilterQuery): Promise<void> => {
      commit('setAllWithCount', await httpClient.get<ItemsWithCount<T>[]>({ query: filterQuery ? filterQuery.toUrl() : '' }));
    },
    get: async ({ commit }, id: string) => {
      commit('set', await httpClient.get<T>({ query: `${id}` }));
    },
    create: async ({ commit }, item: T): Promise<void> => {
      const opts: IBodyfulParams<T> = { payload: item, isFormData: true };
      if (item.getFileInfos) {
        opts.fileInfos = item.getFileInfos();
      }
      await httpClient.post<T, T>(opts);
      commit('set');
    },
    update: async ({ commit }, item: T): Promise<void> => {
      const opts: IBodyfulParams<T> = { query: `${item.id}`, payload: item, isFormData: true };
      if (item.getFileInfos) {
        opts.fileInfos = item.getFileInfos();
      }
      await httpClient.put<T, T>(opts);
      commit('set');
    },
    updateAndSet: async ({ commit }, item: T): Promise<void> => {
      const opts: IBodyfulParams<T> = { query: `${item.id}`, payload: item, isFormData: true };
      if (item.getFileInfos) {
        opts.fileInfos = item.getFileInfos();
      }
      commit('set', await httpClient.put<T, T>(opts));
    },
    updateWithoutReset: async ({ commit }, item: T): Promise<void> => {
      const opts: IBodyfulParams<T> = { query: `${item.id}`, payload: item, isFormData: true };
      if (item.getFileInfos) {
        opts.fileInfos = item.getFileInfos();
      }
      await httpClient.put<T, T>(opts);
    },
    remove: async ({ commit }, id: string): Promise<void> => {
      await httpClient.delete({ query: `${id}` });
      commit('remove', id);
    },
  };
}
