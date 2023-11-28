import { MutationTree } from 'vuex';

import Entrance from '@/classes/Entrance';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: Entrance[]) {
    state.items = items.map((i: Entrance) => new Entrance(i));
  },
};

export default mutations;
