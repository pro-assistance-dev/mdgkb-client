import { ActionTree } from 'vuex';

import IChild from '@/interfaces/IChild';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('children');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit, state }, filterQuery?: FilterQuery): Promise<void> => {
    const items = await httpClient.get<IChild[]>({ query: filterQuery ? filterQuery.toUrl() : '' });
    if (filterQuery) {
      filterQuery.pagination.setAllLoaded(items ? items.length : 0);
    }
    if (filterQuery && filterQuery.pagination.cursorMode) {
      commit('appendToAll', items);
      return;
    }
    commit('setAll', items);
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IChild[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state, commit }): Promise<void> => {
    await httpClient.post<IChild, IChild>({ payload: state.item, isFormData: true });
    // commit('resetItem');
  },
  update: async ({ commit }, item: IChild): Promise<void> => {
    const res = await httpClient.put<IChild, IChild>({ query: `${item.id}`, payload: item, isFormData: true });
    commit('set', res);
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  getBySlug: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<IChild>({ query: `slug/${slug}` });
    commit('set', res);
  },
};

export default actions;
