import { MutationTree } from 'vuex';

import Center from '@/classes/Center';
import ICenter from '@/interfaces/ICenter';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  appendToAll(state, items: ICenter[]) {
    const centers = items.map((i: ICenter) => new Center(i));
    state.items.push(...centers);
  },
  setAll(state, items: ICenter[]) {
    state.items = items?.map((a: ICenter) => new Center(a));
  },
  set(state, item: ICenter) {
    state.item = new Center(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: ICenter) => i.id === id);
    state.items.splice(index, 1);
  },
};

export default mutations;
