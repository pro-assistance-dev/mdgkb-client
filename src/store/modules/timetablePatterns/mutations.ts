import { MutationTree } from 'vuex';

import Timetable from '@/classes/timetable/Timetable';
import ITimetable from '@/interfaces/timetables/ITimetable';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: ITimetable[]) {
    state.items = items?.map((a: ITimetable) => new Timetable(a));
  },
  set(state, item: ITimetable) {
    state.item = new Timetable(item);
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: ITimetable) => i.id === id);
    state.items.splice(index, 1);
  },
};

export default mutations;
