import { GetterTree } from 'vuex';

import IDivision from '@/interfaces/buildings/IDivision';
import IDivisionComment from '@/interfaces/buildings/IDivisionComment';
import IFilesList from '@/interfaces/files/IFIlesList';
import ISchedule from '@/interfaces/timetables/ISchedule';
import ITimetable from '@/interfaces/timetables/ITimetable';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  divisions(state): IDivision[] | undefined {
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
  сomments(state): IDivisionComment[] {
    return state.division.divisionComments;
  },
};

export default getters;
