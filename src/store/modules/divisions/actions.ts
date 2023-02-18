import { ActionTree } from 'vuex';

import IDivisionComment from '@/interfaces/IDivisionComment';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('divisions');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions(httpClient),
  removeComment: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `comment/${id}` });
    commit('removeComment', id);
  },
  createComment: async ({ commit }, comment: IDivisionComment): Promise<void> => {
    const res = await httpClient.post<IDivisionComment, IDivisionComment>({ query: `comment`, payload: comment });
    commit('resetComment', res);
  },
  updateComment: async ({ commit }, newComment: IDivisionComment): Promise<void> => {
    await httpClient.put({ query: `comment/${newComment.id}`, payload: newComment });
    commit('updateComment', newComment.comment.id);
  },
  deleteComment: async ({ commit }, comment: IDivisionComment): Promise<void> => {
    await httpClient.delete({ query: `comment/${comment.id}` });
    commit('deleteCommentFromNews', comment);
  },
};

export default actions;
