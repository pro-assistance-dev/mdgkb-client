import { MutationTree } from 'vuex';

import Doctor from '@/classes/doctors/Doctor';
import IDoctor from '@/interfaces/doctors/IDoctor';
import IFileInfo from '@/interfaces/files/IFileInfo';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, doctors: IDoctor[]) {
    state.doctors = doctors?.map((a: IDoctor) => new Doctor(a));
  },
  set(state, doctor: IDoctor) {
    state.doctor = new Doctor(doctor);
  },
  setDivisionDoctors(state, doctors: IDoctor[]) {
    state.divisionDoctors = doctors?.map((a: IDoctor) => new Doctor(a));
  },
  setDivisionDoctorsByDivisionId(state, divisionId: string) {
    state.divisionDoctors = state.doctors?.filter((a: IDoctor) => a.divisionId === divisionId);
  },
  remove(state, id: string) {
    const index = state.doctors.findIndex((i: IDoctor) => i.id === id);
    state.doctors.splice(index, 1);
  },
  addDoctorToDivisionDoctors(state, newDoctor: IDoctor) {
    state.divisionDoctors.push(newDoctor);
  },
  removeDoctorFromDivisionDoctors(state, id: string) {
    const index = state.divisionDoctors.findIndex((i: IDoctor) => i.id === id);
    state.divisionDoctors.splice(index, 1);
  },
  filterDoctors(state) {
    if (!state.divisionDoctors?.length) {
      state.filteredDoctors = state.doctors;
      return;
    }
    state.filteredDoctors = state.doctors?.filter((i: IDoctor) => {
      return state.divisionDoctors.every((f: IDoctor) => {
        return f.id !== i.id;
      });
    });
  },
  setFileInfo(state, fileInfo: IFileInfo) {
    if (state.doctor) {
      state.doctor.fileInfo = fileInfo;
    }
  },
};

export default mutations;
