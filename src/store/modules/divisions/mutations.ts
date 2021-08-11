import { MutationTree } from 'vuex';

import Division from '@/classes/buildings/Division';
import IDivision from '@/interfaces/buildings/IDivision';
import ITimetable from '@/interfaces/timetables/ITimetable';

import { State } from './state';
import Timetable from '@/classes/timetable/Timetable';
import ITimetableDay from '@/interfaces/timetables/ITimetableDay';
import ISchedule from '@/interfaces/timetables/ISchedule';
import Schedule from '@/classes/timetable/Schedule';
import IScheduleItem from '@/interfaces/timetables/IScheduleItem';

const mutations: MutationTree<State> = {
  setAll(state, divisions: IDivision[]) {
    state.divisions = divisions?.map((a: IDivision) => new Division(a));
  },
  set(state, division: IDivision) {
    state.division = new Division(division);
  },
  remove(state, id: string) {
    const index = state.divisions.findIndex((i: IDivision) => i.id === id);
    state.divisions.splice(index, 1);
  },
  setTimetable(state, timetable: ITimetable) {
    if (!state.division) return;
    state.division.timetable = timetable;
  },
  removeTimetable(state) {
    if (!state.division) return;
    state.division.timetable = new Timetable();
  },
  removeTimetableDay(state, i: number) {
    if (!state.division) return;
    const idForDelete = state.division.timetable.timetableDays[i].id;
    if (idForDelete) state.division.timetable.timetableDaysForDelete.push(idForDelete);
    state.division.timetable.timetableDays.splice(i, 1);
  },
  createCustomTimetableDay(state, item: ITimetableDay) {
    if (!state.division) return;
    state.division.timetable.timetableDays.push(item);
  },
  setSchedule(state, item: ISchedule) {
    if (!state.division) return;
    state.division.schedule = item;
  },
  removeSchedule(state) {
    if (!state.division) return;
    state.division.schedule = new Schedule();
  },
  removeScheduleItem(state, i: number) {
    if (!state.division) return;
    const idForDelete = state.division.schedule.scheduleItems[i].id;
    if (idForDelete) state.division.schedule.scheduleItemsForDelete.push(idForDelete);
    state.division.schedule.scheduleItems.splice(i, 1);
  },
  addScheduleItem(state, item: IScheduleItem) {
    if (!state.division) return;
    state.division.schedule.scheduleItems.push(item);
  },
};

export default mutations;
