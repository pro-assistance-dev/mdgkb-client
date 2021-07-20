import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';
import INews from '@/interfaces/news/INews';

const httpClient = new HttpClient('news');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, publishedOn?: Date): Promise<void> => {
    const res = await httpClient.get<{ data: INews[] }>({ query: publishedOn ? `?publishedOn=${publishedOn}` : '' });
    if (res && !publishedOn) commit('setAll', res);
    if (res && publishedOn) commit('appendToAll', res);
  },
  get: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<INews>({ query: `item/${slug}` });
    commit('set', res);
  },
};

export default actions;
