import { MutationTree } from 'vuex';

import Weekday from '@/classes/timetable/Weekday';
import IWeekday from '@/interfaces/timetables/IWeekday';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAllWeekdays(state, items: IWeekday[]) {
    if (!items) return;
    state.weekdays = items.map((i: IWeekday) => new Weekday(i));
  },
};

export default mutations;
