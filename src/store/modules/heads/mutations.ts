import { MutationTree } from 'vuex';

import Head from '@/classes/Head';
import Timetable from '@/classes/timetable/Timetable';
import IHead from '@/interfaces/IHead';
import ITimetable from '@/interfaces/timetables/ITimetable';
import ITimetableDay from '@/interfaces/timetables/ITimetableDay';

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
  removeTimetable(state) {
    if (!state.item) {
      return;
    }
    state.item.timetable.timetableDays.forEach((day: ITimetableDay) => {
      // if (day.id) {
      //   state.item.timetableDaysForDelete.push(day.id);
      // }
    });
    state.item.timetable = new Timetable();
  },
};

export default mutations;
