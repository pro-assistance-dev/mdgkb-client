import { MutationTree } from 'vuex';

import Faq from '@/classes/Faq';
import IFaq from '@/interfaces/IFaq';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IFaq[]) {
    state.items = items.map((i: IFaq) => new Faq(i));
  },
  set(state, item: IFaq) {
    state.item = new Faq(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IFaq) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new Faq();
  },
};

export default mutations;
