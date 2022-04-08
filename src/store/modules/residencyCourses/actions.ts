import { ActionTree } from 'vuex';

import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IResidencyCourse from '@/interfaces/IResidencyCourse';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('residency-courses');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit, state }, filterQuery?: IFilterQuery): Promise<void> => {
    const items = await httpClient.get<IResidencyCourse[]>({ query: filterQuery ? filterQuery.toUrl() : '' });
    if (filterQuery) {
      filterQuery.setAllLoaded(items ? items.length : 0);
    }
    if (filterQuery && filterQuery.pagination.cursorMode) {
      commit('appendToAll', items);
      return;
    }
    commit('setAll', items);
  },
  get: async ({ commit }, filterQuery: IFilterQuery): Promise<void> => {
    const res = await httpClient.get<IResidencyCourse[]>({ query: `get${filterQuery.toUrl()}` });
    commit('set', res);
  },
  create: async ({ state }): Promise<void> => {
    await httpClient.post<IResidencyCourse, IResidencyCourse>({
      payload: state.item,
      isFormData: true,
      // fileInfos: state.item.getFileInfos(),
    });
  },
  update: async ({ state, commit }): Promise<void> => {
    const res = await httpClient.put<IResidencyCourse, IResidencyCourse>({
      query: `${state.item.id}`,
      payload: state.item,
      isFormData: true,
      // fileInfos: state.item.getFileInfos(),
    });
    commit('set', res);
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  getBySlug: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<IResidencyCourse>({ query: `slug/${slug}` });
    commit('set', res);
  },
};

export default actions;
