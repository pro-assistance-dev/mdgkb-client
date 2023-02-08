import { MutationTree } from 'vuex';

import News from '@/classes/news/News';
import NewsComment from '@/classes/news/NewsComment';
import NewsToTag from '@/classes/news/NewsToTag';
import INewsWithCount from '@/interfaces/INewsWithCount';
import ICalendarMeta from '@/interfaces/news/ICalendarMeta';
import INews from '@/interfaces/news/INews';
import INewsComment from '@/interfaces/news/INewsComment';
import INewsImage from '@/interfaces/news/INewsImage';
import INewsLike from '@/interfaces/news/INewsLike';
import INewsToTag from '@/interfaces/news/INewsToTag';
import ITag from '@/interfaces/news/ITag';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: INewsWithCount) {
    state.allNewsLoaded = false;
    state.count = items.count;
    state.news = items.news.map((i: INews) => new News(i));
    if (items.news.length === 0 || (state.params.limit && state.params.limit > items.news.length)) {
      state.allNewsLoaded = true;
      return;
    }
  },
  appendToAll(state, items: INewsWithCount) {
    const itemsForAdding = items.news.map((i: INews) => new News(i));
    state.news.push(...itemsForAdding);
    state.count = items.count;
  },
  clearNews(state) {
    state.news = [];
  },
  count(state): number {
    return state.count;
  },
  set(state, item?: INews) {
    state.newsItem = new News(item);
    state.news = [];
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  setCalendarNews(state, items: INewsWithCount) {
    if (!items) {
      return;
    }
    state.calendarNews = items.news.map((i: INews) => new News(i));
  },
  remove(state, id: string) {
    const index = state.news.findIndex((i: INews) => i.id === id);
    state.news.splice(index, 1);
  },
  addFilterTag(state, tag: ITag) {
    if (!state.filterTags.some((i) => i.id === tag.id)) {
      state.filterTags.push(tag);
    }
    state.news = [];
  },
  removeFilterTag(state, id: string) {
    const index = state.filterTags.findIndex((i: ITag) => i.id === id);
    state.filterTags.splice(index, 1);
    state.news = [];
  },
  resetFilterTags(state) {
    state.filterTags = [];
    state.news = [];
  },
  setFilteredNews(state) {
    if (!state.filterTags.length) {
      return;
    }
    const filteredNews = state.news.filter((newsItem: INews) => {
      return state.filterTags.every((tag) => {
        return newsItem.newsToTags.some((newsToTag: INewsToTag) => {
          return newsToTag.tagId === tag.id;
        });
      });
    });
    if (filteredNews.length) {
      state.news = filteredNews;
    }
    // state.params =
  },
  chooseTag(state, tag: ITag) {
    if (!state.newsItem || !state.newsItem.newsToTags) {
      return;
    }
    const index = state.newsItem.newsToTags.findIndex((t: INewsToTag) => tag.id === t.tagId);
    if (index === -1) {
      const newsToTag = new NewsToTag();
      if (state.newsItem.id) {
        newsToTag.newsId = state.newsItem.id;
      }
      newsToTag.tagId = tag.id;
      state.newsItem.newsToTags.push(newsToTag);
      newsToTag.tag = tag;
      return;
    }
    state.newsItem.newsToTags.splice(index, 1);
  },
  setLikeNews(state, newsLike: INewsLike) {
    const news = state.news.find((i: INews) => i.id === newsLike.newsId);
    if (news) news.newsLikes.push(newsLike);
    if (state.newsItem) state.newsItem.newsLikes.push(newsLike);
  },
  setComment(state, item: INewsComment) {
    if (state.newsItem) state.newsItem.newsComments.unshift(item);
    state.comment = new NewsComment();
  },
  removeComment(state, commentId: string) {
    if (state.newsItem) {
      const index = state.newsItem.newsComments.findIndex((item: INewsComment) => item.id === commentId);
      state.newsItem.newsComments.splice(index, 1);
    }
  },
  editComment(state, commentId: string) {
    if (state.newsItem) {
      state.newsItem.newsComments = state.newsItem.newsComments.map((item: INewsComment) => {
        if (item.comment.id === commentId) item.comment.isEditing = true;
        return item;
      });
    }
  },
  updateComment(state, commentId: string) {
    if (state.newsItem) {
      state.newsItem.newsComments = state.newsItem.newsComments.map((item: INewsComment) => {
        if (item.comment.id === commentId) item.comment.isEditing = false;
        return item;
      });
    }
  },
  setParentIdToComment(state, parentId: string) {
    state.comment.newsId = parentId;
  },
  deleteLikeFromNews(state, newsLike: INewsLike) {
    const news = state.news.find((i: INews) => i.id === newsLike.newsId);
    const deleteLike = (news: INews) => {
      const index = news.newsLikes.findIndex((i: INewsLike) => i.id === newsLike.id);
      if (index > -1) {
        news.newsLikes.splice(index, 1);
      }
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
  updateCalendarMeta(state, meta: ICalendarMeta) {
    state.calendarMeta = meta;
  },
  setEventMode(state, eventMode: boolean) {
    state.eventMode = eventMode;
    state.params.events = eventMode;
    state.news = [];
  },
  updateGalleryImageDescription(state, file: INewsImage) {
    state.newsItem.newsImages.map((item: INewsImage) => {
      if (item.id === file.id) {
        item.description = file.description;
      }
      return item;
    });
  },
  resetComment(state, item: INewsComment) {
    state.comment = new NewsComment();
  },
};

export default mutations;
