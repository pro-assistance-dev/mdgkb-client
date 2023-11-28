import { MutationTree } from 'vuex';

import Tag from '@/classes/Tag';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: Tag[]) {
    if (!items) return;
    state.items = items.map((i: Tag) => new Tag(i));
  },
  appendToAll(state, item: Tag) {
    state.items.push(item);
    state.item = new Tag();
  },
  set(state, item: Tag) {
    state.item = new Tag(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: Tag) => i.id === id);
    state.items.splice(index, 1);
  },
  setFilteredTagList(state, items: Tag[] = []) {
    if (!items.length) {
      state.filteredTagList = state.items;
      return;
    }
    // state.filteredTagList.forEach((tag: Tag) => {
    //   tag.selected =
    // })
    state.filteredTagList = state.items.filter((el) => {
      return !items.find((element) => {
        return element.id === el.id;
      });
    });
  },
};

export default mutations;
