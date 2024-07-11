import { MutationTree } from 'vuex';

import News from '@/classes/News';
import NewsToTag from '@/classes/NewsToTag';
import Tag from '@/classes/Tag';
import INewsWithCount from '@/interfaces/INewsWithCount';
import ICalendarMeta from '@/interfaces/news/ICalendarMeta';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { getDefaultState } from '.';
import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(News),
  setMain(state, items: INewsWithCount) {
    state.main = new News(items.items[0]);
  },
  setMainOrFill(state, items: INewsWithCount) {
    const main = new News(items.items[0]);
    if (!main.id) {
      state.main = state.items.filter((item: News) => item.id !== state.subMain1.id && item.id !== state.subMain2.id)[0];
    } else {
      state.main = main;
    }
  },
  setSubMain1(state, items: INewsWithCount) {
    state.subMain1 = new News(items.items[0]);
  },
  setSubMain2(state, items: INewsWithCount) {
    state.subMain2 = new News(items.items[0]);
  },
  setSubMain(state, items: INewsWithCount) {
    state.subMain1 = new News(items.items[0]);
    state.subMain2 = new News(items.items[1]);
  },
  setSubMainOrFill(state, items: INewsWithCount) {
    const subMain1 = new News(items.items[0]);
    if (!subMain1.id) {
      state.subMain1 = state.items.filter((item: News) => item.id !== state.main.id && item.id !== state.subMain2.id)[0];
    } else {
      state.subMain1 = subMain1;
    }

    const subMain2 = new News(items.items[1]);
    if (!subMain2.id) {
      state.subMain2 = state.items.filter((item: News) => item.id !== state.main.id && item.id !== state.subMain1.id)[0];
    } else {
      state.subMain2 = subMain2;
    }
  },
  clearNews(state) {
    state.items = [];
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  setCalendarNews(state, items: INewsWithCount) {
    if (!items) {
      return;
    }
    state.calendarNews = items.items.map((i: News) => new News(i));
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: News) => i.id === id);
    state.items.splice(index, 1);
  },
  removeFilterTag(state, id: string) {
    const index = state.filterTags.findIndex((i: Tag) => i.id === id);
    state.filterTags.splice(index, 1);
    state.items = [];
  },
  resetFilterTags(state) {
    state.filterTags = [];
    state.items = [];
  },
  setFilteredNews(state) {
    if (!state.filterTags.length) {
      return;
    }
    const filteredNews = state.items.filter((newsItem: News) => {
      return state.filterTags.every((tag) => {
        return newsItem.newsToTags.some((newsToTag: NewsToTag) => {
          return newsToTag.tagId === tag.id;
        });
      });
    });
    if (filteredNews.length) {
      state.items = filteredNews;
    }
    // state.params =
  },
  updateCalendarMeta(state, meta: ICalendarMeta) {
    state.calendarMeta = meta;
  },
  setEventMode(state, eventMode: boolean) {
    state.eventMode = eventMode;
    state.params.events = eventMode;
    state.items = [];
  },
  ...getBaseMutations,
};

export default mutations;
