import { ActionTree } from 'vuex';

import IEducationYear from '@/interfaces/IEducationYear';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('education-years');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit, state }, filterQuery?: FilterQuery): Promise<void> => {
    const items = await httpClient.get<IEducationYear[]>({ query: filterQuery ? filterQuery.toUrl() : '' });
    if (filterQuery) {
      filterQuery.pagination.setAllLoaded(items ? items.length : 0);
    }
    if (filterQuery && filterQuery.pagination.cursorMode) {
      commit('appendToAll', items);
      return;
    }
    commit('setAll', items);
  },
  get: async ({ commit }, filterQuery: FilterQuery): Promise<void> => {
    const res = await httpClient.get<IEducationYear[]>({ query: `get${filterQuery.toUrl()}` });
    commit('set', res);
  },
  create: async ({ state }): Promise<void> => {
    await httpClient.post<IEducationYear, IEducationYear>({
      payload: state.item,
      isFormData: true,
    });
  },
  update: async ({ state, commit }): Promise<void> => {
    const res = await httpClient.put<IEducationYear, IEducationYear>({
      query: `${state.item.id}`,
      payload: state.item,
      isFormData: true,
    });
    commit('set', res);
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  getBySlug: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<IEducationYear>({ query: `slug/${slug}` });
    commit('set', res);
  },
};

export default actions;
