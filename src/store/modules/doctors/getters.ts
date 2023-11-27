import { GetterTree } from 'vuex';

import DoctorComment from '@/classes/DoctorComment';
import Timetable from '@/classes/Timetable';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters(),
  comment(state): DoctorComment {
    return state.comment;
  },
  comments(state): DoctorComment[] {
    return state.item.doctorComments;
  },
  timetable(state): Timetable {
    return state.item.timetable;
  },
};

export default getters;
