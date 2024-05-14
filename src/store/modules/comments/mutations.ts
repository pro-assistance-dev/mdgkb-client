import { MutationTree } from 'vuex';

import Comment from '@/classes/Comment';

import getBaseMutations from '@/services/store/baseModule/baseMutations';
import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(Comment),
  // markPositive(state, comment: Comment) {
  //   state.comments = state.comments.map((i: Comment) => {
  //     if (comment.id === i.id) {
  //       i.modChecked = true;
  //       i.positive = true;
  //     }
  //     return i;
  //   });
  // },
  // markNegative(state, comment: Comment) {
  //   state.comments = state.comments.map((i: Comment) => {
  //     if (comment.id === i.id) {
  //       i.modChecked = true;
  //       i.positive = false;
  //     }
  //     return i;
  //   });
  // },
  setFirstModeCondition(state, positiveMode: boolean) {
    state.positiveMode = positiveMode;
  },
};

export default mutations;
