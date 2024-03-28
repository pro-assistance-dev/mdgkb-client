import { MutationTree } from 'vuex';

import Doctor from '@/classes/Doctor';
import DoctorComment from '@/classes/DoctorComment';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { getDefaultState } from '.';
import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(Doctor),
  resetState(state) {
    Object.assign(state, getDefaultState());
  },

  setComment(state, item: DoctorComment) {
    if (state.item) state.item.doctorComments.unshift(item);
    state.comment = new DoctorComment();
  },
  removeComment(state, commentId: string) {
    if (state.item) {
      const index = state.item.doctorComments.findIndex((item: DoctorComment) => item.id === commentId);
      state.item.doctorComments.splice(index, 1);
    }
  },
  editComment(state, commentId: string) {
    if (state.item) {
      state.item.doctorComments = state.item.doctorComments.map((item: DoctorComment) => {
        if (item.comment.id === commentId) item.comment.isEditing = true;
        return item;
      });
    }
  },
  updateComment(state, commentId: string) {
    if (state.item) {
      state.item.doctorComments = state.item.doctorComments.map((item: DoctorComment) => {
        if (item.comment.id === commentId) item.comment.isEditing = false;
        return item;
      });
    }
  },
  setParentIdToComment(state, parentId: string) {
    state.comment.doctorId = parentId;
  },
  resetComment(state, item: DoctorComment) {
    state.comment = new DoctorComment();
  },
};

export default mutations;
