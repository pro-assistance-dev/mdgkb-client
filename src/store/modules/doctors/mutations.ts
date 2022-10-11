import { MutationTree } from 'vuex';

import Doctor from '@/classes/Doctor';
import DoctorComment from '@/classes/DoctorComment';
import Education from '@/classes/educations/Education';
import EducationAccreditation from '@/classes/educations/EducationAccreditation';
import EducationCertification from '@/classes/educations/EducationCertification';
import Regalia from '@/classes/Regalia';
import Timetable from '@/classes/timetable/Timetable';
import IDoctor from '@/interfaces/IDoctor';
import IDoctorComment from '@/interfaces/IDoctorComment';
import IDoctorsWithCount from '@/interfaces/IDoctorsWithCount';
import ITimetable from '@/interfaces/timetables/ITimetable';
import ITimetableDay from '@/interfaces/timetables/ITimetableDay';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAllAdmin(state, doctorsWithCount: IDoctorsWithCount) {
    state.items = doctorsWithCount.doctors.map((a: IDoctor) => new Doctor(a));
    state.count = doctorsWithCount.count;
  },
  appendToAll(state, items: IDoctor[]) {
    if (!items) {
      return;
    }
    const doctors = items.map((i: IDoctor) => new Doctor(i));
    state.items.push(...doctors);
  },
  setAll(state, items: IDoctor[]) {
    if (!items) {
      return;
    }
    state.items = items.map((a: IDoctor) => new Doctor(a));
  },
  set(state, doctor: IDoctor) {
    state.item = new Doctor(doctor);
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  setDivisionDoctors(state, doctors: IDoctor[]) {
    state.divisionDoctors = doctors?.map((a: IDoctor) => new Doctor(a));
  },
  // setDivisionDoctorsByDivisionId(state, divisionId: string) {
  //   state.divisionDoctors = state.items?.filter((a: IDoctor) => a.divisionId === divisionId);
  // },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IDoctor) => i.id === id);
    state.items.splice(index, 1);
  },
  addDoctorToDivisionDoctors(state, newDoctor: IDoctor) {
    state.divisionDoctors.push(newDoctor);
  },

  filterDoctors(state) {
    if (!state.divisionDoctors?.length) {
      state.filteredDoctors = state.items;
      return;
    }
    state.filteredDoctors = state.items?.filter((i: IDoctor) => {
      return state.divisionDoctors.every((f: IDoctor) => {
        return f.id !== i.id;
      });
    });
  },

  setComment(state, item: IDoctorComment) {
    if (state.item) state.item.doctorComments.unshift(item);
    state.comment = new DoctorComment();
  },
  removeComment(state, commentId: string) {
    if (state.item) {
      const index = state.item.doctorComments.findIndex((item: IDoctorComment) => item.id === commentId);
      state.item.doctorComments.splice(index, 1);
    }
  },
  editComment(state, commentId: string) {
    if (state.item) {
      state.item.doctorComments = state.item.doctorComments.map((item: IDoctorComment) => {
        if (item.comment.id === commentId) item.comment.isEditing = true;
        return item;
      });
    }
  },
  updateComment(state, commentId: string) {
    if (state.item) {
      state.item.doctorComments = state.item.doctorComments.map((item: IDoctorComment) => {
        if (item.comment.id === commentId) item.comment.isEditing = false;
        return item;
      });
    }
  },
  setParentIdToComment(state, parentId: string) {
    state.comment.doctorId = parentId;
  },
  addEducation(state) {
    state.item.educations.push(new Education());
  },
  removeEducation(state, educationIndex: number) {
    state.item.educations.splice(educationIndex, 1);
  },
  addCertification(state, educationIndex: number) {
    state.item.educations[educationIndex].educationCertification = new EducationCertification();
  },
  removeCertification(state, educationIndex: number) {
    state.item.educations[educationIndex].educationCertification = undefined;
  },
  addAccreditation(state, educationIndex: number) {
    state.item.educations[educationIndex].educationAccreditation = new EducationAccreditation();
  },
  removeAccreditation(state, educationIndex: number) {
    state.item.educations[educationIndex].educationAccreditation = undefined;
  },
  addRegalia(state) {
    state.item.regalias.push(new Regalia());
  },

  setTimetable(state, timetable: ITimetable) {
    if (!state.item) {
      return;
    }
    state.item.timetable = timetable;
  },
  removeTimetable(state) {
    if (!state.item) {
      return;
    }
    state.item.timetable.timetableDays.forEach((day: ITimetableDay) => {
      if (day.id) {
        state.item.timetableDaysForDelete.push(day.id);
      }
    });
    state.item.timetable = new Timetable();
  },
};

export default mutations;
