import { GetterTree } from 'vuex';

import IPostgraduateCourse from '@/interfaces/IPostgraduateCourse';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IPostgraduateCourse[] {
    return state.items;
  },
  item(state): IPostgraduateCourse {
    return state.item;
  },
  count(state): number {
    return state.count;
  },
};

export default getters;
