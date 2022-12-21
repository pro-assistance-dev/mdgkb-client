import { GetterTree } from 'vuex';

import IDailyMenuItem from '@/interfaces/IDailyMenuItem';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IDailyMenuItem[] {
    return state.items;
  },
  item(state): IDailyMenuItem {
    return state.item;
  },
};

export default getters;
