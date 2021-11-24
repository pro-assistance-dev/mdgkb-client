import { GetterTree } from 'vuex';

import INewsSlide from '@/interfaces/newsSlides/INewsSlide';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): INewsSlide[] {
    return state.items;
  },
  item(state): INewsSlide {
    return state.item;
  },
};

export default getters;
