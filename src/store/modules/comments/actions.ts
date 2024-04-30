import { ActionTree } from 'vuex';

import Comment from '@/classes/Comment';
import Cache from '@/services/Cache';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import getBaseActions from '@/services/store/baseModule/baseActions';

import { State } from './index';
const cache = new Cache();
cache.name = 'comments';

const httpClient = new HttpClient('comments');
let source: EventSource | undefined = undefined;
const actions: ActionTree<State, RootState> = {
  ...getBaseActions(httpClient),
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
    source.onmessage = function(e) {
      commit('unshiftToAll', JSON.parse(e.data));
    };
  },
  unsubscribeCreate: async (): Promise<void> => {
    source?.close();
  },
};

export default actions;
