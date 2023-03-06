import { MutationTree } from 'vuex';

import Partner from '@/classes/Partner';
import IPartner from '@/interfaces/partners/IPartner';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IPartner[]) {
    state.items = items.map((i: IPartner) => new Partner(i));
  },
  set(state, item: IPartner) {
    state.item = new Partner(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IPartner) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new Partner();
  },
};

export default mutations;
