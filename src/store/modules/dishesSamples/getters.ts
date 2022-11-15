import { GetterTree } from 'vuex';

import IDishSample from '@/interfaces/IDishSample';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IDishSample[] {
    return state.items;
  },
  item(state): IDishSample {
    return state.item;
  },
};

export default getters;
