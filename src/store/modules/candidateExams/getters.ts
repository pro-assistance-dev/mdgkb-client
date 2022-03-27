import { GetterTree } from 'vuex';

import ICandidateExam from '@/interfaces/ICandidateExam';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): ICandidateExam[] {
    return state.items;
  },
  item(state): ICandidateExam {
    return state.item;
  },
};

export default getters;
