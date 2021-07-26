import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';
import ITag from '@/interfaces/news/ITag';

const httpClient = new HttpClient('tags');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    const res = await httpClient.get<{ data: ITag[] }>();
    commit('setAll', res);
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<ITag>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ commit }, item: ITag): Promise<void> => {
    const res = await httpClient.post<ITag, ITag>({ payload: item });
    commit('appendToAll', item);
  },
  update: async ({ commit }, item: ITag): Promise<void> => {
    const res = await httpClient.put<ITag, ITag>({
      query: `${item.id}`,
    });
  },
  remove: async ({ commit }, newsId: string): Promise<void> => {
    const res = await httpClient.delete({ query: `${newsId}` });
    commit('remove', newsId);
  },
};

export default actions;
