import { GetterTree } from 'vuex';

import ICandidateApplication from '@/interfaces/ICandidateApplication';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): ICandidateApplication[] {
    return state.items;
  },
  item(state): ICandidateApplication {
    return state.item;
  },
  emailExists(state): boolean {
    return state.emailExists;
  },
};

export default getters;
