import { GetterTree } from 'vuex';

import SupportMessage from '@/classes/SupportMessage';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): SupportMessage[] {
    return state.items;
  },
  item(state): SupportMessage {
    return state.item;
  },
  count(state): number {
    return state.count;
  },
  question(state): SupportMessage {
    return state.question;
  },
  allLoaded(state): boolean {
    return state.allLoaded;
  },
};

export default getters;
