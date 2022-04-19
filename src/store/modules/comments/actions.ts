import { ActionTree } from 'vuex';

import IComment from '@/interfaces/comments/IComment';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import State from './state';

const httpClient = new HttpClient('comments');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit, state }, query: IFilterQuery): Promise<void> => {
    const items = await httpClient.get<IComment[]>({ query: query ? query.toUrl() : '' });
    if (query.pagination.cursorMode) {
      commit('appendToAll', items);
      return;
    }
    commit('setAll', items);
  },
  getAllMain: async ({ commit }): Promise<void> => {
    const items = await httpClient.get<IComment[]>({ query: 'main' });
    commit('setAll', items);
  },
  modChecked: async (_, comment: IComment): Promise<void> => {
    await httpClient.put<IComment, IComment>({ query: `${comment.id}`, payload: comment });
  },
  createComment: async ({ state, commit }): Promise<void> => {
    const res = await httpClient.post<IComment, IComment>({ payload: state.comment.comment });
    commit('setComment', res);
  },
};

export default actions;
