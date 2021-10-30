import { GetterTree } from 'vuex';

import IDoctor from '@/interfaces/doctors/IDoctor';
import IDoctorComment from '@/interfaces/doctors/IDoctorComment';
import IEducation from '@/interfaces/education/IEducation';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IFIlesList from '@/interfaces/files/IFIlesList';
import IHuman from '@/interfaces/IHuman';
import ITimetable from '@/interfaces/timetables/ITimetable';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  doctors(state): IDoctor[] | undefined {
    const { doctors } = state;
    return doctors;
  },
  filteredDoctors(state): IDoctor[] | undefined {
    const { filteredDoctors } = state;
    return filteredDoctors;
  },
  doctor(state): IDoctor | undefined {
    const { doctor } = state;
    return doctor;
  },
  divisionDoctors(state): IDoctor[] | undefined {
    const { divisionDoctors } = state;
    return divisionDoctors;
  },
  fileInfo(state): IFileInfo {
    return state.doctor.fileInfo;
  },
  fileList(state): IFIlesList[] {
    return state.fileList;
  },
  comment(state): IDoctorComment {
    return state.comment;
  },
  comments(state): IDoctorComment[] {
    return state.doctor.doctorComments;
  },
  human(state): IHuman {
    return state.doctor.human;
  },
  educations(state): IEducation[] {
    return state.doctor.educations;
  },
  timetable(state): ITimetable {
    return state.doctor.timetable;
  },
};

export default getters;
