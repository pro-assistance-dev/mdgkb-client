import { Module } from 'vuex';

import EventApplication from '@/classes/news/EventApplication';
import News from '@/classes/news/News';
import NewsComment from '@/classes/news/NewsComment';
import NewsParams from '@/classes/NewsParams';
import ICalendarMeta from '@/interfaces/news/ICalendarMeta';
import IEventApplication from '@/interfaces/news/IEventApplication';
import ITag from '@/interfaces/news/ITag';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import getBaseDefaultState from '../../baseModule/baseIndex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export interface State extends IBasicState<News> {
  main: News;
  subMain1: News;
  subMain2: News;
  filteredNews: News[];
  filterTags: ITag[];
  allNewsLoaded: boolean;
  calendarNews: News[];
  calendarMeta?: ICalendarMeta;
  comment: NewsComment;
  eventMode: boolean;
  eventApplication: IEventApplication;
  params: NewsParams;
  count: number;
}

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(News),
    main: new News(),
    subMain1: new News(),
    subMain2: new News(),
    filteredNews: [],
    filterTags: [],
    allNewsLoaded: false,
    calendarNews: [new News()],
    calendarMeta: undefined,
    comment: new NewsComment(),
    eventMode: false,
    eventApplication: new EventApplication(),
    params: new NewsParams(),
    count: 0,
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
