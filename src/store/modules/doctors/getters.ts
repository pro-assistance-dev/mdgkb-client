import { GetterTree } from 'vuex';

import IEducation from '@/interfaces/education/IEducation';
import IFIlesList from '@/interfaces/files/IFIlesList';
import IDoctor from '@/interfaces/IDoctor';
import IDoctorComment from '@/interfaces/IDoctorComment';
import IHuman from '@/interfaces/IHuman';
import IWithPaidService from '@/interfaces/IWithPaidService';
import ITimetable from '@/interfaces/timetables/ITimetable';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IDoctor[] {
    return state.items;
  },
  item(state): IDoctor {
    return state.item;
  },
  count(state): number {
    return state.count;
  },
  filteredDoctors(state): IDoctor[] | undefined {
    const { filteredDoctors } = state;
    return filteredDoctors;
  },
  divisionDoctors(state): IDoctor[] | undefined {
    const { divisionDoctors } = state;
    return divisionDoctors;
  },

  fileList(state): IFIlesList[] {
    return state.fileList;
  },
  comment(state): IDoctorComment {
    return state.comment;
  },
  comments(state): IDoctorComment[] {
    return state.item.doctorComments;
  },
  human(state): IHuman {
    return state.item.human;
  },
  educations(state): IEducation[] {
    return state.item.educations;
  },
  paidServices(state): IWithPaidService[] {
    return state.item.doctorPaidServices?.splice(0, 15);
  },
  timetable(state): ITimetable {
    return state.item.timetable;
  },
};

export default getters;
