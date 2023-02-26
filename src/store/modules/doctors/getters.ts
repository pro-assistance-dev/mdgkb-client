import { GetterTree } from 'vuex';

import Doctor from '@/classes/Doctor';
import DoctorComment from '@/classes/DoctorComment';
import Education from '@/classes/educations/Education';
import IFIlesList from '@/interfaces/files/IFIlesList';
import IHuman from '@/interfaces/IHuman';
import IWithPaidService from '@/interfaces/IWithPaidService';
import ITimetable from '@/interfaces/timetables/ITimetable';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters(),
  comment(state): DoctorComment {
    return state.comment;
  },
  timetable(state): ITimetable {
    return state.item.timetable;
  },
};

export default getters;
