import { MutationTree } from 'vuex';

import Division from '@/classes/buildings/Division';
import Timetable from '@/classes/timetable/Timetable';
import IDivision from '@/interfaces/buildings/IDivision';
import ITimetable from '@/interfaces/timetables/ITimetable';
import ITimetableDay from '@/interfaces/timetables/ITimetableDay';

import { State } from './state';

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
};

export default mutations;
