import { ActionTree } from 'vuex';

import Tag from '@/classes/Tag';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('tags');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    const res = await httpClient.get<{ data: Tag[] }>();
    commit('setAll', res);
    commit('setFilteredTagList');
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<Tag>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ commit }, item: Tag): Promise<void> => {
    const res = await httpClient.post<Tag, Tag>({ payload: item });
    commit('appendToAll', res);
  },
  update: async (_, item: Tag): Promise<void> => {
    await httpClient.put<Tag, Tag>({
      query: `${item.id}`,
    });
  },
  remove: async ({ commit }, newsId: string): Promise<void> => {
    await httpClient.delete({ query: `${newsId}` });
    commit('remove', newsId);
  },
  filterTagList: async ({ commit }, tags: Tag[]) => {
    commit('setFilteredTagList', tags);
  },
};

export default actions;
