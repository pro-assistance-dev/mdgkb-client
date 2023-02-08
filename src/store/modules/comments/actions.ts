import { ActionTree } from 'vuex';

import FilterQuery from '@/classes/filters/FilterQuery';
import IComment from '@/interfaces/comments/IComment';
import ICommentsWithCount from '@/interfaces/ICommentsWithCount';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import State from './state';

const httpClient = new HttpClient('comments');
let source: EventSource | undefined = undefined;
const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: FilterQuery): Promise<void> => {
    const items = await httpClient.get<ICommentsWithCount>({ query: filterQuery ? filterQuery?.toUrl() : '' });
    if (filterQuery && filterQuery.pagination.append) {
      commit('appendToAll', items);
      filterQuery.pagination.setAllLoaded(items ? items.comments.length : 0);
      return;
    }
    commit('setAllWithCount', items);
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
  subscribeCreate: async ({ commit }, isNmo: boolean): Promise<void> => {
    const c = new HttpClient('subscribe');
    source = await c.subscribe<IComment>({ query: 'comment-create' });
    source.onmessage = function (e) {
      commit('unshiftToAll', JSON.parse(e.data));
    };
  },
  unsubscribeCreate: async ({ commit }): Promise<void> => {
    source?.close();
  },
};

export default actions;
