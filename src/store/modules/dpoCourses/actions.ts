import { ActionTree } from 'vuex';

import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IDpoCourse from '@/interfaces/IDpoCourse';
import IDpoCourseWithCount from '@/interfaces/IDpoCourseWithCount ';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('dpo-courses');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: IFilterQuery): Promise<void> => {
    const items = await httpClient.get<IDpoCourseWithCount>({ query: filterQuery ? filterQuery?.toUrl() : '' });
    if (filterQuery && filterQuery.pagination.cursorMode) {
      commit('appendToAll', items);
      return;
    }
    commit('setAllWithCount', items);
  },
  get: async ({ commit }, filterQuery: IFilterQuery): Promise<void> => {
    const res = await httpClient.get<IDpoCourse[]>({ query: `get${filterQuery.toUrl()}` });
    commit('set', res);
  },
  create: async ({ state }): Promise<void> => {
    await httpClient.post<IDpoCourse, IDpoCourse>({
      payload: state.item,
      isFormData: true,
      fileInfos: state.item.formPattern.getFileInfos(),
    });
  },
  update: async ({ state, commit }, item?: IDpoCourse): Promise<void> => {
    const i = item || state.item;
    const res = await httpClient.put<IDpoCourse, IDpoCourse>({
      query: `${i.id}`,
      payload: i,
      isFormData: true,
      fileInfos: i.formPattern.getFileInfos(),
    });
    commit('set', res);
  },
  saveMany: async ({ state }): Promise<void> => {
    await httpClient.put<IDpoCourse[], IDpoCourse[]>({ query: 'many', payload: state.items });
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  getBySlug: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<IDpoCourse>({ query: `slug/${slug}` });
    commit('set', res);
  },
};

export default actions;
