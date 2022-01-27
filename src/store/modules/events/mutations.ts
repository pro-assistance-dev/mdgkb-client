import { MutationTree } from 'vuex';

import Event from '@/classes/news/Event';
import IEvent from '@/interfaces/news/IEvent';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IEvent[]) {
    state.items = items.map((a: IEvent) => new Event(a));
  },
};

export default mutations;
