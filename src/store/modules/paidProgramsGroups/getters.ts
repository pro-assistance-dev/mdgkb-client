import { GetterTree } from 'vuex';

import IPaidProgramsGroup from '@/interfaces/IPaidProgramsGroupsForServer';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IPaidProgramsGroup[] {
    return state.items;
  },
  itemsForDelete(state): string[] {
    return state.itemsForDelete;
  },
  item(state): IPaidProgramsGroup {
    return state.item;
  },
};

export default getters;
