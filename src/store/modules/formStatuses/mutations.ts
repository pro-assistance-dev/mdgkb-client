import { MutationTree } from 'vuex';

import FormStatus from '@/classes/FormStatus';
import FormStatusToFormStatus from '@/classes/FormStatusToFormStatus';
import IFormStatus from '@/interfaces/IFormStatus';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IFormStatus[]) {
    state.items = items.map((i: IFormStatus) => new FormStatus(i));
  },
  seedFormStatusToFormStatuses(state) {
    state.formStatusToFormStatuses = state.items.map((i: IFormStatus) => {
      const item = new FormStatusToFormStatus();
      item.childFormStatusId = i.id;
      item.childFormStatus = new FormStatus(i);
      return item;
    });
  },
  appendToAll(state, items: IFormStatus[]) {
    const itemsForAdding = items.map((i: IFormStatus) => new FormStatus(i));
    state.items.push(...itemsForAdding);
  },
  set(state, item: IFormStatus) {
    state.item = new FormStatus(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IFormStatus) => i.id === id);
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
