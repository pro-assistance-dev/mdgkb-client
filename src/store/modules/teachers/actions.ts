import { ActionTree } from 'vuex';

import FilterQuery from '@/classes/filters/FilterQuery';
import ITeacher from '@/interfaces/ITeacher';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('teachers');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: FilterQuery): Promise<void> => {
    const items = await httpClient.get<ITeacher[]>({ query: filterQuery ? filterQuery.toUrl() : '' });
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
    const res = await httpClient.get<ITeacher[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state, commit }): Promise<void> => {
    await httpClient.post<ITeacher, ITeacher>({ payload: state.item, isFormData: true });
    commit('resetItem');
  },
  update: async ({ commit }, item: ITeacher): Promise<void> => {
    const res = await httpClient.put<ITeacher, ITeacher>({ query: `${item.id}`, payload: item, isFormData: true });
    commit('set', res);
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  getBySlug: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<ITeacher>({ query: `slug/${slug}` });
    commit('set', res);
  },
};

export default actions;
