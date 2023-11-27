import { MutationTree } from 'vuex';

import Head from '@/classes/Head';
import Timetable from '@/classes/Timetable';
import TimetableDay from '@/classes/TimetableDay';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { getDefaultState } from '.';
import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Head, State>(Head),
  setTimetable(state, timetable: Timetable) {
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
    state.item.timetable.timetableDays.forEach((day: TimetableDay) => {
      // if (day.id) {
      //   state.item.timetableDaysForDelete.push(day.id);
      // }
    });
    state.item.timetable = new Timetable();
  },
};

export default mutations;
