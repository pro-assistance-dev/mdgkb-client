import { MutationTree } from 'vuex';

import Question from '@/classes/Question';
import User from '@/classes/User';
import IQuestion from '@/interfaces/IQuestion';
import IUser from '@/interfaces/IUser';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IQuestion[]) {
    state.items = items.map((i: IQuestion) => new Question(i));
  },
  appendToAll(state, items: IQuestion[]) {
    const questions = items.map((i: IQuestion) => new Question(i));
    state.items.push(...questions);
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
};

export default mutations;
