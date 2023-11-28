import { MutationTree } from 'vuex';

import FormStatus from '@/classes/FormStatus';
import FormStatusToFormStatus from '@/classes/FormStatusToFormStatus';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: FormStatus[]) {
    state.items = items.map((i: FormStatus) => new FormStatus(i));
  },
  seedFormStatusToFormStatuses(state) {
    state.formStatusToFormStatuses = state.items.map((i: FormStatus) => {
      const item = new FormStatusToFormStatus();
      item.childFormStatusId = i.id;
      item.childFormStatus = new FormStatus(i);
      return item;
    });
  },
  appendToAll(state, items: FormStatus[]) {
    const itemsForAdding = items.map((i: FormStatus) => new FormStatus(i));
    state.items.push(...itemsForAdding);
  },
  set(state, item: FormStatus) {
    state.item = new FormStatus(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: FormStatus) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new FormStatus();
  },
  setGroupId(state, id: string) {
    state.item.formStatusGroupId = id;
  },
};

export default mutations;
