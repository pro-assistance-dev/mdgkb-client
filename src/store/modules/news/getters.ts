import { GetterTree } from 'vuex';

import EventApplication from '@/classes/EventApplication';
import News from '@/classes/News';
import NewsComment from '@/classes/NewsComment';
import NewsToTag from '@/classes/NewsToTag';
import Tag from '@/classes/Tag';
import ICalendarMeta from '@/interfaces/news/ICalendarMeta';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters(),
  // main(state): News | undefined {
  //   return state.items.find((item: News) => item.main);
  // },
  // subMain(state): News[] {
  //   return state.items.filter((item: News) => item.subMain);
  // },
  main(state): News {
    return state.main;
  },
  subMain1(state): News {
    return state.subMain1;
  },
  subMain2(state): News {
    return state.subMain2;
  },
  recent(state): News[] {
    return state.items.filter((item: News) => !item.main && !item.subMain);
  },
  count(state): number {
    return state.count;
  },
  filteredNews(state): News[] | undefined {
    return state.filteredNews;
  },
  newsItem(state): News | undefined {
    if (!state.item) state.item = new News();
    return state.item;
  },
  getBySlug(state, slug): News | undefined {
    return state.items.find((i: News) => i.slug === slug);
  },
  findTags(state): Tag[] | undefined {
    if (state.item) return state.item.newsToTags.map((newsToTag: NewsToTag) => newsToTag.tag);
  },
  allNewsLoaded(state): boolean {
    return state.allNewsLoaded;
  },
  filterTags(state): Tag[] {
    return state.filterTags;
  },
  calendarNews(state): News[] {
    return state.calendarNews;
  },
  mainPageRecentNewsList(state): News[] {
    return state.items
      .filter((item: News) => item.id !== state.main.id && item.id !== state.subMain1.id && item.id !== state.subMain2.id)
      .slice(0, 5);
  },
  calendarMeta(state): ICalendarMeta | undefined {
    return state.calendarMeta;
  },
  comment(state): NewsComment {
    return state.comment;
  },
  comments(state): NewsComment[] {
    return state.item.newsComments;
  },
  eventApplication(state): EventApplication {
    return state.eventApplication;
  },
};

export default getters;
