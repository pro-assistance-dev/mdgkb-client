import { MutationTree } from 'vuex';

import Division from '@/classes/divisions/Division';
import IDivision from '@/interfaces/divisions/IDivision';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, divisions: IDivision[]) {
    state.divisions = divisions.map((a: IDivision) => new Division(a));
  },
  set(state, division: IDivision) {
    state.division = new Division(division);
  },
};

export default mutations;
