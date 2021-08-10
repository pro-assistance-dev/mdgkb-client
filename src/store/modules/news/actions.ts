import { ActionTree } from 'vuex';

import IFileInfo from '@/interfaces/files/IFileInfo';
import ICalendarMeta from '@/interfaces/news/ICalendarMeta';
import INews from '@/interfaces/news/INews';
import INewsComment from '@/interfaces/news/INewsComment';
import INewsImage from '@/interfaces/news/INewsImage';
import INewsLike from '@/interfaces/news/INewsLike';
import INewsParams from '@/interfaces/news/INewsParams';
import INewsToTag from '@/interfaces/news/INewsToTag';
import ITag from '@/interfaces/news/ITag';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('news');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, params?: INewsParams): Promise<void> => {
    let query = '';
    if (params && params.limit) {
      query = `?limit=${params.limit}`;
    }
    if (params && params.limit && params.publishedOn) {
      query = `?publishedOn=${params.publishedOn}&limit=${params.limit}`;
    }
    if (params && params.limit && params.publishedOn && params.filterTags?.length) {
      query = `?publishedOn=${params.publishedOn}&limit=${params.limit}&filterTags=${params.filterTags}`;
    }
    const res = await httpClient.get<{ data: INews[] }>({ query: query });
    if (res && params && !params.publishedOn) commit('setAll', res);
    if (res && params && params.publishedOn) commit('appendToAll', res);
  },
  get: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<INews>({ query: `${slug}` });
    commit('set', res);
  },
  getByMonth: async ({ commit }, params: ICalendarMeta): Promise<void> => {
    const query = `month/?month=${params.month}&year=${params.year}`;
    const res = await httpClient.get<{ data: INews[] }>({ query: query });
    commit('setCalendarNews', res);
    commit('updateCalendarMeta', params);
  },
  create: async ({ commit }, news: INews): Promise<void> => {
    const fileInfos: IFileInfo[] = [];
    news.newsImages.forEach((image: INewsImage) => {
      if (image.fileInfo) fileInfos.push(image.fileInfo);
    });
    fileInfos.push(news.fileInfo);
    fileInfos.push(news.mainImage);
    await httpClient.post<INews, INews>({ payload: news, fileInfos: fileInfos, isFormData: true });
    commit('set');
  },
  update: async ({ commit }, news: INews): Promise<void> => {
    const fileInfos: IFileInfo[] = [];
    news.newsImages.forEach((image: INewsImage) => {
      if (image.fileInfo) fileInfos.push(image.fileInfo);
    });
    fileInfos.push(news.fileInfo);
    fileInfos.push(news.mainImage);
    await httpClient.put<INews, INews>({
      query: `${news.id}`,
      payload: news,
      fileInfos: fileInfos,
      isFormData: true,
    });
    commit('set');
  },
  remove: async ({ commit }, newsId: string): Promise<void> => {
    await httpClient.delete({ query: `${newsId}` });
    commit('remove', newsId);
  },

  addTag: async (_, item: INewsToTag): Promise<void> => {
    await httpClient.post<INewsToTag, INewsToTag>({ query: `tag`, payload: item });
  },

  removeTag: async (_, item: INewsToTag): Promise<void> => {
    await httpClient.delete<INewsToTag, INewsToTag>({ query: `tag`, payload: item });
  },

  createLike: async ({ commit }, newsLike: INewsLike): Promise<void> => {
    const res = await httpClient.post<INewsLike, INewsLike>({ query: `like`, payload: newsLike });
    commit('setLikeNews', res);
  },
  removeComment: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `comment/${id}` });
    commit('removeComment', id);
  },
  createComment: async ({ commit }, comment: INewsComment): Promise<void> => {
    const res = await httpClient.post<INewsLike, INewsLike>({ query: `comment`, payload: comment });
    commit('setComment', res);
  },
  editComment: async ({ commit }, commentId: string): Promise<void> => {
    commit('editComment', commentId);
  },
  updateComment: async ({ commit }, comment: INewsComment): Promise<void> => {
    await httpClient.put({ query: `comment/${comment.id}`, payload: comment });
    commit('updateComment', comment.id);
  },
  deleteLike: async ({ commit }, newsLike: INewsLike): Promise<void> => {
    await httpClient.delete({ query: `like/${newsLike.id}` });
    commit('deleteLikeFromNews', newsLike);
  },
  deleteComment: async ({ commit }, comment: INewsComment): Promise<void> => {
    await httpClient.delete({ query: `comment/${comment.id}` });
    commit('deleteCommentFromNews', comment);
  },
  addFilterTag: async ({ commit }, tag: ITag): Promise<void> => {
    commit('addFilterTag', tag);
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
};

export default actions;
