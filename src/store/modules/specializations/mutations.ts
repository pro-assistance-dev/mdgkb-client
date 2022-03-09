import { MutationTree } from 'vuex';

import Specialization from '@/classes/Specialization';
import ISpecialization from '@/interfaces/ISpecialization';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: ISpecialization[]) {
    state.items = items.map((i: ISpecialization) => new Specialization(i));
  },
  appendToAll(state, items: ISpecialization[]) {
    const itemsForAdding = items.map((i: ISpecialization) => new Specialization(i));
    state.items.push(...itemsForAdding);
  },
  set(state, item: ISpecialization) {
    state.item = new Specialization(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: ISpecialization) => i.id === id);
    state.items.splice(index, 1);
  },
};

export default mutations;
