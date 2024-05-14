import { MutationTree } from 'vuex';

import { Constructable } from '@/services/ClassHelper';
import ItemsWithCount from '@/services/interfaces/ItemsWithCount';
import IWithId from '@/services/interfaces/IWithId';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';

export default function getBaseMutations<T extends IWithId, StateType extends IBasicState<T>>(
  passedClass: Constructable<T>
): MutationTree<StateType> {
  return {
    appendToAll(state, items?: []) {
      if (!items) {
        return;
      }
      const resultItems = items.map((i: T) => new passedClass(i));
      state.items.push(...resultItems);
    },
    setAll(state, items: T[]) {
      if (!items) {
        return;
      }
      state.items = items.map((a: T) => new passedClass(a));
    },
    setAllWithCount(state, items: ItemsWithCount<T>) {
      if (!items) {
        return;
      }
      state.items = items.items.map((a: T) => new passedClass(a));
      state.count = items.count;
    },
    set(state, item: T) {
      state.item = new passedClass(item);
    },
    resetState(state) {
      Object.assign(state, getBaseDefaultState(passedClass));
    },
    remove(state, id: string) {
      const index = state.items.findIndex((i: T) => i.id === id);
      state.items.splice(index, 1);
    },
    resetItem(state) {
      state.item = new passedClass();
    },
    unshiftToAll(state, item: T) {
      state.items.unshift(new passedClass(item));
    },
    clearItems(state) {
      state.items = [];
    },
  };
}
