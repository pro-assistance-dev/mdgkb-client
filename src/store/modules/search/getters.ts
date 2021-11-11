import { GetterTree } from 'vuex';

import RootState from '@/store/types';

import State from './state';

const getters: GetterTree<State, RootState> = {
  isSearchDrawerOpen(state): boolean {
    return state.isSearchDrawerOpen;
  },
};

export default getters;
