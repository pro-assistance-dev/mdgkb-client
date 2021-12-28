import { MutationTree } from 'vuex';

import PaidProgramsGroup from '@/classes/PaidProgramsGroup';
import IPaidProgramsGroup from '@/interfaces/IPaidProgramsGroupsForServer';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IPaidProgramsGroup[]) {
    state.items = items?.map((a: IPaidProgramsGroup) => new PaidProgramsGroup(a));
  },
  set(state, item: IPaidProgramsGroup) {
    state.item = new PaidProgramsGroup(item);
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  remove(state, id) {
    const index = state.items.findIndex((i: IPaidProgramsGroup) => i.id === id);
    state.items.splice(index, 1);
  },
};

export default mutations;
