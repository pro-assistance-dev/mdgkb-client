import { GetterTree } from 'vuex';

import RootState from '@/store/types';

import { State } from './state';
import INews from '@/interfaces/news/INews';
import News from '@/classes/news/News';

const getters: GetterTree<State, RootState> = {
  news(state): INews[] | undefined {
    return state.news;
  },
  newsItem(state): INews | undefined {
    if (!state.newsItem) state.newsItem = new News();
    return state.newsItem;
  },
  getBySlug(state, slug): INews | undefined {
    return state.news.find((i: INews) => i.slug === slug);
  },
  allNewsLoaded(state): boolean {
    return state.allNewsLoaded;
  },
};

export default getters;
