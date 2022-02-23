import { GetterTree } from 'vuex';

import IDpoCourse from '@/interfaces/IDpoCourse';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IDpoCourse[] {
    return state.items;
  },
  item(state): IDpoCourse {
    return state.item;
  },
};

export default getters;
