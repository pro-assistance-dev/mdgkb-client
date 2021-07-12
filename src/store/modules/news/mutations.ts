import { MutationTree } from 'vuex';

import { State } from './state';
import INews from "../../../interfaces/news/INews";
import News from "@/classes/news/News";

const mutations: MutationTree<State> = {
  setAll(state, news: INews[]) {
    state.news = news.map((i: INews) => new News(i));
  },
};

export default mutations;
