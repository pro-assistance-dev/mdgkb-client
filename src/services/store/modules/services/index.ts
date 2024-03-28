import { Module } from 'vuex';

import Schedule from '@/classes/Schedule';
import RootState from '@/services/interfaces/types';
import Scheduler from '@/services/Scheduler';
import getBaseDefaultState from '@/services/services/store/baseModule/baseIndex';
import IBasicState from '@/services/services/store/baseModule/baseState';
import { TimelineSteps } from '@/services/Time';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export interface State extends IBasicState<Schedule> {
  draghoverTime: string;
  draghoverSchedule: Schedule | undefined;
  timelineStep: TimelineSteps;
  timelinePxHeight: number;
  scheduler: Scheduler;
}

export const state = (): State => {
  return {
    ...getBaseDefaultState(Schedule),
    scheduler: new Scheduler(),
    draghoverTime: '',
    draghoverSchedule: undefined,
    timelineStep: TimelineSteps.FiveMinutes,
    timelinePxHeight: 50,
  };
};

const namespaced = true;

export const services: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
