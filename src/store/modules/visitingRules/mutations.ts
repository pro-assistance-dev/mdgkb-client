import { MutationTree } from 'vuex';

import VisitingRule from '@/classes/VisitingRule';
import IVisitingRule from '@/interfaces/IVisitingRule';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IVisitingRule[]) {
    if (!items.length) {
      return;
    }
    state.items = items.map((i: IVisitingRule) => new VisitingRule(i));
  },
  remove(state, index: number) {
    const id = state.items[index].id;
    if (id) {
      state.itemsForDelete.push(id);
    }
    state.items.splice(index, 1);
  },
};

export default mutations;
