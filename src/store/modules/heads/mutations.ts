import { MutationTree } from 'vuex';

import Head from '@/classes/Head';
import IHead from '@/interfaces/IHead';
import ITimetable from '@/interfaces/timetables/ITimetable';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IHead[]) {
    state.items = items?.map((a: IHead) => new Head(a));
  },
  set(state, item: IHead) {
    state.item = new Head(item);
  },
  setTimetable(state, timetable: ITimetable) {
    if (!state.item) {
      return;
    }
    state.item.timetable = timetable;
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

export default mutations;
