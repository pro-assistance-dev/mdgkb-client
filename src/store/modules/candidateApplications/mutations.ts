import { MutationTree } from 'vuex';

import CandidateApplication from '@/classes/CandidateApplication';
import ICandidateApplication from '@/interfaces/ICandidateApplication';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: ICandidateApplication[]) {
    state.items = items.map((i: ICandidateApplication) => new CandidateApplication(i));
  },
  appendToAll(state, items: ICandidateApplication[]) {
    const itemsForAdding = items.map((i: ICandidateApplication) => new CandidateApplication(i));
    state.items.push(...itemsForAdding);
  },
  set(state, item: ICandidateApplication) {
    state.item = new CandidateApplication(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: ICandidateApplication) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new CandidateApplication();
  },
};

export default mutations;
