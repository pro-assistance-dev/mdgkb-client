import { MutationTree } from 'vuex';

import { State } from './state';
import Tag from '@/classes/news/Tag';
import ITag from '@/interfaces/news/ITag';

const mutations: MutationTree<State> = {
  setAll(state, items: ITag[]) {
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
};

export default mutations;
