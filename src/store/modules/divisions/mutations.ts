import { MutationTree } from 'vuex';

import Division from '@/classes/Division';
import DivisionComment from '@/classes/DivisionComment';
import Schedule from '@/classes/Schedule';
import ScheduleItem from '@/classes/ScheduleItems';
import Timetable from '@/classes/Timetable';
import TimetableDay from '@/classes/TimetableDay';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { getDefaultState } from '.';
import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(Division),
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  setTimetable(state, timetable: Timetable) {
    if (!state.item) {
      return;
    }
    state.item.timetable = timetable;
  },
  removeTimetable(state) {
    if (!state.item) {
      return;
    }
    state.item.timetable.timetableDays.forEach((day: TimetableDay) => {
      if (day.id) {
        state.item.timetableDaysForDelete.push(day.id);
      }
    });
    state.item.timetable = new Timetable();
  },
  setOnlyShowed(state, onlyShowed: boolean) {
    state.onlyShowed = onlyShowed;
  },
  setSchedule(state, item: Schedule) {
    if (!state.item) return;
    state.item.schedule = item;
  },
  removeSchedule(state) {
    if (!state.item) return;
    state.item.schedule = new Schedule();
  },
  removeScheduleItem(state, i: number) {
    if (!state.item) return;
    const idForDelete = state.item.schedule.scheduleItems[i].id;
    if (idForDelete) state.item.schedule.scheduleItemsForDelete.push(idForDelete);
    state.item.schedule.scheduleItems.splice(i, 1);
  },
  addScheduleItem(state, item: ScheduleItem) {
    if (!state.item) return;
    state.item.schedule.scheduleItems.push(item);
  },
  setComment(state, item: DivisionComment) {
    if (state.item) state.item.divisionComments.unshift(item);
    state.comment = new DivisionComment();
  },
  removeComment(state, commentId: string) {
    if (state.item) {
      const index = state.item.divisionComments.findIndex((item: DivisionComment) => item.id === commentId);
      state.item.divisionComments.splice(index, 1);
    }
  },
  editComment(state, commentId: string) {
    if (state.item) {
      state.item.divisionComments = state.item.divisionComments.map((item: DivisionComment) => {
        if (item.comment.id === commentId) item.comment.isEditing = true;
        return item;
      });
    }
  },
  updateComment(state, commentId: string) {
    if (state.item) {
      state.item.divisionComments = state.item.divisionComments.map((item: DivisionComment) => {
        if (item.comment.id === commentId) item.comment.isEditing = false;
        return item;
      });
    }
  },
  setParentIdToComment(state, parentId: string) {
    state.comment.divisionId = parentId;
  },

  resetComment(state) {
    state.comment = new DivisionComment();
  },
};

export default mutations;
