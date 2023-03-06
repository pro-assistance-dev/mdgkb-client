import { ActionTree } from 'vuex';

import FilterQuery from '@/services/classes/filters/FilterQuery';
import IFormStatusGroup from '@/interfaces/IFormStatusGroup';
import IFormStatusGroupsWithCount from '@/interfaces/IFormStatusGroupsWithCount';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('form-status-groups');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: FilterQuery): Promise<void> => {
    const item = await httpClient.get<IFormStatusGroupsWithCount>({ query: filterQuery ? filterQuery.toUrl() : '' });
    if (filterQuery && filterQuery.pagination.cursorMode) {
      commit('appendToAll', item);
      return;
    }
    commit('setAllWithCount', item);
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IFormStatusGroup[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state }): Promise<void> => {
    await httpClient.post<IFormStatusGroup, IFormStatusGroup>({
      payload: state.item,
      isFormData: true,
    });
  },
  update: async ({ state, commit }): Promise<void> => {
    const res = await httpClient.put<IFormStatusGroup, IFormStatusGroup>({
      query: `${state.item.id}`,
      payload: state.item,
      isFormData: true,
    });
    commit('set', res);
  },
  updateAll: async ({ state, commit }): Promise<void> => {
    const items = await httpClient.put<IFormStatusGroup[], IFormStatusGroup[]>({ payload: state.items, isFormData: true });
    commit('setAll', items);
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
