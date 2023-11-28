import { ActionTree } from 'vuex';

import Comment from '@/classes/Comment';
import ICommentsWithCount from '@/interfaces/ICommentsWithCount';
import Cache from '@/services/Cache';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import State from './state';

const cache = new Cache();
cache.name = 'comments';

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
    const get = async () => {
      return await httpClient.get<Comment[]>({ query: 'main' });
    };
    commit('setAll', await cache.storeGetWithCache<Comment[]>(get));
  },
  modChecked: async (_, comment: Comment): Promise<void> => {
    await httpClient.put<Comment, Comment>({ query: `${comment.id}`, payload: comment });
  },
  createComment: async ({ state, commit }): Promise<void> => {
    const res = await httpClient.post<Comment, Comment>({ payload: state.comment.comment });
    commit('setComment', res);
  },
  subscribeCreate: async ({ commit }, isNmo: boolean): Promise<void> => {
    const c = new HttpClient('subscribe');
    source = await c.subscribe<Comment>({ query: 'comment-create' });
    source.onmessage = function (e) {
      commit('unshiftToAll', JSON.parse(e.data));
    };
  },
  unsubscribeCreate: async ({ commit }): Promise<void> => {
    source?.close();
  },
};

export default actions;
