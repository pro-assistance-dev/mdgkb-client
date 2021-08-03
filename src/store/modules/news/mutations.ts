import { MutationTree } from 'vuex';

import { State } from './state';
import INews from '@/interfaces/news/INews';
import News from '@/classes/news/News';
import ITag from '@/interfaces/news/ITag';
import INewsLike from '@/interfaces/news/INewsLike';
import INewsComment from '@/interfaces/news/INewsComment';
import NewsComment from '@/classes/news/NewsComment';

const mutations: MutationTree<State> = {
  setAll(state, items: INews[]) {
    state.news = items.map((i: INews) => new News(i));
  },
  appendToAll(state, items: INews[]) {
    if (items.length === 0) {
      state.allNewsLoaded = true;
      return;
    }
    const news = items.map((i: INews) => new News(i));
    state.news.push(...news);
  },
  set(state, item?: INews) {
    state.newsItem = new News(item);
  },
  remove(state, id: string) {
    const index = state.news.findIndex((i: INews) => i.id === id);
    state.news.splice(index, 1);
  },
  addFilterTag(state, tag: ITag) {
    if (!state.filterTags.some((i) => i.id === tag.id)) {
      state.filterTags.push(tag);
    }
  },
  removeFilterTag(state, id: string) {
    const index = state.filterTags.findIndex((i: ITag) => i.id === id);
    state.filterTags.splice(index, 1);
  },
  setFilteredNews(state) {
    if (state.filterTags.length) {
      state.filteredNews = state.news.filter((newsItem) => {
        return state.filterTags.every((tag) => {
          return newsItem.tags?.some((newsTag) => {
            return newsTag.id === tag.id;
          });
        });
      });
    } else {
      state.filteredNews = state.news;
    }
  },
  setLikeNews(state, newsLike: INewsLike) {
    const news = state.news.find((i: INews) => i.id === newsLike.newsId);
    if (news) news.newsLikes.push(newsLike);
    if (state.newsItem) state.newsItem.newsLikes.push(newsLike);
  },
  setComment(state, item: INewsComment) {
    if (state.newsItem) state.newsItem.newsComments.push(item);
  },
  removeComment(state, commentId: string) {
    if (state.newsItem) {
      const index = state.newsItem.newsComments.findIndex((item: NewsComment) => item.id === commentId);
      state.newsItem.newsComments.splice(index, 1);
    }
  },
  deleteLikeFromNews(state, newsLike: INewsLike) {
    const news = state.news.find((i: INews) => i.id === newsLike.newsId);
    const deleteLike = (news: INews) => {
      const index = news.newsLikes.findIndex((i: INewsLike) => i.id === newsLike.id);
      news.newsLikes.splice(index);
    };
    if (news) deleteLike(news);
    if (state.newsItem) deleteLike(state.newsItem);
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
