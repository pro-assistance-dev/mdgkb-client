import { MutationTree } from 'vuex';

import Question from '@/classes/Question';
import User from '@/classes/User';
import IQuestion from '@/interfaces/IQuestion';
import IQuestionsWithCount from '@/interfaces/IQuestionsWithCount';
import IUser from '@/interfaces/IUser';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, item: IQuestionsWithCount) {
    if (!item.questions) {
      state.items = [];
      return;
    }
    state.items = item.questions.map((i: IQuestion) => new Question(i));
    state.count = item.count;
  },
  appendToAll(state, item: IQuestionsWithCount) {
    if (!item.questions) {
      state.items = [];
      return;
    }
    const questions = item.questions.map((i: IQuestion) => new Question(i));
    state.items.push(...questions);
    state.count = item.count;
  },
  set(state, question?: IQuestion) {
    state.item = new Question(question);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IQuestion) => i.id === id);
    state.items.splice(index, 1);
  },
  openQuestion(state) {
    state.question.isDialogOpened = true;
  },
  resetQuestion(state) {
    state.question = new Question();
  },
  setUser(state, user: IUser) {
    state.question.user = new User(user);
  },
  unshiftToAll(state, item: IQuestion) {
    state.items.unshift(new Question(item));
  },
};

export default mutations;
