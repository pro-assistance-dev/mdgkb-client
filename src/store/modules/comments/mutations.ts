import { MutationTree } from 'vuex';

import Comment from '@/classes/Comment';
import IComment from '@/interfaces/comments/IComment';
import ICommentsWithCount from '@/interfaces/ICommentsWithCount';

import State from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IComment[]) {
    state.comments = items.map((i: IComment) => new Comment(i));
  },
  setAllWithCount(state, items: ICommentsWithCount) {
    if (!items.comments) {
      state.comments = [];
      return;
    }
    state.comments = items.comments.map((i: IComment) => new Comment(i));
    state.count = items.count;
  },
  appendToAll(state, items: ICommentsWithCount) {
    if (!items.comments) {
      state.comments = [];
      return;
    }
    const comments = items.comments.map((i: IComment) => new Comment(i));
    state.comments.push(...comments);
    state.count = items.count;
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
  clearComments(state) {
    state.comments = [];
  },
  unshiftToAll(state, item: IComment) {
    state.comments.unshift(new Comment(item));
  },
};

export default mutations;
