import { MutationTree } from 'vuex';

import NewsSlide from '@/classes/newsSlides/NewsSlide';
import NewsSlideButton from '@/classes/newsSlides/NewsSlideButton';
import INewsSlide from '@/interfaces/newsSlides/INewsSlide';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: INewsSlide[]) {
    state.items = items?.map((a: INewsSlide) => new NewsSlide(a));
  },
  set(state, item: INewsSlide) {
    state.item = new NewsSlide(item);
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: INewsSlide) => i.id === id);
    state.items.splice(index, 1);
  },
  addButton(state) {
    state.item.newsSlideButtons.push(new NewsSlideButton());
  },
  removeButton(state, index: number) {
    const id = state.item.newsSlideButtons[index].id;
    if (id) {
      state.item.newsSlideButtonsForDelete.push(id);
    }
    state.item.newsSlideButtons.splice(index, 1);
  },
};

export default mutations;
