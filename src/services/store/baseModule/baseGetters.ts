import { GetterTree } from 'vuex';

import IWithId from '@/services/interfaces/IWithId';
import RootState from '@/services/interfaces/types';
import IBasicState from '@/services/services/store/baseModule/baseState';

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
