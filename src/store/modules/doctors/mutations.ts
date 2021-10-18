import { MutationTree } from 'vuex';

import Doctor from '@/classes/doctors/Doctor';
import DoctorComment from '@/classes/doctors/DoctorComment';
import DoctorRegalia from '@/classes/doctors/DoctorRegalia';
import Education from '@/classes/educations/Education';
import EducationAccreditation from '@/classes/educations/EducationAccreditation';
import EducationCertification from '@/classes/educations/EducationCertification';
import FileInfo from '@/classes/File/FileInfo';
import Timetable from '@/classes/timetable/Timetable';
import IDoctor from '@/interfaces/doctors/IDoctor';
import IDoctorComment from '@/interfaces/doctors/IDoctorComment';
import IFile from '@/interfaces/files/IFile';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ITimetable from '@/interfaces/timetables/ITimetable';
import ITimetableDay from '@/interfaces/timetables/ITimetableDay';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, doctors: IDoctor[]) {
    state.doctors = doctors?.map((a: IDoctor) => new Doctor(a));
  },
  set(state, doctor: IDoctor) {
    state.doctor = new Doctor(doctor);
    if (state.doctor.fileInfo.fileSystemPath) state.fileList[0] = state.doctor.fileInfo.getFileListObject();
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
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
  saveFromCropper(state, file: IFile) {
    state.doctor.fileInfo.file = file.blob;
    state.doctor.fileInfo.category = 'previewFile';
    state.fileList = [];
    if (state.doctor.fileInfo.fileSystemPath) state.fileList.push({ name: state.doctor.fileInfo.fileSystemPath, url: file.src });
  },
  removeFileInfo(state) {
    state.doctor.fileInfo = new FileInfo();
  },
  setComment(state, item: IDoctorComment) {
    if (state.doctor) state.doctor.doctorComments.push(item);
    state.comment = new DoctorComment();
  },
  removeComment(state, commentId: string) {
    if (state.doctor) {
      const index = state.doctor.doctorComments.findIndex((item: IDoctorComment) => item.id === commentId);
      state.doctor.doctorComments.splice(index, 1);
    }
  },
  editComment(state, commentId: string) {
    if (state.doctor) {
      state.doctor.doctorComments = state.doctor.doctorComments.map((item: IDoctorComment) => {
        if (item.comment.id === commentId) item.comment.isEditing = true;
        return item;
      });
    }
  },
  updateComment(state, commentId: string) {
    if (state.doctor) {
      state.doctor.doctorComments = state.doctor.doctorComments.map((item: IDoctorComment) => {
        if (item.comment.id === commentId) item.comment.isEditing = false;
        return item;
      });
    }
  },
  setParentIdToComment(state, parentId: string) {
    state.comment.doctorId = parentId;
  },
  addEducation(state) {
    state.doctor.educations.push(new Education());
  },
  removeEducation(state, educationIndex: number) {
    state.doctor.educations.splice(educationIndex, 1);
  },
  addCertification(state, educationIndex: number) {
    state.doctor.educations[educationIndex].educationCertification = new EducationCertification();
  },
  removeCertification(state, educationIndex: number) {
    state.doctor.educations[educationIndex].educationCertification = undefined;
  },
  addAccreditation(state, educationIndex: number) {
    state.doctor.educations[educationIndex].educationAccreditation = new EducationAccreditation();
  },
  removeAccreditation(state, educationIndex: number) {
    state.doctor.educations[educationIndex].educationAccreditation = undefined;
  },
  addRegalia(state) {
    state.doctor.doctorRegalias.push(new DoctorRegalia());
  },

  setTimetable(state, timetable: ITimetable) {
    if (!state.doctor) return;
    state.doctor.timetable = timetable;
  },
  removeTimetable(state) {
    if (!state.doctor) return;
    state.doctor.timetable = new Timetable();
  },
  removeTimetableDay(state, i: number) {
    if (!state.doctor) return;
    const idForDelete = state.doctor.timetable.timetableDays[i].id;
    if (idForDelete) state.doctor.timetable.timetableDaysForDelete.push(idForDelete);
    state.doctor.timetable.timetableDays.splice(i, 1);
  },
  createCustomTimetableDay(state, item: ITimetableDay) {
    if (!state.doctor) return;
    state.doctor.timetable.timetableDays.push(item);
  },
};

export default mutations;
