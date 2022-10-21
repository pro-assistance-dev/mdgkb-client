import { MutationTree } from 'vuex';

import DietAge from '@/classes/DietAge';
import IDietAge from '@/interfaces/IDietAge';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IDietAge[]) {
    state.items = items.map((i: IDietAge) => new DietAge(i));
  },
  set(state, item: IDietAge) {
    state.item = new DietAge(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IDietAge) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new DietAge();
  },
  setSelectedAgePeriodId(state, id: string) {
    state.selectedItemId = id;
  },
};

export default mutations;
