import { MutationTree } from 'vuex';

import Question from '@/classes/Question';
import IQuestion from '@/interfaces/IQuestion';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IQuestion[]) {
    state.items = items.map((i: IQuestion) => new Question(i));
  },
  set(state, question?: IQuestion) {
    state.item = new Question(question);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IQuestion) => i.id === id);
    state.items.splice(index, 1);
  },
  openQuestion(state) {
    state.question.isOpened = true;
    console.log(state.question);
  },
  resetQuestion(state) {
    state.question = new Question();
  },
};

export default mutations;
