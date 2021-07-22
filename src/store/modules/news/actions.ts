import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';
import INews from '@/interfaces/news/INews';
import INewsLike from '@/interfaces/news/INewsLike';
import INewsComment from '@/interfaces/news/INewsComment';

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
  createComment: async ({ commit }, comment: INewsComment): Promise<void> => {
    const res = await httpClient.post<INewsLike, INewsLike>({ query: `comment`, payload: comment });
    commit('setComment', res);
  },
  deleteLike: async ({ commit }, newsLike: INewsLike): Promise<void> => {
    console.log(newsLike.id);
    const res = await httpClient.delete({ query: `like/${newsLike.id}` });
    commit('deleteLikeFromNews', newsLike);
  },
  deleteComment: async ({ commit }, comment: INewsComment): Promise<void> => {
    const res = await httpClient.delete({ query: `comment/${comment.id}` });
    commit('deleteCommentFromNews', comment);
  },
};

export default actions;
