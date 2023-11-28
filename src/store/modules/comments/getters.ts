import { GetterTree } from 'vuex';

import Comment from '@/classes/Comment';
import NewsComment from '@/classes/NewsComment';
import RootState from '@/store/types';

import State from './state';

const getters: GetterTree<State, RootState> = {
  comments(state): Comment[] {
    return state.comments;
  },
  comment(state): NewsComment {
    return state.comment;
  },
  count(state): number {
    return state.count;
  },
};

export default getters;
