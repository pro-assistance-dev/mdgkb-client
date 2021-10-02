import { MutationTree } from 'vuex';

import Page from '@/classes/page/Page';
import IPage from '@/interfaces/page/IPage';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, pages: IPage[]) {
    state.pages = pages.map((i: IPage) => new Page(i));
  },
  set(state, page?: IPage) {
    state.page = new Page(page);
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

export default mutations;
