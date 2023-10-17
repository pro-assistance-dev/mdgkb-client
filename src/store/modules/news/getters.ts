import { GetterTree } from 'vuex';

import News from '@/classes/news/News';
import ICalendarMeta from '@/interfaces/news/ICalendarMeta';
import IEventApplication from '@/interfaces/news/IEventApplication';
import INews from '@/interfaces/news/INews';
import INewsComment from '@/interfaces/news/INewsComment';
import INewsToTag from '@/interfaces/news/INewsToTag';
import ITag from '@/interfaces/news/ITag';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  news(state): INews[] | undefined {
    return state.news;
  },
  // main(state): INews | undefined {
  //   return state.news.find((item: INews) => item.main);
  // },
  // subMain(state): INews[] {
  //   return state.news.filter((item: INews) => item.subMain);
  // },
  main(state): INews {
    return state.main;
  },
  subMain1(state): INews {
    return state.subMain1;
  },
  subMain2(state): INews {
    return state.subMain2;
  },
  recent(state): INews[] {
    return state.news.filter((item: INews) => !item.main && !item.subMain);
  },
  count(state): number {
    return state.count;
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
    if (state.newsItem) return state.newsItem.newsToTags.map((newsToTag: INewsToTag) => newsToTag.tag);
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
  mainPageRecentNewsList(state): INews[] {
    return state.news
      .filter((item: INews) => item.id !== state.main.id && item.id !== state.subMain1.id && item.id !== state.subMain2.id)
      .slice(0, 5);
  },
  calendarMeta(state): ICalendarMeta | undefined {
    return state.calendarMeta;
  },
  comment(state): INewsComment {
    return state.comment;
  },
  comments(state): INewsComment[] {
    return state.newsItem.newsComments;
  },
  eventApplication(state): IEventApplication {
    return state.eventApplication;
  },
};

export default getters;
