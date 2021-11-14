import { GetterTree } from 'vuex';

import IComment from '@/interfaces/comments/IComment';
import RootState from '@/store/types';

import State from './state';

const getters: GetterTree<State, RootState> = {
  comments(state): IComment[] {
    return state.comments;
  },
};

export default getters;
