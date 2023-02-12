import { MutationTree } from 'vuex';

import Form from '@/classes/Form';
import FormStatus from '@/classes/FormStatus';
import IForm from '@/interfaces/IForm';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: Form[]) {
    state.items = items.map((a: Form) => new Form(a));
  },
  set(state, item: Form) {
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
  resetDefaultFormStatus(state) {
    state.item.defaultFormStatus = new FormStatus();
  },
};

export default mutations;
