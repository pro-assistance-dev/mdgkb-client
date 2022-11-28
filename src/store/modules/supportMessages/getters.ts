import { GetterTree } from 'vuex';

import ISupportMessage from '@/interfaces/ISupportMessage';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): ISupportMessage[] {
    return state.items;
  },
  item(state): ISupportMessage {
    return state.item;
  },
  count(state): number {
    return state.count;
  },
  question(state): ISupportMessage {
    return state.question;
  },
  allLoaded(state): boolean {
    return state.allLoaded;
  },
};

export default getters;
