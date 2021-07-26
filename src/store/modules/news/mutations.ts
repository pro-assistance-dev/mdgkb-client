import { MutationTree } from 'vuex';

import { State } from './state';
import INews from '../../../interfaces/news/INews';
import News from '@/classes/news/News';
import ITag from '@/interfaces/news/ITag';
import INewsLike from '@/interfaces/news/INewsLike';
import INewsComment from '@/interfaces/news/INewsComment';

const mutations: MutationTree<State> = {
  setAll(state, items: INews[]) {
    state.news = items.map((i: INews) => new News(i));
  },
  appendToAll(state, items: INews[]) {
    const news = items.map((i: INews) => new News(i));
    state.news.push(...news);
  },
  set(state, item: INews) {
    state.newsItem = new News(item);
  },
  remove(state, id: string) {
    const index = state.news.findIndex((i: INews) => i.id === id);
    state.news.splice(index);
  },
  filterByTag(state, tagId: string) {
    state.news = state.news.filter((i: INews) => {
      if (!i.tags) return;
      const index = i.tags.findIndex((t: ITag) => {
        return t.id === tagId;
      });
      if (index > -1) {
        return i;
      }
    });
  },
  setLikeNews(state, newsLike: INewsLike) {
    const news = state.news.find((i: INews) => i.id === newsLike.newsId);
    if (news) news.newsLikes.push(newsLike);
  },
  setComment(state, item: INewsComment) {
    const news = state.news.find((i: INews) => i.id === item.newsId);
    if (news) news.newsComments.push(item);
  },
  deleteLikeFromNews(state, newsLike: INewsLike) {
    const news = state.news.find((i: INews) => i.id === newsLike.newsId);
    if (news) {
      const index = news.newsLikes.findIndex((i: INewsLike) => i.id === newsLike.id);
      news.newsLikes.splice(index);
    }
  },
  deleteCommentFromNews(state, item: INewsComment) {
    const news = state.news.find((i: INews) => i.id === item.newsId);
    if (news) {
      const index = news.newsComments.findIndex((i: INewsComment) => i.id === item.id);
      news.newsLikes.splice(index);
    }
  },
};

export default mutations;
