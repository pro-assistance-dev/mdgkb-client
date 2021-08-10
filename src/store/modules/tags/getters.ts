import { GetterTree } from 'vuex';

import Tag from '@/classes/news/Tag';
import ITag from '@/interfaces/news/ITag';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): ITag[] | undefined {
    return state.items;
  },
  item(state): ITag | undefined {
    if (!state.item) state.item = new Tag();
    return state.item;
  },
  filteredTagList(state): ITag[] | undefined {
    return state.filteredTagList;
  },
};

export default getters;
