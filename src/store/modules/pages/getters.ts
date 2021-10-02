import { GetterTree } from 'vuex';

import IPage from '@/interfaces/page/IPage';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  pages(state): IPage[] {
    return state.pages;
  },
  page(state): IPage {
    return state.page;
  },
};

export default getters;
