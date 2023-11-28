import { MutationTree } from 'vuex';

import Event from '@/classes/Event';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: Event[]) {
    state.items = items.map((a: Event) => new Event(a));
  },
};

export default mutations;
