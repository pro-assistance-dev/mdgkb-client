import { GetterTree } from 'vuex';

import Schedule from '@/classes/Schedule';
import Session from '@/classes/Session';
import RootState from '@/services/interfaces/types';
import Scheduler from '@/services/Scheduler';
import getBaseGetters from '@/services/services/store/baseModule/baseGetters';
import { TimelineMinutes, TimelineSteps } from '@/services/Time';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Schedule, State>(),
  draghoverTime(state): string {
    return state.draghoverTime;
  },
  draghoverSchedule(state): Schedule | undefined {
    return state.draghoverSchedule;
  },
  timelineMinutes(state): string[] {
    return TimelineMinutes[state.timelineStep];
  },
  timelinePxHeight(state): number {
    return state.timelinePxHeight;
  },
  scheduler(state): Scheduler {
    return state.scheduler;
  },
};

export default getters;
