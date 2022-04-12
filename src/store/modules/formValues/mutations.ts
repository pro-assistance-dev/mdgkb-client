import { MutationTree } from 'vuex';

import Form from '@/classes/Form';
import IForm from '@/interfaces/IForm';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IForm[]) {
    state.items = items.map((i: IForm) => new Form(i));
  },
  appendToAll(state, items: IForm[]) {
    const itemsForAdding = items.map((i: IForm) => new Form(i));
    state.items.push(...itemsForAdding);
  },
  set(state, item: IForm) {
    state.item = new Form(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IForm) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new Form();
  },
};

export default mutations;
