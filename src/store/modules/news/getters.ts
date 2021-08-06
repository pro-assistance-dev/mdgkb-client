import { GetterTree } from 'vuex';

import RootState from '@/store/types';

import { State } from './state';
import INews from '@/interfaces/news/INews';
import News from '@/classes/news/News';
import ITag from '@/interfaces/news/ITag';
import ICalendarMeta from '@/interfaces/news/ICalendarMeta';

const getters: GetterTree<State, RootState> = {
  news(state): INews[] | undefined {
    return state.news;
  },
  filteredNews(state): INews[] | undefined {
    return state.filteredNews;
  },
  newsItem(state): INews | undefined {
    if (!state.newsItem) state.newsItem = new News();
    return state.newsItem;
  },
  getBySlug(state, slug): INews | undefined {
    return state.news.find((i: INews) => i.slug === slug);
  },
  findTags(state): ITag[] | undefined {
    if (state.newsItem) return state.newsItem.tags;
  },
  allNewsLoaded(state): boolean {
    return state.allNewsLoaded;
  },
  filterTags(state): ITag[] {
    return state.filterTags;
  },
  calendarNews(state): INews[] {
    return state.calendarNews;
  },
  calendarMeta(state): ICalendarMeta | undefined {
    return state.calendarMeta;
  },
};

export default getters;
