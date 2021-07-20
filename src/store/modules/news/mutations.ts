import { MutationTree } from 'vuex';

import { State } from './state';
import INews from '../../../interfaces/news/INews';
import News from '@/classes/news/News';
import ITag from '@/interfaces/news/ITag';

const mutations: MutationTree<State> = {
  setAll(state, items: INews[]) {
    state.news = items.map((i: INews) => new News(i));
  },
  appendToAll(state, items: INews[]) {
    const news = items.map((i: INews) => new News(i));
    state.news.push(...news);
  },
  set(state, item: INews) {
    state.newsItem = new News(item);
  },
  filterByTag(state, tagId: string) {
    state.news = state.news.filter((i: INews) => {
      if (!i.tags) return;
      const index = i.tags.findIndex((t: ITag) => {
        return t.id === tagId;
      });
      if (index > -1) {
        return i;
      }
    });
  },
};

export default mutations;
