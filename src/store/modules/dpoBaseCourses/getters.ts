import { GetterTree } from 'vuex';

import IDpoBaseCourse from '@/interfaces/IDpoBaseCourse';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IDpoBaseCourse[] {
    return state.items;
  },
  item(state): IDpoBaseCourse {
    return state.item;
  },
};

export default getters;
