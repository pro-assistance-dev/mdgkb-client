import { MutationTree } from 'vuex';

import Division from '@/classes/buildings/Division';
import DivisionImage from '@/classes/buildings/DIvisionImage';
import FileInfo from '@/classes/File/FileInfo';
import Schedule from '@/classes/timetable/Schedule';
import Timetable from '@/classes/timetable/Timetable';
import IDivision from '@/interfaces/buildings/IDivision';
import IDivisionImage from '@/interfaces/buildings/IDivisionImage';
import IFile from '@/interfaces/files/IFile';
import ISchedule from '@/interfaces/timetables/ISchedule';
import IScheduleItem from '@/interfaces/timetables/IScheduleItem';
import ITimetable from '@/interfaces/timetables/ITimetable';
import ITimetableDay from '@/interfaces/timetables/ITimetableDay';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  setAll(state, divisions: IDivision[]) {
    state.divisions = divisions?.map((a: IDivision) => new Division(a));
  },
  set(state, division: IDivision) {
    state.division = new Division(division);
    state.division.divisionImages.forEach((i: IDivisionImage) => {
      if (!i.fileInfo) return;
      const file = i.fileInfo.getFileListObject();
      if (file) state.galleryList.push(file);
    });
  },
  remove(state, id: string) {
    const index = state.divisions.findIndex((i: IDivision) => i.id === id);
    state.divisions.splice(index, 1);
  },
  setTimetable(state, timetable: ITimetable) {
    if (!state.division) return;
    state.division.timetable = timetable;
  },
  removeTimetable(state) {
    if (!state.division) return;
    state.division.timetable = new Timetable();
  },
  removeTimetableDay(state, i: number) {
    if (!state.division) return;
    const idForDelete = state.division.timetable.timetableDays[i].id;
    if (idForDelete) state.division.timetable.timetableDaysForDelete.push(idForDelete);
    state.division.timetable.timetableDays.splice(i, 1);
  },
  createCustomTimetableDay(state, item: ITimetableDay) {
    if (!state.division) return;
    state.division.timetable.timetableDays.push(item);
  },
  setSchedule(state, item: ISchedule) {
    if (!state.division) return;
    state.division.schedule = item;
  },
  removeSchedule(state) {
    if (!state.division) return;
    state.division.schedule = new Schedule();
  },
  removeScheduleItem(state, i: number) {
    if (!state.division) return;
    const idForDelete = state.division.schedule.scheduleItems[i].id;
    if (idForDelete) state.division.schedule.scheduleItemsForDelete.push(idForDelete);
    state.division.schedule.scheduleItems.splice(i, 1);
  },
  addScheduleItem(state, item: IScheduleItem) {
    if (!state.division) return;
    state.division.schedule.scheduleItems.push(item);
  },
  pushToDivisionImages(state, file: IFile) {
    if (!state.division) return;
    const image = FileInfo.CreatePreviewFile(file, 'gallery');
    if (image.fileSystemPath) state.division.divisionImagesNames.push(image.fileSystemPath);
    state.division.divisionImages.push(new DivisionImage({ fileInfo: image }));
  },
  setCurGalleryCropIndex(state, index: number) {
    state.curGalleryCropIndex = index;
  },
  saveFromCropperGallery(state, file: IFile) {
    const prevFileInfo = state.division.divisionImages[state.curGalleryCropIndex].fileInfo;
    if (!prevFileInfo) return;
    const fileInfo = FileInfo.CreatePreviewFile(file, 'gallery');
    fileInfo.fileSystemPath = prevFileInfo.fileSystemPath;

    const i = state.division.divisionImagesNames.findIndex((i: string) => i === fileInfo.fileSystemPath);
    if (i < 0 && fileInfo.fileSystemPath) state.division.divisionImagesNames.push(fileInfo.fileSystemPath);

    state.division.divisionImages[state.curGalleryCropIndex].fileInfo = fileInfo;
    if (fileInfo.fileSystemPath) {
      state.galleryList[state.curGalleryCropIndex] = {
        name: fileInfo.fileSystemPath,
        url: file.src,
      };
    }
    console.log(state.division.divisionImages);
  },
  removeFromGallery(state, file: IFile) {
    const index = state.galleryList.findIndex((i) => i.url === file.url);
    if (index > -1) {
      state.galleryList.splice(index, 1);
      const id = state.division.divisionImages[index].id;
      if (id) state.division.divisionImagesForDelete.push(id);
      state.division.divisionImages.splice(index, 1);
    }
  },
};

export default mutations;
