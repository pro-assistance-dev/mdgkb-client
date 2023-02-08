import { ActionTree } from 'vuex';

import FilterQuery from '@/classes/filters/FilterQuery';
import IResidencyCourse from '@/interfaces/IResidencyCourse';
import IResidencyCourseWithCount from '@/interfaces/IResidencyCourseWithCount ';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('residency-courses');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: FilterQuery): Promise<void> => {
    const items = await httpClient.get<IResidencyCourseWithCount>({ query: filterQuery ? filterQuery?.toUrl() : '' });
    if (filterQuery && filterQuery.pagination.cursorMode) {
      commit('appendToAll', items);
      return;
    }
    commit('setAllWithCount', items);
  },
  get: async ({ commit }, filterQuery: FilterQuery): Promise<void> => {
    const res = await httpClient.get<IResidencyCourse>({ query: `get${filterQuery.toUrl()}` });
    commit('set', res);
  },
  create: async ({ state }): Promise<void> => {
    await httpClient.post<IResidencyCourse, IResidencyCourse>({
      payload: state.item,
      isFormData: true,
      fileInfos: state.item.getFileInfos(),
    });
  },
  update: async ({ state, commit }): Promise<void> => {
    const res = await httpClient.put<IResidencyCourse, IResidencyCourse>({
      query: `${state.item.id}`,
      payload: state.item,
      isFormData: true,
      fileInfos: state.item.getFileInfos(),
    });
    commit('set', res);
  },
  updateMany: async ({ state }): Promise<void> => {
    await httpClient.put<IResidencyCourse[], IResidencyCourse[]>({ query: 'many', payload: state.items });
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
