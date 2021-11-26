import { MutationTree } from 'vuex';

import Faq from '@/classes/Faq';
import IFaq from '@/interfaces/IFaq';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IFaq[]) {
    state.faqs = items.map((i: IFaq) => new Faq(i));
  },
  remove(state, index: number) {
    const idForDelete = state.faqs[index].id;
    if (idForDelete) {
      state.faqsForDelete.push(idForDelete);
    }
    state.faqs.splice(index, 1);
  },
};

export default mutations;
