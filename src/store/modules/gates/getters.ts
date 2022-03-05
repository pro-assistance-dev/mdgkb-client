import { GetterTree } from 'vuex';

import IGate from '@/interfaces/IGate';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IGate[] {
    return state.items;
  },
  item(state): IGate {
    return state.item;
  },
};

export default getters;
