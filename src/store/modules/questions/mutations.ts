import { MutationTree } from 'vuex';

import Question from '@/classes/Question';
import User from '@/classes/User';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(Question),
  openQuestion(state) {
    state.question.isDialogOpened = true;
  },
  resetQuestion(state) {
    state.question = new Question();
  },
  setUser(state, user: User) {
    state.question.user = new User(user);
  },
};

export default mutations;
