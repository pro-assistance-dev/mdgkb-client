import { MutationTree } from 'vuex';

import Form from '@/classes/Form';
import IForm from '@/interfaces/IForm';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IForm[]) {
    state.items = items.map((a: IForm) => new Form(a));
  },
  set(state, item: IForm) {
    state.item = new Form(item);
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
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
