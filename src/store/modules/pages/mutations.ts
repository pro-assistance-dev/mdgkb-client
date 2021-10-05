import { MutationTree } from 'vuex';

import Page from '@/classes/page/Page';
import PageDocument from '@/classes/page/PageDocument';
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
  addDocument(state) {
    state.page.pageDocuments.push(new PageDocument());
  },
  remove(state, id: string) {
    const index = state.pages.findIndex((i: IPage) => i.id === id);
    state.pages.splice(index, 1);
  },
};

export default mutations;
