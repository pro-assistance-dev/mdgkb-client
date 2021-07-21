import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';
import INews from '@/interfaces/news/INews';
import INewsLike from "@/interfaces/news/INewsLike";

const httpClient = new HttpClient('news');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, publishedOn?: Date): Promise<void> => {
    const res = await httpClient.get<{ data: INews[] }>({ query: publishedOn ? `?publishedOn=${publishedOn}` : '' });
    if (res && !publishedOn) commit('setAll', res);
    if (res && publishedOn) commit('appendToAll', res);
  },
  get: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<INews>({ query: `${slug}` });
    commit('set', res);
  },
  createLike: async ({ commit }, newsLike: INewsLike): Promise<void> => {
    const res = await httpClient.post<INewsLike, INewsLike>({ query: `like`, payload: newsLike });
    commit('setLikeNews', res);
  },
  deleteLike: async ({ commit }, newsLikeId: string): Promise<void> => {
    const res = await httpClient.delete({ query: `like/${newsLikeId}`});
    commit('deleteFromNews', res);
  },
};

export default actions;
