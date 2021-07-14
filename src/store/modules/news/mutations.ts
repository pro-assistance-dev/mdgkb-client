import { MutationTree } from 'vuex';

import { State } from './state';
import INews from "../../../interfaces/news/INews";
import News from "@/classes/news/News";
import ITag from "@/interfaces/news/ITag";

const mutations: MutationTree<State> = {
  setAll(state, items: INews[]) {
    state.news = items.map((i: INews) => new News(i));
  },
  set(state, item: INews) {
    state.newsItem = new News(item);
  },
  filterByTag(state, tagId: string) {
    state.news = state.news.filter((i: INews) => {
      const index = i.tags.findIndex((t: ITag) => {
        return t.id === tagId
      })
      if (index > -1) {
        return i
      }
    })
    console.log(state.news)
  },
};

export default mutations;
