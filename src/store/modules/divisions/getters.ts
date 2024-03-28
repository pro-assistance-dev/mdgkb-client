import { GetterTree } from 'vuex';

import Division from '@/classes/Division';
import DivisionComment from '@/classes/DivisionComment';
import Schedule from '@/classes/Schedule';
import Timetable from '@/classes/Timetable';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters(),
  timetable(state): Timetable | undefined {
    if (state.item) return state.item.timetable;
  },
  schedule(state): Schedule | undefined {
    if (state.item) return state.item.schedule;
  },
  comment(state): DivisionComment {
    return state.comment;
  },
  comments(state): DivisionComment[] {
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
