import { GetterTree } from 'vuex';

import IDpoApplication from '@/interfaces/IDpoApplication';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IDpoApplication[] {
    return state.items;
  },
  item(state): IDpoApplication {
    return state.item;
  },
};

export default getters;
