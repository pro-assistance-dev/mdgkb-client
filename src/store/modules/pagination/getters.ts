import { GetterTree } from 'vuex';

import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  curPage(state): number {
    return state.curPage;
  },
  count(state): number {
    return state.count;
  },
};

export default getters;
