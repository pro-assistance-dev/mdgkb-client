import { ActionTree } from 'vuex';

import CommentParams from '@/classes/comments/CommentParams';
import IComment from '@/interfaces/comments/IComment';
import ICommentParams from '@/interfaces/comments/ICommentParams';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import State from './state';

const httpClient = new HttpClient('comments');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit, state }, params: ICommentParams): Promise<void> => {
    if (!params) {
      params = new CommentParams();
    }
    params.positive = state.positiveMode;
    commit('setAll', await httpClient.get<IComment[]>({ query: params ? params.toUrl() : '' }));
  },
  modChecked: async (_, comment: IComment): Promise<void> => {
    await httpClient.put<IComment, IComment>({ query: `${comment.id}`, payload: comment });
  },
};

export default actions;
