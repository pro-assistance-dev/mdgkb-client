import { MutationTree } from 'vuex';

import CandidateExam from '@/classes/CandidateExam';
import ICandidateExam from '@/interfaces/ICandidateExam';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: ICandidateExam[]) {
    state.items = items.map((i: ICandidateExam) => new CandidateExam(i));
  },
  appendToAll(state, items: ICandidateExam[]) {
    const itemsForAdding = items.map((i: ICandidateExam) => new CandidateExam(i));
    state.items.push(...itemsForAdding);
  },
  set(state, item: ICandidateExam) {
    state.item = new CandidateExam(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: ICandidateExam) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new CandidateExam();
  },
};

export default mutations;
