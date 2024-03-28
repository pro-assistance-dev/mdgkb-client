import { MutationTree } from 'vuex';

import NewsSlide from '@/classes/NewsSlide';
import NewsSlideButton from '@/classes/NewsSlideButton';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './state';

const mutations: MutationTree<State> = {
  ...getBaseMutations<NewsSlide, State>(NewsSlide),
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
  setOrder(state, order: number) {
    state.item.order = order;
  },
};

export default mutations;
