import { MutationTree } from 'vuex';

import Employee from '@/classes/Employee';
import IEmployee from '@/interfaces/IEmployee';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  appendToAll(state, items: IEmployee[]) {
    if (!items) {
      return;
    }
    const Employees = items.map((i: IEmployee) => new Employee(i));
    state.items.push(...Employees);
  },
  setAll(state, items: IEmployee[]) {
    if (!items) {
      return;
    }
    state.items = items.map((a: IEmployee) => new Employee(a));
  },
  set(state, item: IEmployee) {
    state.item = new Employee(item);
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IEmployee) => i.id === id);
    state.items.splice(index, 1);
  },
};

export default mutations;
