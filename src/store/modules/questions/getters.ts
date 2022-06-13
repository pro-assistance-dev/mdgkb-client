import { GetterTree } from 'vuex';

import IQuestion from '@/interfaces/IQuestion';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IQuestion[] {
    return state.items;
  },
  item(state): IQuestion {
    return state.item;
  },
  count(state): number {
    return state.count;
  },
  question(state): IQuestion {
    return state.question;
  },
  allLoaded(state): boolean {
    return state.allLoaded;
  },
};

export default getters;
