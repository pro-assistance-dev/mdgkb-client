import { MutationTree } from 'vuex';

import { State } from './state';
import IWeekday from '@/interfaces/timetables/IWeekday';
import Weekday from '@/classes/timetable/Weekday';

const mutations: MutationTree<State> = {
  setAllWeekdays(state, items: IWeekday[]) {
    if (!items) return;
    state.weekdays = items.map((i: IWeekday) => new Weekday(i));
  },
};

export default mutations;
