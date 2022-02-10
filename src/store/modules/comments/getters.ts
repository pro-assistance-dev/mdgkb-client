import { GetterTree } from 'vuex';

import IComment from '@/interfaces/comments/IComment';
import INewsComment from '@/interfaces/news/INewsComment';
import RootState from '@/store/types';

import State from './state';

const getters: GetterTree<State, RootState> = {
  comments(state): IComment[] {
    return state.comments;
  },
  comment(state): INewsComment {
    return state.comment;
  },
};

export default getters;
