import { ActionTree } from 'vuex';

import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ICenter from '@/interfaces/ICenter';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('centers');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit, state }, filterQuery?: IFilterQuery): Promise<void> => {
    const items = await httpClient.get<ICenter[]>({ query: filterQuery ? filterQuery.toUrl() : '' });
    if (filterQuery) {
      filterQuery.setAllLoaded(items ? items.length : 0);
    }
    if (filterQuery && filterQuery.pagination.cursorMode) {
      commit('appendToAll', items);
      return;
    }
    commit('setAll', items);
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<ICenter>({ query: `${id}` }));
  },
  create: async ({ commit }, item: ICenter): Promise<void> => {
    await httpClient.post<ICenter, ICenter>({ payload: item, isFormData: true });
    commit('set');
  },
  update: async ({ commit }, item: ICenter): Promise<void> => {
    await httpClient.put<ICenter, ICenter>({ query: `${item.id}`, payload: item, isFormData: true });
    commit('set');
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
