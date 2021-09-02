import { Module } from 'vuex';

import News from '@/classes/news/News';
import NewsComment from '@/classes/news/NewsComment';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    news: [],
    filteredNews: [],
    filterTags: [],
    newsItem: new News(),
    allNewsLoaded: false,
    calendarNews: [new News()],
    calendarMeta: undefined,
    previewFileList: [],
    mainImageList: [],
    galleryList: [],
    curGalleryCropIndex: 0,
    comment: new NewsComment(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const news: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
