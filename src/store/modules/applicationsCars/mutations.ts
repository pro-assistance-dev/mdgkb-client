import { MutationTree } from 'vuex';

import ApplicationCar from '@/classes/ApplicationCar';
import IApplicationCar from '@/interfaces/IApplicationCar';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IApplicationCar[]) {
    state.items = items.map((i: IApplicationCar) => new ApplicationCar(i));
  },
  set(state, item: IApplicationCar) {
    state.item = new ApplicationCar(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IApplicationCar) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new ApplicationCar();
  },
};

export default mutations;
