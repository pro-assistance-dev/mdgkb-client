import { GetterTree } from 'vuex';

import RootState from '@/store/types';

import { State } from './state';
import INews from '@/interfaces/news/INews';

const getters: GetterTree<State, RootState> = {
  news(state): INews[] | undefined {
    return state.news;
  },
  newsItem(state): INews | undefined {
    return state.newsItem;
  },
  getBySlug(state, slug): INews | undefined {
    return state.news.find((i: INews) => i.slug === slug);
  },
};

export default getters;
