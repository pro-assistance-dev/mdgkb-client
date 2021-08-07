import Doctor from '@/classes/doctors/Doctor';
import IDoctor from '@/interfaces/doctors/IDoctor';
import { MutationTree } from 'vuex';
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
    // const index = state.filteredDoctors.findIndex((i: IDoctor) => i.id === newDoctor.id);
    // state.filteredDoctors.splice(index, 1);
  },
  removeDoctorFromDivisionDoctors(state, id: string) {
    const index = state.divisionDoctors.findIndex((i: IDoctor) => i.id === id);
    state.divisionDoctors.splice(index, 1);
    // const doctor = state.doctors.find((i: IDoctor) => i.id === id);
    // if (doctor) state.filteredDoctors.push(doctor);
  },
  filterDoctors(state) {
    if (!state.divisionDoctors.length) {
      state.filteredDoctors = state.doctors;
      return;
    }
    state.filteredDoctors = state.doctors?.filter((i: IDoctor) => {
      return state.divisionDoctors.every((f: IDoctor) => {
        return f.id !== i.id;
      });
    });
  },
};

export default mutations;
