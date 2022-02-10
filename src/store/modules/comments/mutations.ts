import { MutationTree } from 'vuex';

import Comment from '@/classes/comments/Comment';
import IComment from '@/interfaces/comments/IComment';

import State from './state';

const mutations: MutationTree<State> = {
  setAll(state, comments: IComment[]) {
    state.comments = comments.map((i: IComment) => new Comment(i));
  },
  appendToAll(state, items: IComment[]) {
    const comments = items.map((i: IComment) => new Comment(i));
    state.comments.push(...comments);
  },
  markPositive(state, comment: IComment) {
    state.comments = state.comments.map((i: IComment) => {
      if (comment.id === i.id) {
        i.modChecked = true;
        i.positive = true;
      }
      return i;
    });
  },
  markNegative(state, comment: IComment) {
    state.comments = state.comments.map((i: IComment) => {
      if (comment.id === i.id) {
        i.modChecked = true;
        i.positive = false;
      }
      return i;
    });
  },
  setFirstModeCondition(state, positiveMode: boolean) {
    state.positiveMode = positiveMode;
  },
  setComment(state, comment: IComment) {
    state.comment.comment = new Comment();
    state.comments.unshift(new Comment(comment));
  },
};

export default mutations;
