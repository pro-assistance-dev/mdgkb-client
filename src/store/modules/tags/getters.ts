import { GetterTree } from 'vuex';

import Tag from '@/classes/Tag';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): Tag[] | undefined {
    return state.items;
  },
  item(state): Tag | undefined {
    if (!state.item) state.item = new Tag();
    return state.item;
  },
  filteredTagList(state): Tag[] | undefined {
    return state.filteredTagList;
  },
};

export default getters;
