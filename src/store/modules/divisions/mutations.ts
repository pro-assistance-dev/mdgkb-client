import { MutationTree } from 'vuex';

import Division from '@/classes/buildings/Division';
import IDivision from '@/interfaces/buildings/IDivision';

import { State } from './state';
import ITimetable from '@/interfaces/timetables/ITimetable';

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
    console.log(timetable);
    state.division.timetable = timetable;
  },
};

export default mutations;
