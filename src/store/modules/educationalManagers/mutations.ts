import { MutationTree } from 'vuex';

import EducationalManager from '@/classes/EducationalManager';
import IEducationalManager from '@/interfaces/IEducationalManager';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IEducationalManager[]) {
    state.items = items.map((i: IEducationalManager) => new EducationalManager(i));
  },
  set(state, item: IEducationalManager) {
    state.item = new EducationalManager(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IEducationalManager) => i.id === id);
    state.items.splice(index, 1);
  },
};

export default mutations;
