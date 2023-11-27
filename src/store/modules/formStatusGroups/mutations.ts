import { MutationTree } from 'vuex';

import FormStatusGroup from '@/classes/FormStatusGroup';
import IFormStatusGroupsWithCount from '@/interfaces/IFormStatusGroupsWithCount';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: FormStatusGroup[]) {
    state.items = items.map((i: FormStatusGroup) => new FormStatusGroup(i));
  },
  setAllWithCount(state, items: IFormStatusGroupsWithCount) {
    if (!items.formStatusGroups) {
      state.items = [];
      return;
    }
    state.items = items.formStatusGroups.map((i: FormStatusGroup) => new FormStatusGroup(i));
    state.count = items.count;
  },
  appendToAll(state, items: IFormStatusGroupsWithCount) {
    if (!items.formStatusGroups) {
      state.items = [];
      return;
    }
    const formStatusGroups = items.formStatusGroups.map((i: FormStatusGroup) => new FormStatusGroup(i));
    state.items.push(...formStatusGroups);
    state.count = items.count;
  },
  set(state, item: FormStatusGroup) {
    state.item = new FormStatusGroup(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: FormStatusGroup) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new FormStatusGroup();
  },
  setDialogTitle(state, title: string) {
    state.dialogTitle = title;
  },
  toggleDialog(state, value: boolean) {
    state.showDialog = value;
  },
};

export default mutations;
