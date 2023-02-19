import { GetterTree } from 'vuex';

import IWithId from '@/interfaces/IWithId';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

export default function getBaseGetters<T extends IWithId, StateType extends IBasicState<T>>(): GetterTree<StateType, RootState> {
  return {
    items(state): T[] {
      return state.items;
    },
    item(state): T {
      return state.item;
    },
    count(state): number {
      return state.count;
    },
  };
}
