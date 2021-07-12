import { GetterTree } from 'vuex';

import RootState from '@/store/types';

import { State } from './state';
import INews from "@/interfaces/news/INews";

const getters: GetterTree<State, RootState> = {
  news(state): INews[] | undefined {
    console.log(state.news)
    return state.news;
  },
};

export default getters;
