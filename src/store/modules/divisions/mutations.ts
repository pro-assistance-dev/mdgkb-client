import { MutationTree } from 'vuex';

import Division from '@/classes/Division';
import DivisionComment from '@/classes/DivisionComment';
import DivisionImage from '@/classes/DivisionImage';
import FileInfo from '@/classes/File/FileInfo';
import Schedule from '@/classes/timetable/Schedule';
import Timetable from '@/classes/timetable/Timetable';
import IFile from '@/interfaces/files/IFile';
import IDivision from '@/interfaces/IDivision';
import IDivisionComment from '@/interfaces/IDivisionComment';
import IDivisionImage from '@/interfaces/IDivisionImage';
import IDivisionsWithCount from '@/interfaces/IDivisionsWithCount';
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
  appendToAll(state, item: IDivisionsWithCount) {
    const divisions = item.divisions.map((i: IDivision) => new Division(i));
    state.divisions.push(...divisions);
    state.count = item.count;
  },
  setAll(state, item: IDivisionsWithCount) {
    state.divisions = item.divisions.map((i: IDivision) => new Division(i));
    state.count = item.count;
  },
  set(state, division: IDivision) {
    state.division = new Division(division);
    state.division.divisionImages.forEach((i: IDivisionImage) => {
      if (!i.fileInfo) {
        return;
      }
      const file = i.fileInfo.getFileListObject();
      if (file) {
        state.galleryList.push(file);
      }
    });
  },
  remove(state, id: string) {
    const index = state.divisions.findIndex((i: IDivision) => i.id === id);
    state.divisions.splice(index, 1);
  },
  setTimetable(state, timetable: ITimetable) {
    if (!state.division) {
      return;
    }
    state.division.timetable = timetable;
  },
  removeTimetable(state) {
    if (!state.division) {
      return;
    }
    state.division.timetable.timetableDays.forEach((day: ITimetableDay) => {
      if (day.id) {
        state.division.timetableDaysForDelete.push(day.id);
      }
    });
    state.division.timetable = new Timetable();
  },
  setOnlyShowed(state, onlyShowed: boolean) {
    state.onlyShowed = onlyShowed;
  },

  // setTimetable(state, timetable: ITimetable) {
  //   if (!state.division) {
  //     return;
  //   }
  //   state.division.timetable = timetable;
  // },
  // removeTimetable(state) {
  //   if (!state.division) return;
  //   state.division.timetable = new Timetable();
  // },
  // removeTimetableDay(state, i: number) {
  //   if (!state.division) return;
  //   const idForDelete = state.division.timetable.timetableDays[i].id;
  //   if (idForDelete) state.division.timetable.timetableDaysForDelete.push(idForDelete);
  //   state.division.timetable.timetableDays.splice(i, 1);
  // },
  // createCustomTimetableDay(state, item: ITimetableDay) {
  //   if (!state.division) return;
  //   state.division.timetable.timetableDays.push(item);
  // },
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

    state.division.divisionImages[state.curGalleryCropIndex].fileInfo = fileInfo;
    if (fileInfo.fileSystemPath) {
      state.galleryList[state.curGalleryCropIndex] = {
        name: fileInfo.fileSystemPath,
        url: file.src,
      };
    }
  },
  removeFromGallery(state, file: IFile) {
    const index = state.galleryList.findIndex((i) => i.url === file.url);
    if (index > -1) {
      state.galleryList.splice(index, 1);
      const id = state.division.divisionImages[index].id;
      if (id) {
        state.division.divisionImagesForDelete.push(id);
      }
      state.division.divisionImages.splice(index, 1);
    }
  },
  setComment(state, item: IDivisionComment) {
    if (state.division) state.division.divisionComments.unshift(item);
    state.comment = new DivisionComment();
  },
  removeComment(state, commentId: string) {
    if (state.division) {
      const index = state.division.divisionComments.findIndex((item: IDivisionComment) => item.id === commentId);
      state.division.divisionComments.splice(index, 1);
    }
  },
  editComment(state, commentId: string) {
    if (state.division) {
      state.division.divisionComments = state.division.divisionComments.map((item: IDivisionComment) => {
        if (item.comment.id === commentId) item.comment.isEditing = true;
        return item;
      });
    }
  },
  updateComment(state, commentId: string) {
    if (state.division) {
      state.division.divisionComments = state.division.divisionComments.map((item: IDivisionComment) => {
        if (item.comment.id === commentId) item.comment.isEditing = false;
        return item;
      });
    }
  },
  setParentIdToComment(state, parentId: string) {
    state.comment.divisionId = parentId;
  },
};

export default mutations;
