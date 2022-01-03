import { MutationTree } from 'vuex';

import Preparation from '@/classes/Preparation';
import PreparationTag from '@/classes/PreparationTag';
import IPreparation from '@/interfaces/IPreparation';
import IPreparationTag from '@/interfaces/IPreparationTag';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IPreparation[]) {
    state.items = items.map((i: IPreparation) => new Preparation(i));
  },
  setAllTags(state, items: IPreparationTag[]) {
    state.tags = items.map((i: IPreparationTag) => new PreparationTag(i));
  },
  set(state, item: IPreparation) {
    state.item = new Preparation(item);
  },
  addToDeleting(state, id: string) {
    state.itemsForDelete.push(id);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IPreparation) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new Preparation();
  },
  openPreparation(state, id: string) {
    const preparation = state.items.find((i: IPreparation) => i.id === id);
    if (preparation) {
      state.item = preparation;
      state.item.selected = true;
    }
  },
};

export default mutations;
