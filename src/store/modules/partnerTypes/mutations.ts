import { MutationTree } from 'vuex';

import PartnerType from '@/classes/partners/PartnerType';
import IPartnerType from '@/interfaces/partners/IPartnerType';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IPartnerType[]) {
    state.items = items.map((i: IPartnerType) => new PartnerType(i));
  },
  set(state, item: IPartnerType) {
    state.item = new PartnerType(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IPartnerType) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new PartnerType();
  },
};

export default mutations;
