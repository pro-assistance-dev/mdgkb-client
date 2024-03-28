import { ActionTree } from 'vuex';

import DoctorComment from '@/classes/DoctorComment';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('doctors');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions(httpClient),
  removeComment: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `comment/${id}` });
    commit('removeComment', id);
  },
  createComment: async ({ commit }, comment: DoctorComment): Promise<void> => {
    const res = await httpClient.post<DoctorComment, DoctorComment>({ query: `comment`, payload: comment });
    commit('resetComment', res);
  },
  updateComment: async ({ commit }, newComment: DoctorComment): Promise<void> => {
    await httpClient.put({ query: `comment/${newComment.id}`, payload: newComment });
    commit('updateComment', newComment.comment.id);
  },
  deleteComment: async ({ commit }, comment: DoctorComment): Promise<void> => {
    await httpClient.delete({ query: `comment/${comment.id}` });
    commit('deleteCommentFromNews', comment);
  },
};

export default actions;
