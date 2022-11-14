import { ActionTree } from 'vuex';

import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IEmployee from '@/interfaces/IEmployee';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('employees');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: IFilterQuery): Promise<void> => {
    const items = await httpClient.get<IEmployee[]>({ query: filterQuery ? filterQuery.toUrl() : '' });
    if (filterQuery && filterQuery.pagination.append) {
      commit('appendToAll', items);
      filterQuery.setAllLoaded(items ? items.length : 0);
      return;
    }
    commit('setAll', items);
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<IEmployee>({ query: `${id}` }));
  },
  create: async ({ commit }, item: IEmployee): Promise<void> => {
    await httpClient.post<IEmployee, IEmployee>({ payload: item, fileInfos: item.getFileInfos(), isFormData: true });
    commit('set');
  },
  update: async ({ commit }, item: IEmployee): Promise<void> => {
    await httpClient.put<IEmployee, IEmployee>({ query: `${item.id}`, payload: item, fileInfos: item.getFileInfos(), isFormData: true });
    commit('set');
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
