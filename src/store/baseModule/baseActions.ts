import { ActionTree } from 'vuex';

import IFileInfo from '@/interfaces/files/IFileInfo';
import ItemsWithCount from '@/interfaces/ItemsWithCount';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import HttpClient from '@/services/HttpClient';
import IFileInfosGetter from '@/services/interfaces/IFileInfosGetter';
import { IBodilessParams, IBodyfulParams } from '@/services/interfaces/IHTTPTypes';
import IWithId from '@/services/interfaces/IWithId';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

export default function getBaseActions<T extends IWithId & IFileInfosGetter, StateType extends IBasicState<T>>(
  endPointOrClient: HttpClient | string
): ActionTree<StateType, RootState> {
  let httpClient: HttpClient = new HttpClient();
  if (typeof endPointOrClient === 'string') {
    httpClient = new HttpClient(endPointOrClient);
  } else {
    httpClient = endPointOrClient;
  }

  return {
    getAll: async ({ commit }, filterQuery?: FilterQuery): Promise<void> => {
      const res = await httpClient.get<T[] | ItemsWithCount<T>>({ query: filterQuery ? filterQuery.toUrl() : '' });
      if (Array.isArray(res)) {
        if (filterQuery && filterQuery.pagination.append && res) {
          commit('appendToAll', res);
          filterQuery.pagination.setAllLoaded(res ? res.length : 0);
          return;
        }
        commit('setAll', res);
      } else {
        if (filterQuery && filterQuery.pagination.append && res) {
          commit('appendToAll', res.items);
          filterQuery.pagination.setAllLoaded(res.items.length ? res.items.length : 0);
          return;
        }
        commit('setAllWithCount', res);
      }
    },
    getAllWithCount: async ({ commit }, filterQuery?: FilterQuery): Promise<void> => {
      const res = await httpClient.get<ItemsWithCount<T>>({ query: filterQuery ? filterQuery.toUrl() : '' });
      if (filterQuery && filterQuery.pagination.append && res) {
        commit('appendToAll', res.items);
        filterQuery.pagination.setAllLoaded(res.items.length ? res.items.length : 0);
        return;
      }
      commit('setAllWithCount', res);
    },
    get: async ({ commit }, filter: string | FilterQuery) => {
      let query: IBodilessParams;
      if (typeof filter === 'string') {
        query = { query: filter };
      } else {
        query = { query: `get${filter.toUrl()}` };
      }
      commit('set', await httpClient.get<T>(query));
    },
    create: async ({ commit, state }, item: T): Promise<void> => {
      if (!item) {
        item = state.item;
      }
      const opts: IBodyfulParams<T> = { payload: item, isFormData: true };
      if (item.getFileInfos) {
        opts.fileInfos = item.getFileInfos();
        opts.fileInfos.forEach((f: IFileInfo) => (f.url = ''));
      }
      await httpClient.post<T, T>(opts);
      commit('set');
    },
    createWithoutReset: async ({ commit, state }, item: T): Promise<void> => {
      if (!item) {
        item = state.item;
      }
      const opts: IBodyfulParams<T> = { payload: item, isFormData: true };
      if (item.getFileInfos) {
        opts.fileInfos = item.getFileInfos();
        opts.fileInfos.forEach((f: IFileInfo) => (f.url = ''));
      }
      await httpClient.post<T, T>(opts);
    },
    update: async ({ commit, state }, item: T): Promise<void> => {
      if (!item) {
        item = state.item;
      }
      const opts: IBodyfulParams<T> = { query: `${item.id}`, payload: item, isFormData: true };
      if (item.getFileInfos) {
        opts.fileInfos = item.getFileInfos();
        opts.fileInfos.forEach((f: IFileInfo) => (f.url = ''));
      }
      await httpClient.put<T, T>(opts);
      commit('set');
    },
    updateAndSet: async ({ commit, state }, item: T): Promise<void> => {
      if (!item) {
        item = state.item;
      }
      const opts: IBodyfulParams<T> = { query: `${item.id}`, payload: item, isFormData: true };
      if (item.getFileInfos) {
        opts.fileInfos = item.getFileInfos();
      }
      commit('set', await httpClient.put<T, T>(opts));
    },
    updateWithoutReset: async ({ commit, state }, item: T): Promise<void> => {
      if (!item) {
        item = state.item;
      }
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
    updateMany: async ({ state }): Promise<void> => {
      await httpClient.put<T[], T[]>({ query: 'many', payload: state.items });
    },
  };
}
