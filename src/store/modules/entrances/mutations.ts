import { MutationTree } from 'vuex';

import Entrance from '@/classes/Entrance';
import IEntrance from '@/interfaces/IEntrance';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IEntrance[]) {
    state.items = items.map((i: IEntrance) => new Entrance(i));
  },
};

export default mutations;
