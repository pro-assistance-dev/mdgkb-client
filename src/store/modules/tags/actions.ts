import { ActionTree } from 'vuex';

import ITag from '@/interfaces/news/ITag';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('tags');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    const res = await httpClient.get<{ data: ITag[] }>();
    commit('setAll', res);
    commit('setFilteredTagList');
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<ITag>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ commit }, item: ITag): Promise<void> => {
    const res = await httpClient.post<ITag, ITag>({ payload: item });
    commit('appendToAll', res);
  },
  update: async (_, item: ITag): Promise<void> => {
    await httpClient.put<ITag, ITag>({
      query: `${item.id}`,
    });
  },
  remove: async ({ commit }, newsId: string): Promise<void> => {
    await httpClient.delete({ query: `${newsId}` });
    commit('remove', newsId);
  },
  filterTagList: async ({ commit }, tags: ITag[]) => {
    commit('setFilteredTagList', tags);
  },
};

export default actions;
