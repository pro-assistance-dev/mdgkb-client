import { MutationTree } from 'vuex';

import Tag from '@/classes/news/Tag';
import ITag from '@/interfaces/news/ITag';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: ITag[]) {
    if (!items) return;
    state.items = items.map((i: ITag) => new Tag(i));
  },
  appendToAll(state, item: ITag) {
    state.items.push(item);
    state.item = new Tag();
  },
  set(state, item: ITag) {
    state.item = new Tag(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: ITag) => i.id === id);
    state.items.splice(index, 1);
  },
  setFilteredTagList(state, items: ITag[] = []) {
    if (!items.length) {
      state.filteredTagList = state.items;
      return;
    }
    state.filteredTagList = state.items.filter((el) => {
      return !items.find((element) => {
        return element.id === el.id;
      });
    });
  },
};

export default mutations;
