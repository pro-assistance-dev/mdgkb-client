import { MutationTree } from 'vuex';

import Weekday from '@/classes/Weekday';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAllWeekdays(state, items: Weekday[]) {
    if (!items) return;
    state.weekdays = items.map((i: Weekday) => new Weekday(i));
  },
};

export default mutations;
