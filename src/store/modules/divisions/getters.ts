import { GetterTree } from 'vuex';

import Division from '@/classes/Division';
import IDivisionComment from '@/interfaces/IDivisionComment';
import ISchedule from '@/interfaces/timetables/ISchedule';
import ITimetable from '@/interfaces/timetables/ITimetable';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters(),
  timetable(state): ITimetable | undefined {
    if (state.item) return state.item.timetable;
  },
  schedule(state): ISchedule | undefined {
    if (state.item) return state.item.schedule;
  },
  comment(state): IDivisionComment {
    return state.comment;
  },
  comments(state): IDivisionComment[] {
    return state.item.divisionComments;
  },
  divisionById(state): (id: string) => Division | undefined {
    return (id: string): Division | undefined => state.items.find((item: Division) => item.id === id);
  },
  // visitingRules(state): IVisitingRule[] {
  //   return state.division.visitingRules;
  // },
  // getDrugById(state): (id: string) => IDrug | undefined {
  //   return (id: string): IDrug | undefined => state.drugs.find((item: IDrug) => item.id === id);
  // },
};

export default getters;
