import { ActionTree } from 'vuex';

import EventApplication from '@/classes/news/EventApplication';
import NewsComment from '@/classes/news/NewsComment';
import NewsLike from '@/classes/news/NewsLike';
import INewsWithCount from '@/interfaces/INewsWithCount';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import getBaseActions from '../../baseModule/baseActions';
import { State } from './index';

const httpClient = new HttpClient('news');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions(httpClient),
  getMain: async ({ commit }, fill?: boolean): Promise<void> => {
    const items = await httpClient.get<INewsWithCount[]>({ query: 'main' });
    if (fill) {
      commit('setMainOrFill', items);
    } else {
      commit('setMain', items);
    }
  },
  getSubMain: async ({ commit }, fill?: boolean): Promise<void> => {
    const items = await httpClient.get<INewsWithCount[]>({ query: 'submain' });
    if (fill) {
      commit('setSubMainOrFill', items);
    } else {
      commit('setSubMain', items);
    }
  },
  getByMonth: async ({ commit }, filterQuery?: FilterQuery): Promise<void> => {
    const items = await httpClient.get<INewsWithCount[]>({ query: filterQuery ? filterQuery.toUrl() : '' });
    commit('setCalendarNews', items);
  },
  createLike: async ({ commit }, newsLike: NewsLike): Promise<void> => {
    const res = await httpClient.post<NewsLike, NewsLike>({ query: `like`, payload: newsLike });
    commit('setLikeNews', res);
  },
  removeComment: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `comment/${id}` });
    commit('removeComment', id);
  },
  createComment: async ({ commit }, comment: NewsComment): Promise<void> => {
    const res = await httpClient.post<NewsComment, NewsComment>({ query: `comment`, payload: comment });
    commit('resetComment', res);
  },
  updateComment: async ({ commit }, newComment: NewsComment): Promise<void> => {
    await httpClient.put({ query: `comment/${newComment.id}`, payload: newComment });
    commit('updateComment', newComment.comment.id);
  },
  deleteComment: async ({ commit }, comment: NewsComment): Promise<void> => {
    await httpClient.delete({ query: `comment/${comment.id}` });
    commit('deleteCommentFromNews', comment);
  },
  deleteLike: async ({ commit }, newsLike: NewsLike): Promise<void> => {
    await httpClient.delete({ query: `like/${newsLike.id}` });
    commit('deleteLikeFromNews', newsLike);
  },
  addFilterTag: async ({ commit }): Promise<void> => {
    commit('setFilteredNews');
  },
  removeFilterTag: async ({ commit }, id: string): Promise<void> => {
    commit('removeFilterTag', id);
    commit('setFilteredNews');
  },
  resetFilterTags: async ({ commit }): Promise<void> => {
    commit('resetFilterTags');
    commit('setFilteredNews');
  },
  sendEventApplications: async (_, eventApplication: EventApplication): Promise<void> => {
    await httpClient.post<EventApplication, EventApplication>({ query: `event/application`, payload: eventApplication });
  },
};

export default actions;
