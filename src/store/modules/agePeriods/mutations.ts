import { MutationTree } from 'vuex';

import AgePeriod from '@/classes/AgePeriod';
import IAgePeriod from '@/interfaces/IAgePeriod';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IAgePeriod[]) {
    state.items = items.map((i: IAgePeriod) => new AgePeriod(i));
  },
  set(state, item: IAgePeriod) {
    state.item = new AgePeriod(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IAgePeriod) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new AgePeriod();
  },
  setSelectedAgePeriodId(state, id: string) {
    state.selectedItemId = id;
  },
};

export default mutations;
