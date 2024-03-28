import { MutationTree } from 'vuex';

import Schedule from '@/classes/Schedule';
import getBaseMutations from '@/services/services/store/baseModule/baseMutations';
import { TimelineSteps } from '@/services/Time';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Schedule, State>(Schedule),
  setDraghoverTime(state, time: string) {
    state.draghoverTime = time;
  },
  setDraghoverSchedule(state, item: Schedule) {
    state.draghoverSchedule = item;
  },
  setTimelineStep(state, step: TimelineSteps) {
    state.timelineStep = step;
  },
};

export default mutations;
