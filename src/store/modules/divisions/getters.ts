import { GetterTree } from 'vuex';

import IDivision from '@/interfaces/buildings/IDivision';
import IDivisionComment from '@/interfaces/buildings/IDivisionComment';
import IFilesList from '@/interfaces/files/IFIlesList';
import IVisitingRule from '@/interfaces/IVisitingRule';
import ISchedule from '@/interfaces/timetables/ISchedule';
import ITimetable from '@/interfaces/timetables/ITimetable';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  divisions(state, rootState): IDivision[] | undefined {
    const { divisions } = state;
    return divisions;
  },
  division(state): IDivision | undefined {
    const { division } = state;
    return division;
  },
  timetable(state): ITimetable | undefined {
    if (state.division) return state.division.timetable;
  },
  schedule(state): ISchedule | undefined {
    if (state.division) return state.division.schedule;
  },
  galleryList(state): IFilesList[] {
    return state.galleryList;
  },
  comment(state): IDivisionComment {
    return state.comment;
  },
  comments(state): IDivisionComment[] {
    return state.division.divisionComments;
  },
  divisionById(state): (id: string) => IDivision | undefined {
    return (id: string): IDivision | undefined => state.divisions.find((item: IDivision) => item.id === id);
  },
  visitingRules(state): IVisitingRule[] {
    return state.division.visitingRules;
  },
  // getDrugById(state): (id: string) => IDrug | undefined {
  //   return (id: string): IDrug | undefined => state.drugs.find((item: IDrug) => item.id === id);
  // },
};

export default getters;
