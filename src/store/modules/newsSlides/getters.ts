import { GetterTree } from 'vuex';

import NewsSlide from '@/classes/NewsSlide';
import NewsSlideButton from '@/classes/NewsSlideButton';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<NewsSlide, State>(),
  itemButtons(state): NewsSlideButton[] {
    return state.item.newsSlideButtons;
  },
};

export default getters;
