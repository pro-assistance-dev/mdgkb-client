import { GetterTree } from 'vuex';

import IFaq from '@/interfaces/IFaq';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IFaq[] {
    return state.faqs;
  },
  faqsForDelete(state): string[] {
    return state.faqsForDelete;
  },
};

export default getters;
