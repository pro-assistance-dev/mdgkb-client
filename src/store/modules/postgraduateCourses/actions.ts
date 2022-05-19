import { ActionTree } from 'vuex';

import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IPostgraduateCourse from '@/interfaces/IPostgraduateCourse';
import IPostgraduateCourseWithCount from '@/interfaces/IPostgraduateCourseWithCount';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('postgraduate-courses');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: IFilterQuery): Promise<void> => {
    const items = await httpClient.get<IPostgraduateCourseWithCount>({ query: filterQuery ? filterQuery?.toUrl() : '' });
    if (filterQuery && filterQuery.pagination.cursorMode) {
      commit('appendToAll', items);
      return;
    }
    commit('setAllWithCount', items);
  },
  get: async ({ commit }, filterQuery: IFilterQuery): Promise<void> => {
    const res = await httpClient.get<IPostgraduateCourse[]>({ query: `get${filterQuery.toUrl()}` });
    commit('set', res);
  },
  create: async ({ state }): Promise<void> => {
    await httpClient.post<IPostgraduateCourse, IPostgraduateCourse>({
      payload: state.item,
      isFormData: true,
      fileInfos: state.item.getFileInfos(),
    });
  },
  update: async ({ state, commit }): Promise<void> => {
    const res = await httpClient.put<IPostgraduateCourse, IPostgraduateCourse>({
      query: `${state.item.id}`,
      payload: state.item,
      isFormData: true,
      fileInfos: state.item.getFileInfos(),
    });
    commit('set', res);
  },
  updateMany: async ({ state }): Promise<void> => {
    await httpClient.put<IPostgraduateCourse[], IPostgraduateCourse[]>({ query: 'many', payload: state.items });
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  getBySlug: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<IPostgraduateCourse>({ query: `slug/${slug}` });
    commit('set', res);
  },
};

export default actions;
